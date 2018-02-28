import React from 'react'

const valuesList = [{ value: 'one' }, { value: 'two' }, { value: 'three' }]
const activeValue = { value: 'one' }

const Item = ({ value }) => <li>{value}</li>

const Menu = () =>
  valuesList.map(
    obj =>
      obj === activeValue ? (
        <Item value={obj.value} active={true} />
      ) : (
        <Item value={obj.value} />
      )
  )

export default Menu
