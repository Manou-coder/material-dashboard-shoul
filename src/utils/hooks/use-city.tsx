import { City } from '@/data/saved-zmanim'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface CityResponse {
  data: City
}

export const useCity = () => {
  const fetchCity = async () => {
    const { data } = await axios.get<CityResponse>(
      'http://localhost:3000/api/city/all'
    )
    console.log('data: ', data)
    return data?.data
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['city'],
    queryFn: fetchCity,
  })
  return { data, isLoading, error, isError }
}
