import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import { Home, Profile, Tables, Notifications } from '@/pages/dashboard'
import { Tefilot } from './pages/dashboard/tefilot'
import { RouteAppProps } from './types/routes'
import { Zmanim } from './pages/dashboard/zmanim'

const icon = {
  className: 'w-5 h-5 text-inherit',
}

export const routes: RouteAppProps[] = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '/home',
        element: <Home />,
      },
      {
        icon: <ClockIcon {...icon} />,
        name: 'zmanim',
        path: '/zmanim',
        element: <Zmanim />,
      },
      {
        icon: <ClockIcon {...icon} />,
        name: 'tefilot',
        path: '/tefilot',
        element: <Tefilot />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'tables',
        path: '/tables',
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'notifactions',
        path: '/notifactions',
        element: <Notifications />,
      },
    ],
  },
  // {
  //   title: 'auth pages',
  //   layout: 'auth',
  //   pages: [
  //     {
  //       icon: <ArrowRightOnRectangleIcon {...icon} />,
  //       name: 'sign in',
  //       path: '/sign-in',
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <UserPlusIcon {...icon} />,
  //       name: 'sign up',
  //       path: '/sign-up',
  //       element: <SignUp />,
  //     },
  //   ],
  // },
]

export default routes
