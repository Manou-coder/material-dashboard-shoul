import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZmaneiAyomForm } from '@/widgets/zmanei-ayom/zmanei-ayom.form'
import { useToggle } from '@/hooks/use-toggle'
import { ZmaneiAyomList } from '@/widgets/zmanei-ayom/zmanei-ayom.list'
import { Inputs, schema } from '@/lib/validation-zod'
import { useState } from 'react'
import axios from 'axios'

export const ZmaneiAyom = () => {
  const [formData, setFormData] = useState<Inputs | null>(null)
  const { value: isLoading, setValue: setIsLoading, toggle } = useToggle()

  const { register, handleSubmit, watch, control, setError, formState } =
    useForm<Inputs>({ resolver: zodResolver(schema) })

  const localhost = 'http://localhost:3000'

  const a =
    'http://localhost:3000/api/zmanim/all?locationName=paris&longitude=20&latitude=20&timeZoneId=Asia/Jerusale&elevation'

  const getZmanim = async () => {
    const { data } = await axios.get(`${localhost}/api/zmanim/all`)
    return data
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('data: ', data)
    setIsLoading(true)
  }

  return (
    <div className="mt-8">
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
      <ZmaneiAyomList formState={formState} />
    </div>
  )
}
