import { City } from '@/data/saved-zmanim'
import { create } from 'zustand'

const CITIES = 'cities'

const getCitiesFromLocalStorage = () => {
  const citiesJson = localStorage.getItem(CITIES) || null
  if (!citiesJson) return null
  const cities = JSON.parse(citiesJson)
  return cities
}

interface CityStore {
  cities: City[]
  addCity: (newCity: City) => void
  removeCity: (newCity: City) => void
  updateCity: (newCity: City) => void
}

export const useCityStore = create<CityStore>((set, get) => ({
  cities: getCitiesFromLocalStorage(),
  addCity: (newCity: City) => {
    const citiesState = get().cities || []
    const newCities = [...citiesState, newCity]
    const cities = { cities: newCities }
    const JsonCities = JSON.stringify(newCities)
    localStorage.setItem(CITIES, JsonCities)
    set(cities)
  },
  removeCity: (newCity: City) => {
    const citiesState = get().cities || []
    const newCities = citiesState.filter((c) => c.id !== newCity.id)
    const cities = { cities: newCities }
    const JsonCities = JSON.stringify(newCities)
    localStorage.setItem(CITIES, JsonCities)
    set(cities)
  },
  updateCity: (newCity: City) => {
    const citiesState = get().cities || []
    const exsistingCityIndex = citiesState.findIndex((c) => c.id === newCity.id)
    if (exsistingCityIndex >= 0) {
      citiesState[exsistingCityIndex] = newCity
    }
    const cities = { cities: citiesState }
    const JsonCities = JSON.stringify(citiesState)
    localStorage.setItem(CITIES, JsonCities)
    set(cities)
  },
}))
