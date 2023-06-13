import { useTefilot } from '@/utils/hooks/use-tefilot'
import { TefilotView } from './tefilot.view'

export const TefilotContainer = () => {
  const { data, isError, isLoading, error } = useTefilot()
  console.log('error: ', error)
  console.log('data àà: ', data)
  return <TefilotView data={data} />
}
