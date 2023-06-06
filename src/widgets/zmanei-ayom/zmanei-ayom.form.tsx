import { timeZoneIdList } from '@/data/time-zone-id-list-data'
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from '@/lib/custom-components'
import { Inputs } from '@/lib/validation-zod'
import { Checkbox, Typography } from '@material-tailwind/react'
import {
  Control,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
  UseFormWatch,
} from 'react-hook-form'

interface Props {
  register: UseFormRegister<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  watch: UseFormWatch<Inputs>
  control: Control<Inputs>
  setError: UseFormSetError<Inputs>
  formState: FormState<Inputs>
  onSubmit: SubmitHandler<Inputs>
  isLoading: boolean
}
export const ZmaneiAyomForm = ({
  register,
  handleSubmit,
  control,
  formState,
  onSubmit,
  isLoading,
  watch,
}: Props) => {
  const { errors } = formState ?? {}
  // console.log('watch: ', watch())
  // console.log('errors: ', errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            required
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            register={register}
            inputName="date"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            required
            register={register}
            labelName="City Name"
            inputName="locationName"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomSelect
            required
            control={control}
            register={register}
            labelName="Time Zone ID"
            inputName="timeZoneId"
            list={[...timeZoneIdList]}
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            defaultValue={'0'}
            type="number"
            required
            register={register}
            inputName="longitude"
            min={-180}
            max={180}
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            defaultValue={'0'}
            type="number"
            required
            register={register}
            inputName="latitude"
            min={-90}
            max={90}
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            min={0}
            defaultValue={'0'}
            type="number"
            register={register}
            inputName="elevation"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Checkbox
            {...register('complexZmanim')}
            defaultChecked
            label={<Typography>Complex Zmanim</Typography>}
          />
        </div>
        <div className="col-span-12">
          <CustomButton
            isLoading={isLoading}
            className="text-white mx-auto w-32 h-9"
            size="md"
          >
            <Typography variant="small" className="font-bold">
              Send
            </Typography>
          </CustomButton>
        </div>
      </div>
    </form>
  )
}
