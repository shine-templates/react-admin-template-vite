import { memo, useEffect } from 'react'
import { Layout } from 'antd'
import LayoutMap from './components/Container'
import Styles from './index.module.scss'
import { useAppSelector, useAppDispatch } from 'store/store'
import { selectGlobal, ELayout, toggleMenu } from 'store/modules/global'
import throttle from 'lodash/throttle'

export default memo(() => {
  const dispatch = useAppDispatch()
  const globalState = useAppSelector(selectGlobal)

  const Container = LayoutMap[globalState.isFullPage ? ELayout.fullPage : globalState.layout]

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
      <Container />
    </Layout>
  )
})
