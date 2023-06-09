import { timeZoneIdList } from '@/data/time-zone-id-list-data'
import {
  CustomButton,
  CustomInput,
  CustomSelect,
} from '@/lib/custom-components'
import { Inputs } from '@/lib/validation-zod'
import { ZmanimFormTypes } from '@/types/zmanim-form-types'
import { Checkbox, Option, Typography } from '@material-tailwind/react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  form: ZmanimFormTypes
}

export const ZmanimForm = ({ form }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState,
    onSubmit,
    isLoading,
    watch,
    defaultValues = {},
  } = form
  const { errors } = formState ?? {}
  // console.log('watch: ', watch())
  const currentDate = new Date().toISOString().split('T')[0]
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            required
            type="date"
            defaultValue={defaultValues['date'] || currentDate}
            register={register}
            inputName="date"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            required
            defaultValue={defaultValues['locationName'] || ''}
            register={register}
            labelName="City Name"
            inputName="locationName"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <CustomSelect<keyof Inputs>
            defaultValue={defaultValues['timeZoneId'] || ''}
            required
            control={control}
            register={register}
            labelName="Time Zone ID"
            inputName="timeZoneId"
            errors={errors}
          >
            {[...timeZoneIdList].map((element) => (
              <Option key={uuidv4()} value={element}>
                {element}
              </Option>
            ))}
          </CustomSelect>
        </div>
        <div className="col-span-12 md:col-span-3">
          <CustomInput
            defaultValue={defaultValues['longitude'] || '0'}
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
            defaultValue={defaultValues['latitude'] || '0'}
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
            // min={0}
            defaultValue={defaultValues['elevation'] || '0'}
            type="number"
            register={register}
            inputName="elevation"
            errors={errors}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <Checkbox
            {...register('complexZmanim')}
            defaultChecked={
              defaultValues['complexZmanim'] === 'true' ? true : false
            }
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
