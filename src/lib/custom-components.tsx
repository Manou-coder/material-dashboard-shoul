import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  Option,
  Select,
  SelectProps,
  Spinner,
  Typography,
} from '@material-tailwind/react'
import { v4 as uuidv4 } from 'uuid'
import { ReactNode, useEffect, useRef } from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { capitalizeFirstLetter } from './capitalize'

interface CustomInputProps extends InputProps {
  inputName: string
  register: UseFormRegister<any>
  labelName?: string
  required?: boolean
  errors?: any
}

export const CustomInput = ({
  className,
  register,
  inputName,
  labelName = capitalizeFirstLetter(inputName),
  required = false,
  errors,
  type,
  defaultValue,
  min,
  max,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!inputRef.current) {
      return
    }
    addRedStarToLabel(inputRef.current, required, labelName)
  }, [inputRef])

  return (
    <div ref={inputRef} className="col-span-6">
      <Input
        className={className}
        type={type}
        {...register(inputName)}
        label={labelName}
        defaultValue={defaultValue}
        min={min}
        max={max}
        error={errors && errors[inputName] ? true : false}
      />
      <div className="h-[21px]">
        <Typography as="span" variant="small" color="red">
          {errors && errors[inputName]?.message
            ? errors[inputName]?.message
            : ''}
        </Typography>
      </div>
    </div>
  )
}

type OptionalChildrenSelectProps = Omit<SelectProps, 'children'>

interface CustomSelectProps extends OptionalChildrenSelectProps {
  control: Control<any>
  list: string[]
  inputName: string
  register: UseFormRegister<any>
  labelName?: string
  required?: boolean
  errors?: any
  children?: ReactNode
}

export const CustomSelect = ({
  className,
  control,
  list,
  inputName,
  labelName = capitalizeFirstLetter(inputName),
  required = false,
  errors,
}: CustomSelectProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!inputRef.current) {
      return
    }
    addRedStarToLabel(inputRef.current, required, labelName)
  }, [inputRef])

  return (
    <div ref={inputRef} className="col-span-6">
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <Select
            className={className}
            {...field}
            label={labelName}
            error={errors && errors[inputName] ? true : false}
          >
            {list &&
              list.map((element) => (
                <Option key={uuidv4()} value={element}>
                  {element}
                </Option>
              ))}
          </Select>
        )}
      />
      <div className="h-[21px]">
        <Typography as="span" variant="small" color="red">
          {errors && errors[inputName]?.message
            ? errors[inputName]?.message
            : ''}
        </Typography>
      </div>
    </div>
  )
}

function addRedStarToLabel(
  ref: HTMLDivElement,
  required: boolean,
  labelName: string
) {
  const firstChild = ref.children[0]
  const labelDiv = firstChild && firstChild.children[1]
  if (labelDiv && required) {
    labelDiv.innerHTML =
      labelName + '<span class="inline-block text-red-500 ml-0.5">*</span>'
  }
}

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
}
export const CustomButton = ({
  className,
  isLoading = false,
  children,
}: CustomButtonProps) => {
  return (
    <Button
      className="w-full flex justify-center items-center"
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? <Spinner className={className} /> : children}
    </Button>
  )
}
