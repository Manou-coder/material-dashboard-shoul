import { Inputs } from '@/lib/validation-zod'
import { timeZoneIdList } from './time-zone-id-list-data'

type FormatDateZmanim =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`

export interface SavedZmanim extends Inputs {
  timeZoneId: (typeof timeZoneIdList)[number]
  date: FormatDateZmanim
}

export const savedZmanim: SavedZmanim[] = [
  {
    locationName: 'Jerusalem',
    longitude: '32',
    latitude: '35',
    elevation: '800',
    timeZoneId: 'Asia/Jerusalem',
    date: '2021-03-04',
    complexZmanim: false,
  },
  {
    locationName: 'Paris',
    longitude: '32',
    latitude: '35',
    elevation: '800',
    timeZoneId: 'Asia/Jerusalem',
    date: '2021-03-04',
    complexZmanim: false,
  },
  {
    locationName: 'New York',
    longitude: '32',
    latitude: '35',
    elevation: '800',
    timeZoneId: 'Asia/Jerusalem',
    date: '2021-03-04',
    complexZmanim: false,
  },
]
