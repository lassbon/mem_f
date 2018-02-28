import React from 'react'
import './styles.css'

const ButtonFixedWidthRadiusXS = ({
  children,
  loading,
  loadingText,
  onClick,
}) => (
  <button
    onClick={onClick}
    data-loading-text={loadingText}
    className={`${
      loading ? 'loading' : ''
    } flex justify-center button-fixed-width-small-radius w-32 py-3 shadow-lg text-base text-center rounded-sm bg-blue-lighter text-grey-darkest hind`}
  >
    {children}
  </button>
)

export default ButtonFixedWidthRadiusXS
