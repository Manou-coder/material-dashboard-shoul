import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZmaneiAyomForm } from '@/widgets/zmanei-ayom/zmanei-ayom.form'
import { useToggle } from '@/hooks/use-toggle'
import { ZmaneiAyomList } from '@/widgets/zmanei-ayom/zmanei-ayom.list'
import { Inputs, schema } from '@/lib/validation-zod'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { DialogComponent } from '@/widgets/zmanei-ayom/DialogComponent'
import { Button } from '@material-tailwind/react'
import { City } from '@/data/saved-zmanim'
import { v4 as uuidv4 } from 'uuid'
import { CustomError } from '@/types/global'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { converAllValuesToString } from '@/lib/string'
import axios from 'axios'

export const ZmaneiAyom = () => {
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [actualCity, setActualCity] = useState<City | null>(null)

  const fetchZmanCity = async () => {
    const { data } = await axios.get('http://localhost:3000/api/city/zman')
    return data
  }

  const postCity = async (newCity: object) => {
    const newCityValuesStringified = converAllValuesToString(newCity)
    return axios.post(
      'http://localhost:3000/api/city/add',
      newCityValuesStringified
    )
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['zmanim'],
    queryFn: fetchZmanCity,
  })

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

  const { register, handleSubmit, watch, control, setError, formState, reset } =
    useForm<Inputs>({ resolver: zodResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const newCity = { ...formData, id: uuidv4() }
    mutate(newCity)
  }

  if (error) {
    const customError = error as CustomError
    toast.error(customError.message)
    return <h1>ERROR</h1>
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <Button
          onClick={() => {
            setActualCity(null)
            setOpen(true)
          }}
          className="mt-40"
        >
          Add city
        </Button>
      </div>
      <DialogComponent
        title="Zmanim options"
        open={open}
        setOpen={setOpen}
        toggleOpen={toggleOpen}
      >
        <ZmaneiAyomForm
          register={register}
          handleSubmit={handleSubmit}
          watch={watch}
          control={control}
          setError={setError}
          formState={formState}
          onSubmit={onSubmit}
          isLoading={isPostLoading}
          defaultValues={{
            date: actualCity?.date,
            longitude: actualCity?.longitude,
            locationName: actualCity?.locationName,
            latitude: actualCity?.latitude,
            elevation: actualCity?.elevation,
            timeZoneId: actualCity?.timeZoneId,
            complexZmanim: actualCity?.complexZmanim ? 'true' : 'false',
          }}
        />
      </DialogComponent>
      <div className="mt-10 mr-[304px]">
        <ZmaneiAyomList data={data} isLoading={isLoading} />
      </div>
    </>
  )
}
