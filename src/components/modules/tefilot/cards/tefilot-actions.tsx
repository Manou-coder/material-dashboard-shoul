import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IconButton, Switch } from '@material-tailwind/react'
import { useToggle } from '@/utils/hooks/use-toggle'
import { useState } from 'react'
import { TefilotFormAuto } from '../forms/tefilot-form-auto'
import { TefilotFormManual } from '../forms/tefilot-form-manual'
import { useCityStore } from '@/utils/store/cityStore'
import { toast } from 'react-toastify'
import { Modal } from '@/components/modal/modal'
import { Tefila, Yom } from '@/data/yamim-data'

interface Props {
  withTrash?: boolean
  yom: Yom
  tefila: Tefila
}

export const TefilotActions = ({ withTrash = false }: Props) => {
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
      <Modal
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
        {!auto ? <TefilotFormManual /> : <TefilotFormAuto />}
      </Modal>
    </>
  )
}
