import { City } from '@/data/saved-zmanim'
import { ZMANIM_ALL } from '@/lib/urls'
// import { zmanimMock } from '@/data/zmanim-mock'
import { useCityStore } from '@/utils/store/cityStore'
import { CustomError } from '@/types/global'
import { ZmanimData } from '@/types/zmanim'
import { Option, Select, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

type Zman = {
  zmanName: string
  zmanSchedule: string
}

type ZmanimList = Zman[] | []

export const TefilotFormAuto = () => {
  const actualCityForZamnim = useCityStore((state) => state.actualCityForZamnim)
  const [zmanimList, setZmanimList] = useState<ZmanimList>([])
  const getZmanim = async () => {
    const response = await getZmanimForZmanimAuto(actualCityForZamnim)
    const data = response.data as any
    const zmanim = data?.zmanim?.Zmanim
    if (!zmanim) {
      toast.error('not found data')
      return
    }
    const zmanimArr = Object.keys(zmanim).map((key) => ({
      zmanName: key,
      zmanSchedule: zmanim[key],
    }))
    console.log('zmanim: ', zmanim)
    setZmanimList(zmanimArr)
  }
  useEffect(() => {
    getZmanim()
  }, [])

  // const zmanim = Object.keys(zmanimMock).map((cle) => ({
  //   zmanName: cle,
  //   zmanSchedule: zmanimMock[cle],
  // }))

  return (
    <div>
      <Typography variant="h5">ZmanimAuto</Typography>
      <Select label="Refer to">
        {zmanimList.map((zman: Zman) => (
          <Option key={uuidv4()} value={zman.zmanName}>
            <div className="flex gap-2">
              <Typography color="black">{zman.zmanName}</Typography>
              <Typography>(ex: {zman.zmanSchedule})</Typography>
            </div>
          </Option>
        ))}
      </Select>
    </div>
  )
}

const getZmanimForZmanimAuto = async (city: City | null) => {
  if (!city) {
    throw new Error('no city selected')
  }
  try {
    const response = await axios.get(ZMANIM_ALL, {
      params: { ...city, complexZmanim: true },
    })
    const data = response.data as ZmanimData | null
    if (!data) {
      throw new Error('no data from server')
    }
    return { data }
  } catch (error) {
    toast.error((error as CustomError).message)
    return { data: null }
  }
}
