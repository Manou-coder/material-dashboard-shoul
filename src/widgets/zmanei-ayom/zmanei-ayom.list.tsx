import { Inputs } from '@/lib/validation-zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FormState } from 'react-hook-form'

interface Props {
  formState: FormState<Inputs>
}

export const ZmaneiAyomList = ({ formState }: Props) => {
  console.log('formState: ', formState)
  // Queries
  const {
    data,
    error,
    isLoading: isQueryLoading,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  console.log('data: ', data)
  console.log('error: ', error)
  console.log('isQueryLoading: ', isQueryLoading)

  async function getTodos() {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/postshygtfre'
    )
    return data
  }
  return <div>Hello world</div>
}
