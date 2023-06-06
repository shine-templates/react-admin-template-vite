import { memo, useEffect, useState } from 'react'
import { Layout } from 'antd'
import Container from './components/Container'
import Styles from './index.module.scss'
import { useAppDispatch } from 'store/store'
import { toggleMenu } from 'store/modules/global'
import throttle from 'lodash/throttle'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from 'views/Login'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = sessionStorage.getItem('token')
  let location = useLocation()

  if (!auth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}

export default memo(() => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleResize = throttle(() => {
      if (window.innerWidth < 900) {
        dispatch(toggleMenu(true))
      } else if (window.innerWidth > 1000) {
        dispatch(toggleMenu(false))
      }
    }, 100)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout className={Styles.mainPanel}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/*'
          element={
            <RequireAuth>
              <Container />
            </RequireAuth>
          }
        />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Layout>
  )
})
