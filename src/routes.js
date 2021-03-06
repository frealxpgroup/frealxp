import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Views/Landing/Landing';
import Auth from './Views/Auth/Auth';
import Dashboard from './Views/Dashboard/Dashboard';
import Board from './Views/Challenge/Board';
import Review from './Views/Challenge/review';
import Submit from './Views/Challenge/Submit';
import Cart from './Views/Shop/Cart/Cart';
import Shop from './Views/Shop/ShopPage/Shop';
import History from './Views/History/History';
import Edit from './Views/Auth/Edit';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/auth/edit' component={Edit} />
        <Route path='/auth' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/challenge/board' component={Board} />
        <Route path='/challenge/review' component={Review} />
        <Route path='/challenge/submit' component={Submit} />
        <Route path='/history' component={History} />
        <Route path='/shop/cart' component={Cart} />
        <Route path='/shop' component={Shop} />
    </Switch>
)