import React, { Suspense, memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import routers, { IRouter } from 'router'
import { resolve } from 'utils/path'
import Styles from './Content.module.scss'

const { Content } = Layout

const PageLoading = memo(() => (
  <div className={Styles.loading}>
    <Spin size='large' />
  </div>
))

const renderRoutes = (routes: IRouter[], parentPath = ''): React.ReactNode[] =>
  routes.map((route, index: number) => {
    const { Component, children } = route
    const currentPath = resolve(parentPath, route.path)

    if (Component) {
      return (
        <Route key={index} path={currentPath} element={<Component />}>
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
