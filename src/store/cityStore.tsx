import { Inputs } from '@/lib/validation-zod'
import { create } from 'zustand'

interface IBook {
  cities: Inputs[]
  addCity: (newCity: Inputs) => void
}

export const useBookStore = create<IBook>((set, get) => ({
  cities: [],
  addCity: (newCity: Inputs) => {
    const citiesState = get().cities
    set({ cities: [...citiesState, newCity] })
  },
}))
