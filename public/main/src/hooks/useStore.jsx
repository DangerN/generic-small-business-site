import { useReducer } from 'react'

export default () => {
  const initialState = {
    searchTerm: '',
    products: []
  }
  const reducer = (state, action) => ({
      'updateSearch': () => ({...state, searchTerm: action.payload}),
      'setProducts': () => ({...state, products: action.payload}),
    }[action.type]())
  return useReducer(reducer, initialState)
}
