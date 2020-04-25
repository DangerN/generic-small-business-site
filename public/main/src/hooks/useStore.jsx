import { useReducer } from 'react'

export default () => {
  const initialState = {
    searchTerm: '',
    products: []
  }
  const reducer = (state, action) => {
    return {
      'updateSearch': () => {
        return {...state, searchTerm: action.payload}
      },
      'setProducts': () => {
        console.log(action.payload);
        return {...state, products: action.payload}
      },
    }[action.type]()
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}
