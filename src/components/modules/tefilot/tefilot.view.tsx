import { Yom } from '@/data/yamim-data'
import { TefilotCards } from './cards/tefilot-cards'
import { InputSavedCity } from './saved-city/input-saved-city'

interface Props {
  data?: Yom[] | null
}

export const TefilotView = ({ data }: Props) => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <InputSavedCity />
      </div>
      <TefilotCards data={data} />
    </section>
  )
}
