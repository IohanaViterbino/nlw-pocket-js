import { db } from "@/db"
import { goalCompletions, goals } from "@/db/schema"
import dayjs from "dayjs"
import { and, eq, sql, desc } from "drizzle-orm"

export async function getWeekSummary() {
  const currentYear = dayjs().year()
  const currentWeek = dayjs().week()

  // metas criadas até aquela semana
  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.created_at,
      })
      .from(goals)
      .where(
        and(
          sql`EXTRACT(YEAR FROM ${goals.created_at}) <= ${currentYear}`,
          sql`EXTRACT(WEEK FROM ${goals.created_at}) <= ${currentWeek}`
        )
      )
  )

  // metas da semana completadas
  const goalCompletionInWeek = db.$with('goal_completion_counts').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.created_at,
        completedAtDate: sql /*sql*/`DATE(${goalCompletions.created_at})`.as('completedAtDate'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .orderBy(desc(goalCompletions.created_at))
  )

  // lista as mestas completadas na semana por data
  const goalCompletedByWeekDay = db.$with('goal_completed_by_week_day').as(
    db.select({
      completedAtDate: goalCompletionInWeek.completedAtDate,
      completions: sql /*sql*/`
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${goalCompletionInWeek.id},
            'title', ${goalCompletionInWeek.title},
            'completedAt', ${goalCompletionInWeek.completedAt}
          )
        )
      `.as('completions'),
    })
      .from(goalCompletionInWeek)
      .groupBy(goalCompletionInWeek.completedAtDate)
      .orderBy(desc(goalCompletionInWeek.completedAtDate))
  )

  type Summary = Record<
    string,
    { id: string; title: string; createdAt: string }[]
  >

  const [summary] = await db
    .with(goalsCreatedUpToWeek, goalCompletionInWeek, goalCompletedByWeekDay)
    .select({
      completed: sql<number> /*sql*/`
        (SELECT COUNT(*) FROM ${goalCompletionInWeek})::DECIMAL
      `.mapWith(Number),
      total: sql<number> /*sql*/`
        (SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})::DECIMAL
      `.mapWith(Number),
      goalsPerDay: sql<Summary> /*sql*/`
        JSON_OBJECT_AGG(${goalCompletedByWeekDay.completedAtDate}, ${goalCompletedByWeekDay.completions})
      `,
    })
    .from(goalCompletedByWeekDay)

  return { summary }
}