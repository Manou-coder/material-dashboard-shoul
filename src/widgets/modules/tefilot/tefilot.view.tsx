import { TefilotCards } from './cards/tefilot-cards'
import { InputSavedCity } from './saved-city/input-saved-city'

export const TefilotView = () => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <InputSavedCity />
      </div>
      <TefilotCards />
    </section>
  )
}
