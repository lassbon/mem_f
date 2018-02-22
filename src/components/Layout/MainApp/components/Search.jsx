import React from 'react'
import { Formik } from 'formik'

const Search = () => {
  return (
    <form className="flex items-center px-6 bg-grey-lighter text-grey-darker">
      <span className="text-sm">
        <i className="ion-ios-search-strong" />
      </span>
      <input
        type="text"
        placeholder="search for users"
        className="appearance-none w-full py-6 px-4 font-normal text-sm text-grey-darker capitalize"
      />

      <button>
        <i />
      </button>
    </form>
  )
}

export default Search
