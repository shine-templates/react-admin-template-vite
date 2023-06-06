import { memo } from 'react'
import { Layout } from 'antd'
import Header from './Header'
import Menu from './Menu'
import Content from './Content'
import Style from './Container.module.scss'

const Container = memo(() => (
  <Layout>
    <Menu />
    <Layout>
      <Header />
      <div className={Style.Container}>
        <Content />
      </div>
    </Layout>
  </Layout>
))

export default Container
