import { ImagesList } from './image-list'
import { UploadImage } from './upload-image'

interface Props {
  data: string[] | null | undefined
  isError: boolean
  isLoading: boolean
}

export const ImagesView = ({ data, isError, isLoading }: Props) => {
  return (
    <div>
      <ImagesList data={data} />
      <UploadImage />
    </div>
  )
}
