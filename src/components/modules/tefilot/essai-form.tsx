import { zodResolver } from '@hookform/resolvers/zod'
import { Radio } from '@material-tailwind/react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const EssaiForm = () => {
  const schema = z.object({
    radio: z.string().nonempty(),
  })

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState,
    reset,
    setValue,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })
  const { errors } = formState ?? {}
  console.log('watch: ', watch())
  return (
    <div>
      <Radio
        id="no-change"
        label="nochange"
        defaultChecked
        value={'no-change'}
        {...register('radio')}
      />
      <Radio
        id="round-down"
        label="round down to the nearest 5 minutes."
        value="round-down"
        {...register('radio')}
      />
      <Radio
        id="round-up"
        label="round up to the nearest 5 minutes."
        value="round-up"
        {...register('radio')}
      />
    </div>
  )
}
