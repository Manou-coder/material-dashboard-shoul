import { Yom, yamimList } from '@/data/yamim-data'
import { TefilotCard } from './tefilot-card'

interface Props {
  data?: Yom[] | null
}

export const TefilotCards = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data && data.map((yom) => <TefilotCard key={yom.id} yom={yom} />)}
    </div>
  )
}
