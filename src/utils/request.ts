import axios, { AxiosRequestConfig } from 'axios'
import getHeaders from './headers'
import { message } from 'antd'
const BASE_URL = import.meta.env.BASE_URL + 'login'

interface Options extends AxiosRequestConfig {
  prefix: string
}

const SUCCESS_CODE = '00000'
const NO_AUTH = 401
const TIMEOUT = 5000

export const instance = axios.create({
  timeout: TIMEOUT,
  withCredentials: true,
})

instance.interceptors.response.use(
  ({ status, ...response }) => {
    if (status === 200) {
      const { data } = response
      if (data.code === SUCCESS_CODE) {
        return data
      }
      if (data.code === NO_AUTH) {
        message.error('无权限', () => {
          window.location.href = BASE_URL
        })
      }
      return Promise.reject(data)
    }
    return Promise.reject(response?.data)
  },
  (e) => Promise.reject(e),
)

const request = (requestConfig: Options) => {
  const { url, prefix } = requestConfig
  const config = {
    headers: {
      ...getHeaders(),
    },
    ...requestConfig,
    url: prefix + url,
  }
  return instance(config)
}

export default request
