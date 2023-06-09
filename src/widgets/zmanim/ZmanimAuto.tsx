import { zmanimMock } from '@/data/zmanim-mock'
import { Option, Select, Typography } from '@material-tailwind/react'
import { v4 as uuidv4 } from 'uuid'

export const ZmanimAuto = () => {
  //   const zmanim2 = Object.keys(zmanimMock)
  //   const zmanim3 = Object.values(zmanimMock)
  const zmanim = Object.keys(zmanimMock).map((cle) => ({
    zmanName: cle,
    zmanSchedule: zmanimMock[cle],
  }))
  //   const zmanim = zmanimMock
  return (
    <div>
      <Typography variant="h5">ZmanimAuto</Typography>
      <Select label="Refer to">
        {zmanim.map((zman) => (
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
