import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useZmanim = () => {
  const fetchZmanCity = async () => {
    const { data } = await axios.get('http://localhost:3000/api/city/zman')
    return data
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['zmanim'],
    queryFn: fetchZmanCity,
  })
  return { data, isLoading, error }
}
