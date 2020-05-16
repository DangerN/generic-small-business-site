import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

import useColor from '../hooks/useColor'

const Landing = props => {
  const { meta } = props
  return (
    <Jumbotron className='bg-light' style={{alignItems: 'center', display: 'flex', flexFlow: 'column'}}>
      <h2 style={{ ...meta.brandstyle}}>{meta.brandname}</h2>
      <p className='bg-light'>{meta.tagline}</p>
      <p >Background by <a {...useColor('link')} href='https://unsplash.com/@monaeendra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Mona Eendra</a> on <a href='https://unsplash.com/s/photos/longboard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText' {...useColor('link')}>Unsplash</a></p>
      <Button as={Link} to='/store' {...useColor('button')}>Enter The Store</Button>
    </Jumbotron>
  )
}

export default Landing
