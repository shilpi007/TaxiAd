import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import List from './List';
import Header from './Header/Header'
import CampaignDetails from '../Admin/CampaignDetails';
import DriverDetails from './DriverDetails'
import Signin from '../PublicPages/SignIn/ClientSignin';
import {PrivateRoute} from '../../components/PrivateRouter/PrivateRoute'

export default class Company extends Component {
  render() {
   const isAuthenticated = localStorage.getItem('a_token') ? true : false;

    return (
      <div className="flexible-content">
      <Header/>
        <main >
          <Switch>
            <Route path={`/company/signin`} component={Signin} exact/>
            <Route path={'/company/list/campaign/:id'}  component={CampaignDetails}  />
            <Route path={'/company/list/driver/:id'}  component={DriverDetails} />
            <PrivateRoute path={'/company/list'} isAuthenticated={isAuthenticated} component={List} redirect={'/company/signin'} />
            
            <PrivateRoute
          path={`/company`}
          isAuthenticated={isAuthenticated}
          component={Dashboard}
          redirect={'/company/signin'}
        />
            
            
          </Switch>
        </main>
      </div>
    );
  }
}
