import { Yom } from '@/data/yamim-data'
import { TefilotCards } from './cards/tefilot-cards'
import { InputSavedCity } from './saved-city/input-saved-city'
import { EssaiForm } from './essai-form'
import { Spinner } from '@material-tailwind/react'

interface Props {
  data?: Yom[] | null
  isLoading: boolean
}

export const TefilotView = ({ data, isLoading }: Props) => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <InputSavedCity />
      </div>
      {isLoading && <Spinner />}
      <TefilotCards data={data} />
      {/* <EssaiForm /> */}
    </section>
  )
}
