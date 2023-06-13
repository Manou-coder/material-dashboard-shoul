import { City } from '@/data/saved-zmanim'
import { CustomError } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface CityResponse {
  data: City
}

export const useCity = () => {
  const fetchCity = async () => {
    try {
      const { data } = await axios.get<CityResponse>(
        'http://localhost:3000/api/city/all'
      )
      console.log('data: ', data)
      return data?.data
    } catch (error) {
      const customError = error as CustomError
      toast.error(customError.message)
      return null
    }
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['city'],
    queryFn: fetchCity,
  })
  return { data, isLoading, error, isError }
}
