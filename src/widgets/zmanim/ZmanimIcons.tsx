import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IconButton, Input, Switch } from '@material-tailwind/react'
import { DialogComponent } from '../zmanei-ayom/DialogComponent'
import { useToggle } from '@/hooks/use-toggle'
import { useState } from 'react'
import { ZmanimAuto } from './ZmanimAuto'
import { ZmanimManual } from './ZmanimManual'

interface Props {
  withTrash?: boolean
}

export const ZmanimIcons = ({ withTrash = false }: Props) => {
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [auto, setAuto] = useState<boolean>(false)
  console.log('auto: ', auto)
  return (
    <>
      <div className="-mt-[5px]">
        <IconButton
          onClick={() => setOpen(true)}
          variant="text"
          color="blue-gray"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </IconButton>
        {withTrash && (
          <IconButton variant="text" color="blue-gray">
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        )}
      </div>
      <DialogComponent
        title="Zmanim options"
        open={open}
        setOpen={setOpen}
        toggleOpen={toggleOpen}
      >
        <Switch
          onChange={(e) => setAuto(e.target.checked)}
          defaultChecked={false}
          label="Auto"
        />
        {!auto ? <ZmanimManual /> : <ZmanimAuto />}
      </DialogComponent>
    </>
  )
}
