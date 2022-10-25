import React, { lazy } from 'react'
import { BrowserRouterProps } from 'react-router-dom'
import otherRouter from './modules/otherRouter'

export interface IRouter {
  path: string
  redirect?: string
  Component?: React.FC<BrowserRouterProps> | (() => any)
  isFullPage?: boolean
  meta?: {
    title?: string
    Icon?: string
    role?: string
  }
  children?: IRouter[]
}

const routes: IRouter[] = [
  {
    path: '/login',
    isFullPage: true,
    Component: lazy(() => import('views/Login')),
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('views/Dashboard')),
    meta: {
      title: '工作台',
      Icon: 'gzt',
      role: '工作台',
    },
  },
  {
    path: '/',
    redirect: '/login',
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
