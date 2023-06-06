import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZmaneiAyomForm } from '@/widgets/zmanei-ayom/zmanei-ayom.form'
import { useToggle } from '@/hooks/use-toggle'
import { ZmaneiAyomList } from '@/widgets/zmanei-ayom/zmanei-ayom.list'
import { Inputs, schema } from '@/lib/validation-zod'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { createAxios } from '@/lib/axios'
import { Button, Collapse, Typography } from '@material-tailwind/react'
import { SavedZmanim } from '@/widgets/zmanei-ayom/saved-zmanim'
import { savedZmanim } from '@/data/saved-zmanim'

export const ZmaneiAyom = () => {
  const { data, refetch, error } = useQuery({
    queryKey: ['zmanim'],
    queryFn: getZmanim,
    enabled: false,
  })

  console.log('error: ', error)
  const { value: isLoading, setValue: setIsLoading } = useToggle()
  const { value: open, setValue: setOpen, toggle: toogleOpen } = useToggle()

  const { register, handleSubmit, watch, control, setError, formState } =
    useForm<Inputs>({ resolver: zodResolver(schema) })

  async function getZmanim() {
    const data = await axios.get('http://localhost:3000/api/zmanim/all', {
      params: { ...watch() },
    })
    return data
  }

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsLoading(true)
    await refetch()
    setIsLoading(false)
  }

  interface CustomError {
    message: string
  }

  if (error) {
    const id = toast.error((error as CustomError).message)
    console.log('id: ', id)
    setIsLoading(false)
  }

  return (
    <>
      <aside className="fixed right-0 z-50 my-4 mr-4 h-[calc(100vh-32px)] w-72 rounded-xl">
        <SavedZmanim list={savedZmanim} />
      </aside>
      <div className="mt-10 mr-[304px]">
        <Button color="blue" size="lg" className="w-full" onClick={toogleOpen}>
          <Typography variant="h6">new search +</Typography>
        </Button>
        <Collapse open={open}>
          <div className="mt-10">
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
          </div>
        </Collapse>
        <ZmaneiAyomList data={data?.data} />
      </div>
    </>
  )
}
