import { useState } from 'react'

const useUpdate = () => {
  const [state, setState] = useState(false)

  const update = () => {
    setState(!state)
  }

  return {
    state,
    update,
  }
}

export default useUpdate
