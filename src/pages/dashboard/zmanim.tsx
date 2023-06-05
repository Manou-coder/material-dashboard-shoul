import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react'
import { color } from '@material-tailwind/react/types/components/timeline'

export const Zmanim = () => {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <ZmanimCard
            type="Chol"
            color="blue"
            zmanim={{
              shacharit: '8:00',
              mincha: '14:00',
              arvit: '20:00',
            }}
          />
        </div>
        <div>
          <ZmanimCard type="Shabat" color="green" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
        <div>
          <ZmanimCard type="Chol" />
        </div>
      </div>
    </section>
  )
}

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

const ZmanimCard = ({ type, color = 'red', zmanim }: ZmanimCardProps) => {
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
          {zmanim?.shacharit && (
            <ZmanimView name="Shacharit" schedule={zmanim.shacharit} />
          )}
          {zmanim?.mincha && (
            <ZmanimView name="Mincha" schedule={zmanim.mincha} />
          )}
          {zmanim?.arvit && (
            <ZmanimView name="Arvit" schedule={zmanim?.arvit} />
          )}
        </div>
      </CardBody>
    </Card>
  )
}

const ZmanimView = ({ name, schedule }) => {
  return (
    <div className="flex justify-between">
      <Typography variant="h5">{name} :</Typography>
      <Typography variant="h5">{schedule}</Typography>
    </div>
  )
}
