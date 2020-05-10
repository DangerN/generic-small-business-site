import { useReducer } from 'react'

export default () => {
  const reducer = (state, action) => {
    return {
      'dumpMessages': () => ({...state, messages: action.payload })
    }[action.type]()
  }
  const [state, dispatch] = useReducer(reducer, [])
  return [state, dispatch]
}
