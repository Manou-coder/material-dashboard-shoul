import { IconButton, ListItem, Typography } from '@material-tailwind/react'
import { ZmanimIcons } from './ZmanimIcons'

export const ZmanimList = ({ name, schedule }) => {
  return (
    <ListItem ripple={false} className="flex gap-2 items-center">
      <ZmanimIcons />
      <div className="flex justify-between items-center flex-1">
        <Typography variant="h5">{name} :</Typography>
        <Typography variant="h5">{schedule}</Typography>
      </div>
    </ListItem>
  )
}
