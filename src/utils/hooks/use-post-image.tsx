import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export const usePostImage = () => {
  const Image = async (formData: FormData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    return await axios.post(
      'http://localhost:3000/api/images/add',
      formData,
      config
    )
  }

  const query = useQueryClient()

  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: Image,
    onSuccess: () => {
      toast.success('image added successfully')
      query.invalidateQueries(['images'])
    },
    onError(error: any) {
      console.log('error: ', error)
      toast.error(error.message)
    },
  })

  return { mutate, isPostLoading }
}
