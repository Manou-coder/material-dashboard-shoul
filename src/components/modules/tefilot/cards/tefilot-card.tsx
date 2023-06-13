import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from '@material-tailwind/react'
import { color } from '@material-tailwind/react/types/components/alert'
import { TefilotZman } from './tefilot-zman'
import { Yom } from '@/data/yamim-data'
import { capitalizeFirstLetter } from '@/lib/string'

interface Props {
  color?: color
  yom: Yom
}

export const TefilotCard = ({ color = 'red', yom }: Props) => {
  const { name, tefilot } = yom
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid p-4 place-items-center"
      >
        <Typography variant="h4">{name}</Typography>
      </CardHeader>
      <CardBody className="p-4 pt-16">
        <div className="flex flex-col space-y-2">
          {Object.entries(tefilot).map((tefila) => (
            <TefilotZman
              name={capitalizeFirstLetter(tefila[0])}
              schedule={tefila[1]}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
