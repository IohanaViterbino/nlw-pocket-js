import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'
import { WeekGoalsPerDay } from './week-goals-per-day'

dayjs.locale(ptBR)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!data) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')
  const completedPercentage = Math.round((data?.completed * 100) / data?.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data.completed} max={data.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />
      {data?.goalsPerDay ? <WeekGoalsPerDay /> : 
      <h2 className='text-lg font-medium'>
        Nenhuma meta completada esta semana. :/
      </h2>
      }

    </div>
  )
}
