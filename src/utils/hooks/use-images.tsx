import { Tefila, Yom } from '@/data/yamim-data'
import { CustomError } from '@/types/global'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

interface ImagesResponse {
  data: string[] | null
}

export const useImages = () => {
  const fetchImages = async () => {
    try {
      const { data } = await axios.get<ImagesResponse>(
        'http://localhost:3000/api/images/all'
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
    queryKey: ['images'],
    queryFn: fetchImages,
  })
  return { data, isLoading, error, isError }
}
