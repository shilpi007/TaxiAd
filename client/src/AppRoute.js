import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import Admin from './pages/Admin';
import RegisterDriver from './pages/PublicPages/RegisterDriver'
import Landing from './pages/PublicPages/Landing/LandingPage'
// import Signin from './pages/PublicPages/SignIn/Signin'
import ClientRoute from './pages/Company/ClientRoutes'
import {AdminRoutes} from './pages/Admin/AdminRoutes'

export default class Test extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" component={Landing} exact/>
          <Route path="/register/driver" component={RegisterDriver} />
          
          <Route path="/company" component={ClientRoute} />
          <Route path="/admin" component={AdminRoutes} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    );
  }
}

      
