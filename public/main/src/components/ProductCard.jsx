import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import useColor from '../hooks/useColor'
import { BASE_PATH } from '../constants'

const ProductCard = props => {
  const { id, name, description, price, media_links } = props

  return (
    <Card key={id} as={Col} xs={11} md={6} lg={3} style={{border: 'none', borderRadius: '0px'}}>
      <Card.Body>
        <Card.Img src={media_links[0]}/>
        <Card.Title as={Link} {...useColor('link')} to={`/store/${id}`}>{name}</Card.Title>
        <Card.Text >{description.substring(0,100)+'...'}</Card.Text>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
