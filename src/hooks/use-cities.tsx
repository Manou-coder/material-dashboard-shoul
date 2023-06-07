import { getFromLocalStorage } from '@/lib/locale-storage'
import { useState } from 'react'

export const useCities = () => {
  const [cities, setCities] = useState<any | []>(
    getCitiesFromLocalStorage('cities')
  )
  return {
    cities,
    setCities,
  }
}

const getCitiesFromLocalStorage = (name: string) => {
  const { data, error } = getFromLocalStorage(name)
  if (error || !data) return []
  return data
}
