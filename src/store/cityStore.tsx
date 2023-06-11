import { City } from '@/data/saved-zmanim'
import { create } from 'zustand'

const CITIES = 'cities'
const ACTUAL_CITY_FOR_ZMANIM_AUTO = 'actual_city_for_zmanim_auto'

const getCitiesFromLocalStorage = () => {
  const citiesJson = localStorage.getItem(CITIES) || null
  if (!citiesJson) return null
  const cities = JSON.parse(citiesJson)
  return cities
}

const getActualCityForZmanimAutoFromLocalStorage = () => {
  const actualCityForZAJson =
    localStorage.getItem(ACTUAL_CITY_FOR_ZMANIM_AUTO) || null
  if (!actualCityForZAJson) return null
  const actualCityForZA = JSON.parse(actualCityForZAJson)
  return actualCityForZA
}

interface CityStore {
  cities: City[]
  addCity: (newCity: City) => void
  removeCity: (newCity: City) => void
  updateCity: (newCity: City) => void
  actualCityForZamnim: City | null
  updateActualCityForZamnim: (newCity: City) => void
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
  actualCityForZamnim: getActualCityForZmanimAutoFromLocalStorage(),
  updateActualCityForZamnim: (newCity: City | null) => {
    if (newCity) {
      const JsonNewCity = JSON.stringify(newCity)
      localStorage.setItem(ACTUAL_CITY_FOR_ZMANIM_AUTO, JsonNewCity)
    }
    set({ actualCityForZamnim: newCity })
  },
}))
