import { Inputs } from '@/lib/validation-zod'
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormWatch,
  Control,
  UseFormSetError,
  FormState,
  SubmitHandler,
  UseFormReset,
} from 'react-hook-form'

type KeysOfStringType<T> = {
  [K in keyof T]?: string
}

type DefaultValuesForm = KeysOfStringType<Inputs>

export interface ZmanimFormTypes {
  register: UseFormRegister<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  watch: UseFormWatch<Inputs>
  control: Control<Inputs>
  setError: UseFormSetError<Inputs>
  formState: FormState<Inputs>
  onSubmit: SubmitHandler<Inputs>
  isLoading: boolean
  reset: UseFormReset<Inputs>
  defaultValues?: DefaultValuesForm
}
