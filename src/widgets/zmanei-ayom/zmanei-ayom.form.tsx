import { timeZoneIdList } from '@/data/time-zone-id-list-data'
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from '@/lib/custom-components'
import { Inputs } from '@/lib/validation-zod'
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
}: Props) => {
  const { errors } = formState ?? {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6">
          <CustomInput
            required
            register={register}
            labelName="City Name"
            inputName="city"
            errors={errors}
          />
        </div>
        <div className="col-span-6">
          <CustomSelect
            required
            control={control}
            register={register}
            labelName="Time Zone ID"
            inputName="timeZoneId"
            list={timeZoneIdList}
            errors={errors}
          />
        </div>
        <div className="col-span-4">
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
        <div className="col-span-4">
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
        <div className="col-span-4">
          <CustomInput
            min={0}
            defaultValue={'0'}
            type="number"
            register={register}
            inputName="altitude"
            errors={errors}
          />
        </div>
        <div className="col-span-12">
          <CustomButton isLoading={isLoading} className="text-white">
            Send
          </CustomButton>
        </div>
      </div>
    </form>
  )
}
