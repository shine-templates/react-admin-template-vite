import React, { Suspense, memo, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import routers, { IRouter } from 'router'
import { resolve } from 'utils/path'
import Styles from './Content.module.scss'
import { useAppDispatch } from 'store/store'
import { switchFullPage } from 'store/modules/global'

const { Content } = Layout

const PageBox = memo(
  ({
    children,
    isFullPage,
  }: React.PropsWithChildren<{
    isFullPage?: boolean
  }>) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(switchFullPage(isFullPage))
    }, [isFullPage])

    return <>{children}</>
  },
)

const PageLoading = memo(() => (
  <div className={Styles.loading}>
    <Spin size='large' />
  </div>
))

const renderRoutes = (routes: IRouter[], parentPath = ''): React.ReactNode[] =>
  routes.map((route, index: number) => {
    const { Component, children, redirect } = route
    const currentPath = resolve(parentPath, route.path)

    if (redirect) {
      return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />
    }

    if (Component) {
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <PageBox isFullPage={route.isFullPage}>
              <Component />
            </PageBox>
          }
        >
          {children && renderRoutes(children, currentPath)}
        </Route>
      )
    }

    return children ? renderRoutes(children, currentPath) : null
  })

export default memo(() => (
  <Content>
    <Suspense fallback={<PageLoading />}>
      <Routes>{renderRoutes(routers)}</Routes>
    </Suspense>
  </Content>
))
