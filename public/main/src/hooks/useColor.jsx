import {useState} from 'react'

export default type => {
  const [ color, setColor ] = useState('black')
  const colorPallet = ['#ea2ea9','#7fff00','#0310ea','#dd0048']
  return {
    onMouseEnter: ()=>setColor(colorPallet[Math.floor(Math.random() * colorPallet.length)]),
    onMouseLeave: ()=>setColor('black'),
    style: {
      button: {
        backgroundColor: color,
        borderColor: color
      },
      link: {
        color: color
      },
      input: {
        borderColor: color
      }
    }[type]
  }
}
