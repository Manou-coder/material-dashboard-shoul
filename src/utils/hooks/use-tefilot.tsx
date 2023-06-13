import { Tefila, Yom } from '@/data/yamim-data'
import { CustomError } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface TefilotResponse {
  data: Yom[] | null
}

export const useTefilot = () => {
  const fetchTefilot = async () => {
    try {
      const { data } = await axios.get<TefilotResponse>(
        'http://localhost:3000/api/tefilot/all'
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
    queryKey: ['tefilot'],
    queryFn: fetchTefilot,
  })
  return { data, isLoading, error, isError }
}
