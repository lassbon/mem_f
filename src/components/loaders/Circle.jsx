import React from 'react'
import './circle.css'

const Circle = ({ text }) => (
  <>
    <div className="flex flex-col justify-center items-center circle-loader">
      <div className="wrapper mb-4">
        <div className="circle circle-1 border-4 border-yellow" />
        <div className="circle circle-1a border-4 border-pink-light" />
        <div className="circle circle-2 border-4 border-red-light" />
        <div className="circle circle-3 border-4 border-purple-light" />
      </div>
      <p className="text-base font-semibold roboto">
        {text || 'Loading&hellip;'}
      </p>
    </div>
  </>
)

export default Circle
