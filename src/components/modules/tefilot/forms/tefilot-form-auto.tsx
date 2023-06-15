import { formatDate } from '@/lib/dates'
import { convertCamelCaseToWords, isBasicZmanimKey } from '@/lib/string'
import { useZmanim } from '@/utils/hooks/use-zmanim'
import { Input, Option, Select, Typography } from '@material-tailwind/react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const TefilotFormAuto = () => {
  const [exampleValue, setExampleValue] = useState<string>('')
  const [referValue, setReferValue] = useState<string>('')
  const { data, error, isLoading } = useZmanim()
  // console.log('data BB: ', data)

  const listZmanim = useMemo(() => {
    if (!data || !data.Zmanim) return []
    return Object.entries(data.Zmanim)
  }, [data])

  if (error) {
    return null
  }

  // console.log('listZmanim: ', listZmanim)
  return (
    <div className="space-y-2">
      <Typography variant="h5">ZmanimAuto</Typography>
      <Input label="exemple" disabled defaultValue={exampleValue} />
      <Select label="Refer to">
        {listZmanim &&
          listZmanim.map(([key, value]) => (
            <Option
              key={uuidv4()}
              value={key}
              onClick={() => {
                setExampleValue(value.toString())
                setReferValue(value.toString())
              }}
            >
              <div className="flex gap-2">
                <Typography
                  color={isBasicZmanimKey(key) ? 'black' : 'gray'}
                  className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
                >
                  {convertCamelCaseToWords(key)}:
                </Typography>
                <Typography
                  color={isBasicZmanimKey(key) ? 'black' : 'gray'}
                  className={clsx(isBasicZmanimKey(key) ? 'font-bold' : '')}
                >
                  (ex: {formatDate(value.toString())})
                </Typography>
              </div>
            </Option>
          ))}
      </Select>
      <Input
        onChange={(e) =>
          setExampleValue(manipulateDateByMinutes(referValue, e.target.value))
        }
        label="Add or remove a number of minutes"
        type="number"
      />
    </div>
  )
}

function manipulateDateByMinutes(date: string, minutesStr: string) {
  const oldDate = new Date(date)
  const minutes = Number(minutesStr)
  return new Date(oldDate.getTime() + minutes * 60000).toUTCString()
}
