import React, { Component } from 'react'
//import the library
import PaystackButton from 'react-paystack'

class Paystack = ({
  metadata,
  amount,
  email,
  plan,
  metadata,
  callback,
  text
}) => (

          metadata ? (
            <PaystackButton
              text={text || 'Make Payment'}
              class="payButton"
              callback={callback}
              reference={new Date().valueOf()}
              email={email}
              amount={amount}
              paystackkey='pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80'
              metadata={metadata}
            />
          ) : (
            <PaystackButton
              text={text || 'Make Payment'}
              class="payButton"
              callback={callback}
              reference={new Date().valueOf()}
              email={email}
              amount={amount}
              paystackkey='pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80'
              plan={plan}
            />
          )
 
    )


export default Paystack
