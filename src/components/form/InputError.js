import React from 'react'

const InputError = ({ touched, error }) =>
  touched && error ? (
    <div className="py-1">
      <span className="px-2 text-xs leading-loose whitespace-no-wrap bg-red text-white">
        {error}
      </span>
    </div>
  ) : null

export default InputError
