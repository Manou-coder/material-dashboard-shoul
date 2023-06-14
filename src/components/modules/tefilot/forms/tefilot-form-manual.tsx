import { Tefila, Yom } from '@/data/yamim-data'
import { Inputs, schema } from '@/lib/validation-zod'
import { usePostTefilot } from '@/utils/hooks/use-post-tefilot'
import { useTefilot } from '@/utils/hooks/use-tefilot'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Typography } from '@material-tailwind/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const errorMessageRequired = 'This field is required'

export const tefilaSchema = z.object({
  schedule: z.string().min(1, { message: errorMessageRequired }),
})

type ZodInputs = z.infer<typeof tefilaSchema>

export type TefilaInputs = ZodInputs

interface Props {
  yom: Yom
  tefila: Tefila
}

export const TefilotFormManual = ({ yom, tefila }: Props) => {
  const { register, handleSubmit, watch, control, setError, formState, reset } =
    useForm<TefilaInputs>({ resolver: zodResolver(tefilaSchema) })

  const { data } = useTefilot()

  const { mutate, isPostLoading } = usePostTefilot()

  const onSubmit: SubmitHandler<TefilaInputs> = async (formData) => {
    const tefilot = updateTefilot(data, yom, tefila, formData)
    if (!tefilot) {
      toast.error('error when update tefila')
      return
    }
    mutate(tefilot)
  }

  return (
    <>
      <div className="flex gap-2">
        <Typography>tefila_name:</Typography>
        <Typography>{tefila.tefila_name}</Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('schedule')}
          defaultValue={tefila.schedule}
          type="time"
          label="Schedule"
        />
        <Button type="submit" className="mt-20">
          Send
        </Button>
      </form>
    </>
  )
}

const updateTefilot = (
  tefilot: Yom[] | null | undefined,
  yom: Yom,
  tefila: Tefila,
  formData: TefilaInputs
) => {
  if (!tefilot) return null

  const yomIndex = tefilot.findIndex((y) => y.id === yom.id)

  if (yomIndex === -1) return null

  const selectedTefilot = tefilot[yomIndex].tefilot
  const tefilaIndex = selectedTefilot.findIndex(
    (t) => t.tefila_name === tefila.tefila_name
  )

  if (tefilaIndex === -1) return null

  const selectedTefila = selectedTefilot[tefilaIndex]
  selectedTefila.schedule = formData.schedule

  // update created date
  tefilot[yomIndex].created_at = new Date().toUTCString()
  return tefilot
}
