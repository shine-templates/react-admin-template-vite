declare namespace API {
  interface Res<T> {
    code: string
    data: T
    msg: string
  }

  interface ListData<T> {
    records: T[]
    total: number
    [key: string]: any
  }

  type ListRes<T> = Res<ListData<T>>

  interface IParams {
    page: number
    pageSize: number
  }
}

declare namespace TABLE {
  interface DSource<U> {
    list: U[]
    total: number
  }

  interface ResData<U> {
    code?: string
    list: T
    msg?: string
  }

  interface Res<U> {
    total: number
    list: T
    [key: string]: any
  }
}

declare namespace FILEITEM {
  interface item {
    fileId: string
    fileName?: string
    fileUrl: string
    [propsName: string]: any
  }
}

declare interface ImportMeta {
  env: {
    BASE_URL: string
    MODE: 'development' | 'test' | 'production'
  }
}

declare module 'braft-utils'
