import { basicZmanimList } from '@/data/basic-zmanim-list'
import { formatDate } from '@/lib/dates'
import { convertCamelCaseToWords, isBasicZmanimKey } from '@/lib/string'
import { MetaData, ZmanimData } from '@/types/zmanim'
import { Spinner, Switch, Typography, list } from '@material-tailwind/react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

interface Props extends ZmanimData {
  isLoading: boolean
}

export const ZmanimList = ({ data, isLoading }: Props) => {
  if (isLoading) return <Spinner className={'h-20 w-20'} />
  if (!data) return <h1>pas encore de data</h1>
  const { metadata, Zmanim, BasicZmanim } = data
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
  const [isCompleteZmanim, setIsCompleteZmanim] = useState<boolean>(false)

  const listZmanim = useMemo(() => {
    if (!data) return []
    if (!isCompleteZmanim && isOnlyDate) {
      return Object.entries(data).filter((d) => isBasicZmanimKey(d[0]))
    } else {
      return Object.entries(data)
    }
  }, [data, isCompleteZmanim])

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h2">{dataName}</Typography>
        {isOnlyDate && (
          <div>
            <Switch
              onChange={(e) => setIsCompleteZmanim(e.target.checked)}
              defaultChecked={false}
              label="All Zmanim"
            />
          </div>
        )}
      </div>
      {listZmanim.map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <Typography
            variant="lead"
            color={isBasicZmanimKey(key) ? 'black' : 'gray'}
            className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
          >
            {convertCamelCaseToWords(key)}:
          </Typography>
          <Typography
            variant="lead"
            color={isBasicZmanimKey(key) ? 'black' : 'gray'}
            className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
          >
            {isOnlyDate ? formatDate(value.toString()) : value.toString()}
          </Typography>
        </div>
      ))}
    </>
  )
}
