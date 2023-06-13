import { converAllValuesToString } from '@/lib/string'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const usePostCity = ({ setOpen }: Props) => {
  const postCity = async (newCity: object) => {
    const newCityValuesStringified = converAllValuesToString(newCity)
    return axios.post(
      'http://localhost:3000/api/city/add',
      newCityValuesStringified
    )
  }

  const query = useQueryClient()

  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: postCity,
    onSuccess: () => {
      setOpen(false)
      toast.success('city added successfully')
      query.invalidateQueries(['zmanim'])
    },
    onError(error: any) {
      console.log('error: ', error.response.data.error.message)
      toast.error(error.message)
    },
  })

  return { mutate, isPostLoading }
}
