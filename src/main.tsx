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
import 'moment/locale/zh-cn'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://71141835d595464ab5bf1f1b5b99a5b5@o4504200460632064.ingest.sentry.io/4504200471379968',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

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
