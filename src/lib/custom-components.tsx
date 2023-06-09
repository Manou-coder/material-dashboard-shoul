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
import { capitalizeFirstLetter } from './string'
import clsx from 'clsx'

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
  value,
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
        value={value}
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

interface CustomSelectProps<T> extends OptionalChildrenSelectProps {
  control: Control<any>
  inputName: T
  register: UseFormRegister<any>
  labelName?: string
  required?: boolean
  errors?: any
  children: ReactNode
  defaultValue?: any
}

export const CustomSelect = <T,>({
  children,
  defaultValue,
  className,
  control,
  inputName,
  labelName = capitalizeFirstLetter(inputName),
  required = false,
  errors,
}: CustomSelectProps<T & string>) => {
  const inputRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!inputRef.current) {
      return
    }
    addRedStarToLabel(inputRef.current, required, labelName)
    addDefaultValues(inputRef.current, defaultValue)
  }, [inputRef, defaultValue])

  return (
    <div ref={inputRef} className="col-span-6">
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <Select
            className={className}
            onChange={field.onChange}
            defaultValue={field.value}
            label={labelName}
            error={errors && errors[inputName] ? true : false}
            // value={' '}
          >
            {children}
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

function addDefaultValues(
  ref: HTMLDivElement,
  value: string | number | readonly string[] | undefined
) {
  const firstChild = ref.children[0]
  const buttonDiv = firstChild && firstChild.children[0]
  const spanDiv = buttonDiv && buttonDiv.children[0]
  if (spanDiv && typeof value === 'string') {
    spanDiv.innerHTML = value
  }
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
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      className={clsx(className, 'flex justify-center items-center')}
      disabled={isLoading}
      type="submit"
      {...rest}
      ref={() => rest.ref}
    >
      {isLoading ? <Spinner className={'h-4 w-4'} /> : children}
    </Button>
  )
}
