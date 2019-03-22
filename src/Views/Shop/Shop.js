// Shop will have two buttons, cart and checkout. Shop will render a list of all available products.

import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Shop.scss'

class Shop extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='background'>
                <div className='header'>
                    <div className='menu'>
                        <Link to='/shop/cart'>
                        <div>cart</div>
                        </Link>
                        <div>checkout</div>
                        <Link to='/shop/history'>
                        <div>order history</div>
                        </Link>
                    </div>
                    <h1>FRealXP</h1>
                </div>
                <div className='body_container'>
                    <div className='Product'>Product1</div>
                    <div className='Product'>Product2</div>
                    <div className='Product'>Product3</div>
                </div>

            </div>
        )
    }
}
export default Shop