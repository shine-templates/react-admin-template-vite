import ReactDOM from 'react-dom/client'
import App from 'layouts/index'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from 'store/store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { PersistGate } from 'redux-persist/integration/react'
import configs from 'configs'
import 'antd/dist/antd.less'
import './index.css'
import 'virtual:svg-icons-register'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={configs.PUBLIC_PATH}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ConfigProvider>,
)
