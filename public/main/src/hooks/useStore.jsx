import { useReducer } from 'react'

export default () => {
  const initialState = {
    searchTerm: '',
    products: []
  }
  const reducer = (state, action) => ({
      'updateSearch': () => ({...state, searchTerm: action.payload}),
      'weightProduct': () => ({...state, products: [...state.products].splice(action.payload.index, 1, action.payload.product)}),
      'setProducts': () => ({...state, products: action.payload}),
    }[action.type]())
  return useReducer(reducer, initialState)
}
