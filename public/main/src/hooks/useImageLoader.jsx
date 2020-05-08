import React, { useState } from 'react'
import axios from 'axios'
import { BASE_PATH } from '../constants'

export default props => {
  const { component, imageName } = props
  const [ imageURI, setImageURI ] = useState('')

  console.log(component);

  axios(`${BASE_PATH}/api/images/${imageName}`)
  .then(uri=>setImageURI(uri))
  .catch(console.log)

  return (
    imageURI ?
    <{...component} src={imageURI} /> : 'reeeeeeeeeeeee'
  )
}
