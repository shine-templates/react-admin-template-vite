import { lazy } from 'react'
import { IRouter } from '..'

const otherRouter: IRouter[] = [
  {
    path: '/otherRouter/other',
    Component: lazy(() => import('views/other')),
    meta: {
      title: '其它',
      Icon: 'qyrygl',
      role: '其它',
    },
  },
  {
    path: '/otherRouter/project',
    meta: {
      title: '项目',
      Icon: 'qyrygl',
      role: '项目',
    },
    children: [
      {
        path: '/project-1',
        Component: lazy(() => import('views/project/project-1')),
        meta: {
          title: '项目一',
          role: '',
        },
      },
      {
        path: '/project-2',
        Component: lazy(() => import('views/project/project-2')),
        meta: {
          title: '项目二',
          role: '',
        },
      },
      {
        path: '/project-3',
        Component: lazy(() => import('views/project/project-3')),
        meta: {
          title: '项目三',
          role: '',
        },
      },
      {
        path: '/project-4',
        Component: lazy(() => import('views/project/project-4')),
        meta: {
          title: '项目四',
          role: '',
        },
      },
    ],
  },
]

export default otherRouter
