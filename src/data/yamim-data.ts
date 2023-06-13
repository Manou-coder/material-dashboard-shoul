import { StringObject } from '@/types/global'

export interface Yom {
  id: string
  name: string
  creted_at: string
  tefilot: StringObject
}

export const yamimList: Yom[] = [
  {
    id: '1234',
    name: 'Chol',
    creted_at: new Date().toUTCString(),
    tefilot: {
      shacharit: '8:00',
      mincha: '14:00',
      arvit: '20:00',
    },
  },
]
