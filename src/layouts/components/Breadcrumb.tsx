import { Breadcrumb } from 'antd'
import { CSSProperties, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumb: FC<{ style?: CSSProperties | undefined }> = ({ style }) => {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>菜单</Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/dashboard'>Dashboard</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return <Breadcrumb style={style}>{breadcrumbItems}</Breadcrumb>
}

export default BreadCrumb
