import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import List from './List';
import Header from './Header/Header'
import CampaignDetails from '../Admin/CampaignDetails';
import DriverDetails from './DriverDetails'
import Signin from '../PublicPages/SignIn/ClientSignin';
import {PrivateRoute} from '../../components/PrivateRouter/PrivateRoute'
import ClientRoutes from './ClientRoutes';
export default class Company extends Component {
  render() {
    const { match } = this.props;
   const isAuthenticated = localStorage.getItem('a_token') ? true : false;

    return (
      <div className="flexible-content">

      <Header/>
        <main >
          <ClientRoutes/>
        </main>
      </div>
    );
  }
}
