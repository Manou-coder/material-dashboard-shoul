import { yamimList } from '@/data/yamim-data'
import { TefilotCard } from './tefilot-card'

export const TefilotCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {yamimList.map((yom) => (
        <TefilotCard key={yom.id} yom={yom} />
      ))}
    </div>
  )
}
