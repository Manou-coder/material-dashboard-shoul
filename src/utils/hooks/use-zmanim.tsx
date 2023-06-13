import { CustomError } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export const useZmanim = () => {
  const fetchZmanCity = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/city/zman')
      return data
    } catch (error) {
      const customError = error as CustomError
      toast.error(customError.message)
      return null
    }
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['zmanim'],
    queryFn: fetchZmanCity,
  })
  return { data, isLoading, error }
}
