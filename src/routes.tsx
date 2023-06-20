import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ClockIcon,
  PhotoIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid'
import { Tefilot } from './pages/dashboard/tefilot'
import { RouteAppProps } from './types/routes'
import { Zmanim } from './pages/dashboard/zmanim'
import { Images } from './pages/dashboard/images'

const icon = {
  className: 'w-5 h-5 text-inherit',
}

export const routes: RouteAppProps[] = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <ClockIcon {...icon} />,
        name: 'zmanim',
        path: '/zmanim',
        element: <Zmanim />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: 'tefilot',
        path: '/tefilot',
        element: <Tefilot />,
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: 'images',
        path: '/images',
        element: <Images />,
      },
    ],
  },
]

export default routes
