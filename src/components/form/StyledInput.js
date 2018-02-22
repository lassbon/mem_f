import React from 'react'

const StyledInput = props => (
  <fieldset>
    <input
      {...props}
      className="w-full p-4 py-3 roboto text-base tracking-wide capitalize border border-grey-light border-solid rounded-sm "
    />
  </fieldset>
)

export default StyledInput
