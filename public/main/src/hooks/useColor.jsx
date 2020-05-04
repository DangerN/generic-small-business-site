import React, {useState} from 'react'

export default type => {
  const [ color, setColor ] = useState('black')
  const colorPallet = ['#ea2ea9','#f0b0d9','#96ca81','#46d00f']
  return {
    onMouseEnter: ()=>setColor(colorPallet[Math.floor(Math.random() * colorPallet.length)]),
    onMouseLeave: ()=>setColor('black'),
    style: {
      button: {
        backgroundColor: color
      },
      link: {
        color: color
      }
    }[type]
  }
}
