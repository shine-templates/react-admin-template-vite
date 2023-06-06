import { Breadcrumb } from 'antd'
import { CSSProperties, FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const BreadCrumb: FC<{ style?: CSSProperties | undefined }> = ({ style }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    console.log('url: ', url)
    return {
      key: url,
      title: <Link to={url}>{url}</Link>,
    }
  })

  const breadcrumbItems = [
    {
      title: <Link to='/'>Home</Link>,
      key: 'home',
    },
  ].concat(extraBreadcrumbItems)

  return <Breadcrumb style={style} items={breadcrumbItems} />
}

export default BreadCrumb
