import React from 'react'
import './styles.css'

const ButtonFixedWidthRadiusXS = props => (
  <button
    {...props}
    className="flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-grey-darkest hind"
  >
    {props.children}
  </button>
)

export default ButtonFixedWidthRadiusXS
