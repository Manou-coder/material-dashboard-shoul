import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZmaneiAyomForm } from '@/widgets/zmanei-ayom/zmanei-ayom.form'
import { useToggle } from '@/hooks/use-toggle'
import { ZmaneiAyomList } from '@/widgets/zmanei-ayom/zmanei-ayom.list'
import { Inputs, schema } from '@/lib/validation-zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SavedCities } from '@/widgets/zmanei-ayom/saved-cities'
import { useEffect, useState } from 'react'
import { DialogComponent } from '@/widgets/zmanei-ayom/DialogComponent'
import { Button, Option, Select } from '@material-tailwind/react'
import { useCityStore } from '@/store/cityStore'
import { City } from '@/data/saved-zmanim'
import { v4 as uuidv4 } from 'uuid'
import { ZmanimData } from '@/types/zmanim'
import { CustomError } from '@/types/global'
import { ZMANIM_ALL } from '@/lib/urls'

export const ZmaneiAyom = () => {
  const { value: isLoading, setValue: setIsLoading } = useToggle()
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [data, setData] = useState<ZmanimData | null>(null)
  const [actualCity, setActualCity] = useState<City | null>(null)
  const cities = useCityStore((state) => state.cities)
  const addCity = useCityStore((state) => state.addCity)
  const updateCity = useCityStore((state) => state.updateCity)

  const { register, handleSubmit, watch, control, setError, formState, reset } =
    useForm<Inputs>({ resolver: zodResolver(schema) })

  const handleGetZmanim = async (formData: Inputs | City) => {
    setData(null)
    const data = await getZmanimFromServer(formData)
    if (formData.id) {
      const existingCity = cities.find((c) => c.id === actualCity?.id)
      const city = { ...existingCity, ...formData }
      updateCity(city as City)
    } else {
      const city = { ...formData, id: uuidv4() }
      addCity(city as City)
    }
    setData(data.data)
    setOpen(false)
    setIsLoading(false)
    setActualCity(null)
    reset()
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const cityId = actualCity?.id
    handleGetZmanim({ ...formData, id: cityId })
  }

  const getZmanimFromServer = async (city: City | Inputs) => {
    setIsLoading(true)
    try {
      const response = await axios.get(ZMANIM_ALL, {
        params: city,
      })
      const data = response.data as ZmanimData | null
      if (!data) {
        throw new Error('no data from server')
      }
      setData(data)
      setIsLoading(false)
      reset()
      return { data }
    } catch (error) {
      setData(null)
      setIsLoading(false)
      toast.error((error as CustomError).message)
      return { data: null }
    }
  }

  return (
    <>
      {cities ? (
        <aside className="fixed right-0 top-20 z-50 my-4 mr-4 h-[calc(100vh-32px)] w-72 rounded-xl">
          <SavedCities
            reset={reset}
            setActualCity={setActualCity}
            setOpen={setOpen}
            getZmanimFromServer={getZmanimFromServer}
          />
        </aside>
      ) : (
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
      )}
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
          isLoading={isLoading}
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
