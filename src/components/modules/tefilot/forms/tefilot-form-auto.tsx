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
import { useZmanim } from '@/utils/hooks/use-zmanim'

type Zman = {
  zmanName: string
  zmanSchedule: string
}

type ZmanimList = Zman[] | []

export const TefilotFormAuto = () => {
  const { data, error, isLoading } = useZmanim()
  console.log('data: ', data)

  if (error) {
    return null
  }

  return (
    <div>
      <Typography variant="h5">ZmanimAuto</Typography>
      <Select label="Refer to">
        {/* {data &&
          data.map((zman: Zman) => (
            <Option key={uuidv4()} value={zman.zmanName}>
              <div className="flex gap-2">
                <Typography color="black">{zman.zmanName}</Typography>
                <Typography>(ex: {zman.zmanSchedule})</Typography>
              </div>
            </Option>
          ))} */}
        <Option>hello</Option>
      </Select>
    </div>
  )
}
