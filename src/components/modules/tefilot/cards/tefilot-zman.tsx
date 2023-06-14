import { ListItem, Typography } from '@material-tailwind/react'
import { TefilotActions } from './tefilot-actions'
import { Tefila, Yom } from '@/data/yamim-data'
import { capitalizeFirstLetter } from '@/lib/string'

interface Props extends Tefila {
  yom: Yom
}

export const TefilotZman = ({ yom, tefila_name, schedule }: Props) => {
  return (
    <ListItem ripple={false} className="flex gap-2 items-center">
      <TefilotActions yom={yom} tefila={{ tefila_name, schedule }} />
      <div className="flex justify-between items-center flex-1">
        <Typography variant="h5">
          {capitalizeFirstLetter(tefila_name)} :
        </Typography>
        <Typography variant="h5">{schedule}</Typography>
      </div>
    </ListItem>
  )
}
