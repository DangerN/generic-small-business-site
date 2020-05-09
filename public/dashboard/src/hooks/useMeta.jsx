import { useReducer } from 'react'

export default () => {
  const reducer = (state, action) => {
    return {
      'dumpMeta': () => ({...state, ...action.payload }),
      'catagoryList': () => ({...state, catagoryList: action.payload}),
      'specList': () => ({...state, specList: action.payload}),
    }[action.type]()
  }
  const [state, dispatch] = useReducer(reducer, {})
  return [state, dispatch]
}
