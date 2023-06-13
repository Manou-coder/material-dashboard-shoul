import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IconButton, Input, Switch } from '@material-tailwind/react'
import { DialogComponent } from '../zmanei-ayom/DialogComponent'
import { useToggle } from '@/hooks/use-toggle'
import { useState } from 'react'
import { ZmanimAuto } from './tefilot-auto'
import { ZmanimManual } from './ZmanimManual'
import { useCityStore } from '@/store/cityStore'
import { toast } from 'react-toastify'

interface Props {
  withTrash?: boolean
}

export const ZmanimIcons = ({ withTrash = false }: Props) => {
  const { value: open, setValue: setOpen, toggle: toggleOpen } = useToggle()
  const [auto, setAuto] = useState<boolean>(false)
  const actualCityForZamnim = useCityStore((state) => state.actualCityForZamnim)
  console.log('auto: ', auto)

  const handleOpenZmanim = () => {
    if (!actualCityForZamnim) {
      toast.error('Please select a city before opening')
      return
    }
    setOpen(true)
  }
  return (
    <>
      <div className="-mt-[5px]">
        <IconButton onClick={handleOpenZmanim} variant="text" color="blue-gray">
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
