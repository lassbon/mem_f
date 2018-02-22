import React from 'react'
import ButtonFixedWidthRadiusXS from 'components/buttons/ButtonFixedWidthRadiusXS'

const AnnualDuePayment = () => {
  return (
    <div>
      <div className="registration-payment-shadow lg:w-64 lg:h-64 mb-8 p-8 flex flex-col justify-between items-center bg-white border border-pink border-solid">
        <h4 className="hind uppercase text-xs font-normal text-grey-darker">
          Annual fee
        </h4>

        <div className="">
          <b className="text-4xl py-4 font-bold text-pink-dark">N250,000</b>
        </div>

        <div className="mb-8 font-semibold text-grey-darker">
          <span className="mt-4 text-grey font-normal">To cover</span>
          <hr />
          cost of your membership plan
        </div>
      </div>
      <ButtonFixedWidthRadiusXS>
        <i className="ion-card mr-3" />

        <span className="">Pay</span>
      </ButtonFixedWidthRadiusXS>
    </div>
  )
}

export default AnnualDuePayment
