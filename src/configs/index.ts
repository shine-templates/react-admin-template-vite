import { name } from '../../package.json'
const env = import.meta.env.MODE || 'development'

export default {
  SESSION_KEY: `${name}_${env}_`,
  PUBLIC_PATH: env === 'development' ? '/' : name,
  SYSTEM_TITLE: 'react-admin',
}
