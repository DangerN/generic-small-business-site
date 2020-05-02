import { useReducer } from 'react'

export default () => {
  const initialState = {
    brandName: '',
  }
  const reducer = (state, action) => {
    return {
      'dumpMeta': () => ({...state, ...action.payload }),
    }[action.type]()
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}
