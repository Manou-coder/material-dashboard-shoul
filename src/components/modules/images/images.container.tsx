import { useImages } from '@/utils/hooks/use-images'
import { ImagesView } from './images.view'

export const ImagesContainer = () => {
  const { data, isError, isLoading } = useImages()
  return <ImagesView data={data} isError={isError} isLoading={isLoading} />
}
