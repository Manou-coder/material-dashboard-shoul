import { TefilotCards } from '@/widgets/tefilot/cards/tefilot-cards'
import { InputSavedCity } from '@/widgets/tefilot/input-saved-city'

export const Tefilot = () => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <InputSavedCity />
      </div>
      <TefilotCards />
    </section>
  )
}
