import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@material-tailwind/react'

export const Zmanim = () => {
  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <ZmanimCard />
        </div>
        <div>
          <ZmanimCard />
        </div>
        <div>
          <ZmanimCard />
        </div>
      </div>
    </section>
  )
}

const ZmanimCard = () => {
  return (
    <Card>
      <CardBody>
        <h1>hello world</h1>
      </CardBody>
    </Card>
  )
}
