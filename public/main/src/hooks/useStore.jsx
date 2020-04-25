import { useReducer } from 'react'

export default () => {
  const initialState = {
    searchTerm: ''
  }
  const reducer = (state, action) => {
    return {
      'updateSearch': () => {
        return {...state, searchTerm: action.payload}
      }
    }[action.type]()
  }
  const [state, dispatch] = useReducer(initialState, reducer)
  return [state, dispatch]
}
