import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  title?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  toggleOpen: () => void
  children: ReactNode
}

export const DialogComponent = ({
  children,
  title,
  open,
  setOpen,
  toggleOpen,
}: Props) => {
  return (
    <>
      {/* <Button onClick={toggleOpen}>Sign In</Button> */}
      <Dialog
        size="lg"
        open={open}
        handler={toggleOpen}
        className="bg-transparent shadow-none w-full z-"
      >
        <Card className="mx-auto w-full max-w-7xl">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center relative"
          >
            <XMarkIcon
              className="h-9 w-9 absolute right-0 top-0 text-white hover:cursor-pointer"
              onClick={toggleOpen}
            />
            <Typography variant="h3" color="white">
              {title}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">{children}</CardBody>
        </Card>
      </Dialog>
    </>
  )
}
