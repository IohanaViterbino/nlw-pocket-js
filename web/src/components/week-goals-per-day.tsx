import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import { CheckCircle2 } from 'lucide-react'
import dayjs from 'dayjs'

export function WeekGoalsPerDay() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-medium">Sua semana</h2>

      {Object.entries(data.goalsPerDay).map(([date, goals]) => {
        const weekDay = dayjs(date).format('dddd')
        const mounthDay = dayjs(date).format('D[ de ]MMMM')

        return (
          <div key={date} className="flex flex-col gap-4">
            <h3 className="font-medium">
              <span className="capitalize">{weekDay} </span>
              <span className="text-zinc-400 text-xs">({mounthDay})</span>
            </h3>

            <ul className="flex flex-col gap-3">
              {goals.map(goal => {
                const time = dayjs(goal.completedAt).format('HH:mm')

                return (
                  <li key={goal.id} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-pink-500" />
                    <span className="text-sm text-zinc-400">
                      Você completou "
                      <span className="text-zinc-100">{goal.title}</span>" às{' '}
                      <span className="text-zinc-100">{time} hs</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
