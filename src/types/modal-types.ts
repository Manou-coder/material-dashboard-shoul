import { Dispatch, SetStateAction } from 'react'

export interface ModalTypes {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  toggleOpen: () => void
}
