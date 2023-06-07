import { formatDate } from '@/lib/dates'
import { convertCamelCaseToWords } from '@/lib/string'
import { MetaData, ZmanimData } from '@/types/zmanim'
import { Spinner, Typography, TypographyProps } from '@material-tailwind/react'

interface Props {
  data: ZmanimData
  isLoading: boolean
}

export const ZmaneiAyomList = ({ data, isLoading }: Props) => {
  // console.log('isLoading: ', isLoading)
  // console.log('data: ', data)
  if (isLoading) return <Spinner className={'h-20 w-20'} />
  if (!data) return <h1>pas encore de data</h1>
  const { metadata, Zmanim, BasicZmanim } = data.zmanim
  return (
    <div className="mt-10">
      <ItemList data={metadata} dataName="MetaData" />
      <ItemList
        data={Zmanim ? Zmanim : BasicZmanim}
        dataName="Zmanim"
        isOnlyDate
      />
    </div>
  )
}

interface ItemListProps {
  data: object
  dataName: string
  isOnlyDate?: boolean
}

const ItemList = ({ data, dataName, isOnlyDate = false }: ItemListProps) => {
  // console.log('data: ', data)
  if (!data) return null
  return (
    <>
      <Typography variant="h2" className="mt-2 mb-1 text-center">
        {dataName}
      </Typography>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <Typography variant="lead" color="gray" className="">
            {convertCamelCaseToWords(key)}:
          </Typography>
          <Typography variant="lead" color="gray" className="">
            {isOnlyDate ? formatDate(value.toString()) : value.toString()}
          </Typography>
        </div>
      ))}
    </>
  )
}
