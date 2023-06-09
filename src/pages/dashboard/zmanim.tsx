import { ZmanimCards } from '@/widgets/zmanim/ZmanimCards'
import { ZmanimSelectCity } from '@/widgets/zmanim/ZmanimSelectCity'

export const Zmanim = () => {
  return (
    <section className="mt-6">
      <div className="mb-40">
        <ZmanimSelectCity />
      </div>
      <ZmanimCards />
    </section>
  )
}
