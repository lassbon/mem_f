import React from 'react'
import './inputError.css'

const InputError = ({ touched, error }) =>
  touched && error ? (
    <div className="inputError relative">
      <div className="fixed -mt-1 ml-2 px-4 pt-1 shadow-md rounded bg-red border border-red-light text-white text-xs roboto font-semibold">
        <span className="arrow absolute w-2 h-2 -mt-2 bg-red border-l border-t border-red-light" />
        <span className="leading-loose whitespace-no-wrap">{error}</span>
      </div>
    </div>
  ) : null

export default InputError
