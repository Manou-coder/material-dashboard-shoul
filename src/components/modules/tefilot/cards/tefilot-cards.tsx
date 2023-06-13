import { TefilotCard } from './tefilot-card'

export const TefilotCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <TefilotCard
          type="Chol"
          color="blue"
          zmanim={{
            shacharit: '8:00',
            mincha: '14:00',
            arvit: '20:00',
          }}
        />
      </div>
      <div>
        <TefilotCard type="Shabat" color="green" />
      </div>
      <div>
        <TefilotCard type="Chol" />
      </div>
    </div>
  )
}
