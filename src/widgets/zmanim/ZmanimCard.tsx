import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from '@material-tailwind/react'
import { color } from '@material-tailwind/react/types/components/alert'
import { ZmanimList } from './ZmanimList'

interface ZmanimTime {
  shacharit: string
  mincha: string
  arvit: string
}

interface ZmanimCardProps {
  type: string
  color?: color
  zmanim?: ZmanimTime
}

export const ZmanimCard = ({
  type,
  color = 'red',
  zmanim,
}: ZmanimCardProps) => {
  if (!zmanim) return null
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid p-4 place-items-center"
      >
        <Typography variant="h4">{type}</Typography>
      </CardHeader>
      <CardBody className="p-4 pt-16">
        <div className="flex flex-col space-y-2">
          {zmanim.shacharit && (
            <ZmanimList name="Shacharit" schedule={zmanim.shacharit} />
          )}
          {zmanim.mincha && (
            <ZmanimList name="Mincha" schedule={zmanim.mincha} />
          )}
          {zmanim.arvit && <ZmanimList name="Arvit" schedule={zmanim.arvit} />}
        </div>
      </CardBody>
    </Card>
  )
}
