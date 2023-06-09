import React from 'react'
import { ZmanimCard } from './ZmanimCard'

export const ZmanimCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <ZmanimCard
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
        <ZmanimCard type="Shabat" color="green" />
      </div>
      <div>
        <ZmanimCard type="Chol" />
      </div>
    </div>
  )
}
