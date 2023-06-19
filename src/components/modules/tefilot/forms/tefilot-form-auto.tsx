import { Tefila, Yom } from '@/data/yamim-data'
import { CustomButton, CustomSelect } from '@/lib/custom-components'
import { formatDate } from '@/lib/dates'
import { RoundDirection, RoundDirections } from '@/lib/round-direction'
import { convertCamelCaseToWords, isBasicZmanimKey } from '@/lib/string'
import { TefilotFormInputs, schemaTefilotFormAuto } from '@/lib/validation-zod'
import { usePostTefilot } from '@/utils/hooks/use-post-tefilot'
import { useZmanim } from '@/utils/hooks/use-zmanim'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Option, Radio, Typography } from '@material-tailwind/react'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { updateTefilot } from './tefilot-form-manual'
import { toast } from 'react-toastify'
import { useTefilot } from '@/utils/hooks/use-tefilot'

interface Props {
  yom: Yom
  tefila: Tefila
}

interface ReferZman {
  zmanName: string
  zmanTime: string | Date
}

export const TefilotFormAuto = ({ tefila, yom }: Props) => {
  const [referZman, setReferZman] = useState<ReferZman | null>(null)

  const { data, error, isLoading } = useZmanim()
  const { data: dataTefilot } = useTefilot()
  const { mutate, isPostLoading } = usePostTefilot()

  const { register, handleSubmit, watch, control, formState, reset } =
    useForm<TefilotFormInputs>({
      resolver: zodResolver(schemaTefilotFormAuto),
    })
  const { errors } = formState
  console.log('errors: ', errors)
  const { nearest, referTo, addOrRemove } = watch()

  const listZmanim = useMemo(() => {
    if (!data || !data.Zmanim) return []
    return Object.entries(data.Zmanim)
  }, [data])

  if (error) {
    return null
  }

  const onSubmit: SubmitHandler<TefilotFormInputs> = async (formData) => {
    console.log('formData: ', formData)
    const shedule = `${formData.referTo}, ${formData.addOrRemove}, ${formData.nearest}`
    const tefilot = updateTefilot(dataTefilot, yom, tefila, shedule)
    console.log('tefilot: ', tefilot)
    if (!tefilot) {
      toast.error('error when update tefila')
      return
    }
    mutate(tefilot)
  }
  console.log('watch: ', watch())

  const calculateModifiedZmanTime = () => {
    if (!referZman) return null
    let zmanTime = new Date(referZman.zmanTime)
    if (addOrRemove) {
      zmanTime = manipulateDateByMinutes(zmanTime, addOrRemove)
    }
    if (nearest) {
      zmanTime = roundToNearestFiveMinutes(zmanTime, nearest)
    }
    return zmanTime
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Typography variant="h5">ZmanimAuto</Typography>
        <Typography variant="h6">Refer to: {referTo}</Typography>

        <Input
          label="exemple"
          disabled
          defaultValue={calculateModifiedZmanTime()?.toLocaleString('fr', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
        <CustomSelect<keyof TefilotFormInputs>
          defaultValue={''}
          required
          control={control}
          register={register}
          labelName="Refer to"
          inputName="referTo"
          errors={errors}
        >
          {listZmanim &&
            [...listZmanim].map(([key, value]) => (
              <Option
                key={uuidv4()}
                value={key}
                onClick={() => {
                  setReferZman({ ...referZman, zmanName: key, zmanTime: value })
                }}
              >
                <div className="flex gap-2">
                  <Typography
                    color={isBasicZmanimKey(key) ? 'black' : 'gray'}
                    className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
                  >
                    {convertCamelCaseToWords(key)}:
                  </Typography>
                  <Typography
                    color={isBasicZmanimKey(key) ? 'black' : 'gray'}
                    className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
                  >
                    (ex: {new Date(value).toLocaleTimeString()})
                  </Typography>
                </div>
              </Option>
            ))}
        </CustomSelect>
        <Input
          {...register('addOrRemove')}
          label="Add or remove a number of minutes"
          type="number"
        />
        <div className="flex gap-10">
          <Radio
            id="no-change"
            label="nochange"
            checked={!watch().nearest}
            value={''}
            {...register('nearest')}
          />
          <Radio
            id={RoundDirections.Down}
            label="round down to the nearest 5 minutes."
            checked={watch().nearest === RoundDirections.Down}
            value={RoundDirections.Down}
            {...register('nearest')}
          />
          <Radio
            id={RoundDirections.Up}
            label="round up to the nearest 5 minutes."
            checked={watch().nearest === RoundDirections.Up}
            value={RoundDirections.Up}
            {...register('nearest')}
          />
        </div>
        <CustomButton type="submit">Save</CustomButton>
      </div>
    </form>
  )
}

// function that verify if date is valid

function manipulateDateByMinutes(date: Date, minutesStr: string) {
  const minutes = Number(minutesStr)
  return new Date(date.getTime() + minutes * 60000)
}

function roundToNearestFiveMinutes(
  time: Date,
  direction: RoundDirection
): Date {
  const minutes = time.getMinutes()
  let roundedMinutes = 0

  if (direction === RoundDirections.Down) {
    roundedMinutes = Math.floor(minutes / 5) * 5
  } else if (direction === RoundDirections.Up) {
    roundedMinutes = Math.ceil(minutes / 5) * 5
  }

  time.setMinutes(roundedMinutes)
  time.setSeconds(0)
  time.setMilliseconds(0)
  return time
}
