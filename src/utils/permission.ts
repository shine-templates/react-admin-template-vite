import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'store/store'
const env = import.meta.env.MODE || 'development'

const usePermission = (): any => {
  const { auth } = useSelector((state: RootState) => state.authSlice, shallowEqual)
  const HasPermission = (permission: string): boolean => {
    return env === 'development' ? true : auth.includes(permission)
  }
  return { HasPermission }
}

export default usePermission
