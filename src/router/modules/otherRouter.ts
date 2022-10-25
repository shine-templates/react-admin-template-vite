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
]

export default otherRouter
