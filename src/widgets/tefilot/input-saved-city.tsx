import { City } from '@/data/saved-zmanim'
import { Input } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface CityResponse {
  data: City
}

export const InputSavedCity = () => {
  const fetchCity = async () => {
    const { data } = await axios.get<CityResponse>(
      'http://localhost:3000/api/city/all'
    )
    console.log('data: ', data)
    return data?.data
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['city'],
    queryFn: fetchCity,
  })

  console.log('data: ', data)
  if (error) {
    console.log('error: ', error)
  }

  return (
    <>
      <Input
        label={'Saved city'}
        value={isLoading ? 'loading...' : isError ? 'Error' : data.locationName}
        onChange={() => true}
        error={isError}
        disabled
      />
    </>
  )
}
