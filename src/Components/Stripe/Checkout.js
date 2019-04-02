import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './Checkout.scss'

class Checkout extends Component {
 constructor(props) {
   super(props)
   this.state = {}
 }

 onToken = (token) => {
   token.card = void 0;
   console.log('token', token);
   axios.post(`/api/payment`, { token, amount: this.props.grandTotal }).then(response => {
     console.log({ response })
   });
   let cartRef = this.props.cartID.cart_ref
   axios.delete(`/shop/delete/${cartRef}`).then(res => {window.location.reload()})
 }


 render() {
  //  let emptyArr = []
   return (

     <div>
       <StripeCheckout
         label="Checkout"
         style={Object.assign({}, {
           ...{
             background: 'none',
             boxShadow: 'none',
             outline: 'none'
           }
         })}
         token={this.onToken}
         stripeKey={'pk_test_wPL8InqLAwhZRR2hGlMc87NI009QIVyr3D'}
         amount={this.props.grandTotal * 100}
       />
     </div>



   );
 }
}

export default Checkout;