import { useTefilot } from '@/utils/hooks/use-tefilot'
import { TefilotView } from './tefilot.view'

export const TefilotContainer = () => {
  const { data, isError, isLoading, error } = useTefilot()
  console.log('data rerender: ', data)
  return <TefilotView data={data} isLoading={isLoading} />
}
