import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZmaneiAyomForm } from '@/widgets/zmanei-ayom/zmanei-ayom.form'
import { useToggle } from '@/hooks/use-toggle'
import { ZmaneiAyomList } from '@/widgets/zmanei-ayom/zmanei-ayom.list'
import { Inputs, schema } from '@/lib/validation-zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SavedZmanim } from '@/widgets/zmanei-ayom/saved-zmanim'
import { savedZmanim } from '@/data/saved-zmanim'
import { useEffect, useState } from 'react'
import { DialogComponent } from '@/widgets/zmanei-ayom/DialogComponent'
import { Button } from '@material-tailwind/react'
import { getFromLocalStorage, saveInLocalStorage } from '@/lib/locale-storage'

interface CustomError {
  message: string
}

export const ZmaneiAyom = () => {
  const { value: isLoading, setValue: setIsLoading } = useToggle()
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [data, setData] = useState<any>(null)
  const [cities, setCities] = useState<any>(null)

  const { register, handleSubmit, watch, control, setError, formState } =
    useForm<Inputs>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const cities = getFromLocalStorage('cities')
    setCities(cities)
    console.log('cities: ', cities)
  }, [])

  const handleGetZmanim = async () => {
    const url = 'http://localhost:3000/api/zmanim/all'
    try {
      const data = await axios.get(url, {
        params: { ...watch() },
      })
      const cities = getFromLocalStorage('cities')
      saveInLocalStorage('cities', watch())
      setData(data)
      setOpen(false)
      return
    } catch (error) {
      toast.error((error as CustomError).message)
      return
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    console.log('formData: ', formData)
    setIsLoading(true)
    await handleGetZmanim()
    setIsLoading(false)
  }

  return (
    <>
      {cities ? (
        <aside className="fixed right-0 top-20 z-50 my-4 mr-4 h-[calc(100vh-32px)] w-72 rounded-xl">
          <SavedZmanim list={cities?.data} setOpen={setOpen} />
        </aside>
      ) : (
        <div className="flex justify-center items-center">
          <Button onClick={() => setOpen(true)} className="mt-40">
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
        />
      </DialogComponent>
      <div className="mt-10 mr-[304px]">
        <ZmaneiAyomList data={data?.data} />
      </div>
    </>
  )
}
