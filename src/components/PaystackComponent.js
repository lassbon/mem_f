import React, { Component } from 'react'
//import the library
import PaystackButton from 'react-paystack'

class PaystackComponent extends Component {
  state = {
    key: 'pk_test_29cf8e5e061acc51789cea04daaf4ca60acc6b80',
    email: 'lemuel@karixchange.com',
    // amount: 10000 //equals NGN100,
  }

  callback = response => {
    console.log(response) // card charged successfully, get reference here
    this.props.callback()
  }

  close = () => {
    console.log('Payment closed')
  }

  getReference = () => {
    //you can put any unique reference implementation code here
    let text = ''
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.='

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  render() {
    return (
      <div>
        <p>
          <PaystackButton
            text="Make Payment"
            class="payButton"
            callback={this.callback}
            close={this.close}
            reference={this.getReference()}
            email={this.state.email}
            amount={this.props.amount}
            paystackkey={this.state.key}
          />
        </p>
      </div>
    )
  }
}

export default PaystackComponent
