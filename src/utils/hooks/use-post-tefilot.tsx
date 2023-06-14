import { Yom } from '@/data/yamim-data'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

// interface Props {
//   setOpen?: Dispatch<SetStateAction<boolean>>
// }

export const usePostTefilot = () => {
  const postTefilot = async (newTefilot: Yom[]) => {
    return axios.post('http://localhost:3000/api/tefilot/add', newTefilot)
  }

  const query = useQueryClient()
  console.log('query: ', query)

  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: postTefilot,
    onSuccess: () => {
      // setOpen(false)
      toast.success('Tefilot added successfully')
      query.resetQueries(['tefilot'])
    },
    onError(error: any) {
      console.log('error: ', error.response.data.error.message)
      toast.error(error.message)
    },
  })

  return { mutate, isPostLoading }
}
