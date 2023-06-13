import { StringObject } from '@/types/global'

export interface Tefila {
  tefila_name: string
  schedule: string
}

export interface Yom {
  id: string
  name: string
  created_at: string
  tefilot: Tefila[]
}

export const yamimList: Yom[] = [
  {
    id: '1234',
    name: 'Chol',
    created_at: new Date().toUTCString(),
    tefilot: [
      {
        tefila_name: 'shacharit',
        schedule: '08:00',
      },
    ],
  },
]
