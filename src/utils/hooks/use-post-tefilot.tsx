import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const usePostTefilot = ({ setOpen }: Props) => {
  const postTefilot = async (newTefilot: object) => {
    return axios.post('http://localhost:3000/api/tefilot/add', newTefilot)
  }

  const query = useQueryClient()

  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: postTefilot,
    onSuccess: () => {
      setOpen(false)
      toast.success('Tefilot added successfully')
      query.invalidateQueries(['tefilot'])
    },
    onError(error: any) {
      console.log('error: ', error.response.data.error.message)
      toast.error(error.message)
    },
  })

  return { mutate, isPostLoading }
}
