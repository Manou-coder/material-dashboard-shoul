import { ZmanimForm } from '@/widgets/modules/zmanim/zmanim-form'
import { useToggle } from '@/utils/hooks/use-toggle'
import { ZmanimList } from '@/widgets/modules/zmanim/zmanim-list'
import { Modal } from '@/widgets/modal/modal'
import { Button } from '@material-tailwind/react'
import { ZmanimFormTypes } from '@/types/zmanim-form-types'
import { ModalTypes } from '@/types/modal-types'

interface Props {
  form: ZmanimFormTypes
  modal: ModalTypes
  isLoading: boolean
  data: any
}

export const ZmanimView = ({ form, isLoading, data, modal }: Props) => {
  const { open, setOpen, toggleOpen } = modal
  return (
    <>
      <div className="flex justify-center items-center">
        <Button onClick={toggleOpen} className="mt-40">
          Add city
        </Button>
      </div>
      <Modal
        title="Zmanim options"
        open={open}
        setOpen={setOpen}
        toggleOpen={toggleOpen}
      >
        <ZmanimForm form={form} />
      </Modal>
      <div className="mt-10 mr-[304px]">
        <ZmanimList data={data} isLoading={isLoading} />
      </div>
    </>
  )
}
