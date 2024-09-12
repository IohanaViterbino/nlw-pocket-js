import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Beber + 2,5l de água', desiredWeeklyFrequency: 3 },
      {
        title: 'Estudar mais sobre Django Rest framework',
        desiredWeeklyFrequency: 5,
      },
      { title: 'Jogar Genshin Impact', desiredWeeklyFrequency: 7 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, created_at: startOfWeek.toDate() },
    { goalId: result[1].id, created_at: startOfWeek.add(1, 'day').toDate() },
    { goalId: result[2].id, created_at: startOfWeek.add(3, 'day').toDate() },
  ])
}

seed().finally(() => client.end())
