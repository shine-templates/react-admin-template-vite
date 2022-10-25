import configs from 'configs'

type Header = {
  token: string
}

export default (): Partial<Header> => {
  return {
    token: sessionStorage.getItem(configs.SESSION_KEY + 'token') as string,
  }
}
