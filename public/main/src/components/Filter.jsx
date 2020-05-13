import React from 'react'

const Filter = props => {
  const { activeCat } = props
  console.log('acivecat', activeCat);
  console.log(props);
  return (
    <div>
      fucking hell
      {activeCat.catagory_specs.type}
    </div>
  )
}

export default Filter
