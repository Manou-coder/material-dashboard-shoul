import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
  Button,
} from '@material-tailwind/react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { City } from '@/data/saved-zmanim'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction } from 'react'
import { Inputs } from '@/lib/validation-zod'
import { useCityStore } from '@/store/cityStore'
import { UseFormReset } from 'react-hook-form'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  getZmanimFromServer: (city: City) => Promise<any | null>
  setActualCity: Dispatch<SetStateAction<City | null>>
  reset: UseFormReset<Inputs>
}

export const SavedCities = ({
  setOpen,
  getZmanimFromServer,
  setActualCity,
  reset,
}: Props) => {
  const cities = useCityStore((state) => state.cities)
  const removeCity = useCityStore((state) => state.removeCity)

  const handleUpdateClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    city: City
  ) => {
    event.stopPropagation()
    reset()
    setActualCity({ ...city })
    setOpen(true)
  }

  const handleRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    city: City
  ) => {
    event.stopPropagation()
    removeCity(city)
  }

  return (
    <Card className="mt-[70px]">
      <List>
        <div>
          <Typography variant="h4" className="text-center">
            Saved Zmanim
          </Typography>
        </div>
        {cities.map((item) => (
          <ListItem
            key={uuidv4()}
            ripple={false}
            onClick={() => getZmanimFromServer(item)}
            className="py-1 pr-1 pl-4"
          >
            <Typography variant="lead" className="font-bold">
              {item.locationName}
            </Typography>
            <ListItemSuffix className="flex">
              <IconButton
                onClick={(e) => handleUpdateClick(e, item)}
                variant="text"
                color="blue-gray"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </IconButton>
              <IconButton
                onClick={(e) => handleRemoveClick(e, item)}
                variant="text"
                color="blue-gray"
              >
                <TrashIcon className="h-5 w-5" />
              </IconButton>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <Button
        onClick={() => {
          reset()
          setOpen(true)
        }}
      >
        Add city
      </Button>
    </Card>
  )
}
