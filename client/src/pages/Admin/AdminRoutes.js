import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './index';
import {PrivateRoute} from '../../components/PrivateRouter/PrivateRoute'
import Signin from '../PublicPages/SignIn/Signin'
export const AdminRoutes = ({ match, history }) => {
  const isAuthenticated = localStorage.getItem('a_token') ? true : false;
  return (
    <div className="flexible-content">
        
        <main >
          <Switch>   
            <Route path={`${match.path}/signin`} render={(props) => <Signin {...props}/>} />          
            <PrivateRoute
              path={`${match.path}`}
              isAuthenticated={isAuthenticated}
              component={Home}
              redirect={`${match.path}/signin`}
            />
          </Switch>
        </main>
      </div>
  );
};