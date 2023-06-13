import { City } from '@/data/saved-zmanim'
import { useToggle } from '@/utils/hooks/use-toggle'
import { Inputs, schema } from '@/lib/validation-zod'
import { CustomError } from '@/types/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZmanimView } from './zmanim.view'
import { useZmanim } from '@/utils/hooks/use-zmanim'
import { usePostCity } from '@/utils/hooks/use-post-city'

export const ZmanimContainer = () => {
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [actualCity, setActualCity] = useState<City | null>(null)

  const { data, isLoading, error } = useZmanim()

  const { mutate, isPostLoading } = usePostCity({ setOpen })

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
    <ZmanimView
      form={{
        register,
        handleSubmit,
        watch,
        control,
        setError,
        formState,
        reset,
        onSubmit,
        isLoading: isPostLoading,
      }}
      isLoading={isLoading}
      data={data}
      modal={{ open, setOpen, toggleOpen }}
    />
  )
}
