import { ZmanimCards } from '@/widgets/tefilot/ZmanimCards'
import { InputSavedCity } from '@/widgets/tefilot/input-saved-city'

export const Tefilot = () => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <InputSavedCity />
      </div>
      <ZmanimCards />
    </section>
  )
}
