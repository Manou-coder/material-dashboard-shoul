import { CustomError } from '@/types/global'
import { ZmanimData } from '@/types/zmanim'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface ZmanimResponse {
  data: ZmanimData
}

export const useZmanim = () => {
  const fetchZmanCity = async () => {
    try {
      const { data } = await axios.get<ZmanimResponse>(
        'http://localhost:3000/api/city/zman'
      )
      console.log('data 0000: ', data)
      return data?.data
    } catch (error) {
      console.log('error: ', error)
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
