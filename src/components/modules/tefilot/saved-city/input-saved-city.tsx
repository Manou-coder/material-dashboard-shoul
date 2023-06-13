import { useCity } from '@/utils/hooks/use-city'
import { Input } from '@material-tailwind/react'

export const InputSavedCity = () => {
  const { data, isLoading, error, isError } = useCity()
  console.log('data: ', data)

  if (error) {
    console.log('error: ', error)
  }

  return (
    <>
      <Input
        label={'Saved city'}
        value={
          isLoading ? 'loading...' : isError ? 'Error' : data?.locationName
        }
        onChange={() => true}
        error={isError}
        disabled
      />
    </>
  )
}
