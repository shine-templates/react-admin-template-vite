import { memo } from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Menu from './Menu'
import Content from './Content'
import { ELayout } from 'store/modules/global'
import Style from './Container.module.scss'

const SideLayout = memo(() => (
  <Layout className={Style.sidePanel}>
    <Menu />
    <Layout className={Style.sideContainer}>
      <Header />
      <div
        style={{
          padding: 20,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Content />
      </div>
    </Layout>
  </Layout>
))

const FullPageLayout = memo(() => <Content />)

export default {
  [ELayout.side]: SideLayout,
  [ELayout.fullPage]: FullPageLayout,
}
