import React, { lazy } from 'react'
import { BrowserRouterProps } from 'react-router-dom'
import otherRouter from './modules/otherRouter'

export interface IRouter {
  path: string
  Component?: React.FC<BrowserRouterProps> | (() => any)
  meta?: {
    title?: string
    Icon?: string
    role?: string
  }
  children?: IRouter[]
}

const routes: IRouter[] = [
  {
    path: '/Dashboard',
    Component: lazy(() => import('views/Dashboard')),
    meta: {
      title: '工作台',
      Icon: 'gzt',
      role: '工作台',
    },
  },
]

const baseRoutes: IRouter[] = [
  {
    path: '/403',
    Component: lazy(() => import('views/Result/403')),
  },
  {
    path: '/500',
    Component: lazy(() => import('views/Result/500')),
  },
  {
    path: '*',
    Component: lazy(() => import('views/Result/404')),
  },
]

const allRoutes = [...routes, ...baseRoutes, ...otherRouter]

export default allRoutes
