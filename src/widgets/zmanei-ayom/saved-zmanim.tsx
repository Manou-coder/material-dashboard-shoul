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
import { SavedZmanim as SavedZmanimList } from '@/data/saved-zmanim'
import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  list: SavedZmanimList[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SavedZmanim = ({ list, setOpen }: Props) => {
  if (!list) return null
  console.log('list: ', list)
  return (
    <Card className="mt-[70px]">
      <List>
        <div>
          <Typography variant="h4" className="text-center">
            Saved Zmanim
          </Typography>
        </div>
        {list.map((item) => (
          <ListItem key={uuidv4()} ripple={false} className="py-1 pr-1 pl-4">
            {item.locationName}
            <ListItemSuffix className="flex">
              <IconButton variant="text" color="blue-gray">
                <PencilSquareIcon className="h-5 w-5" />
              </IconButton>
              <IconButton variant="text" color="blue-gray">
                <TrashIcon className="h-5 w-5" />
              </IconButton>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setOpen(true)}>Add city</Button>
    </Card>
  )
}
