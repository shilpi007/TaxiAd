import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddDriver from './AddDriver';
import AddCompany from './AddCompany';
import AddCampaign from './AddCampaign';
import DriverList from './DriverList';
import CampaignList from './CampaignList';
import CompanyList from './CompanyList';
import Header from '../../components/Header/Header';
import Dashboard from './Dashboard';
import SideNavigation from '../../components/Header/SideNavigation';
import DriverDetails from './DriverDetails';
import CompanyDetails from './CompanyDetails';
import CampaignDetails from './CampaignDetails';
import Notification from './Notification';
import Profile from './Profile';

export default class Admin extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="flexible-content">
        <Header />
        <SideNavigation count={5}/>
        <main id="content" className="p-5">
          <Switch>

            <Route path={`${match.path}/`} component={Dashboard} exact />
            <Route path={`${match.path}/adddriver`} render={(props) => <AddDriver {...props} />} exact/>
            <Route path={`${match.path}/addcampaign`} render={(props) => <AddCampaign {...props} />} exact/>
            <Route path={`${match.path}/addcompany`} component={AddCompany} exact />
            <Route path={`${match.path}/notifications`} component={Notification} exact />
            <Route path={`${match.path}/profile`} component={Profile} exact />

            <Route path={`${match.path}/companylist`} component={CompanyList} exact />
            <Route path={`${match.path}/campaignlist`} component={CampaignList} exact />
            <Route path={`${match.path}/driverlist`} component={DriverList} exact />

            <Route path={`/admin/driverList/driver/:_id`} component={DriverDetails} exact/>
            <Route path={`/admin/companylist/company/:_id`} component={CompanyDetails} exact/>
            <Route path={`/admin/campaignlist/campaign/:_id`} component={CampaignDetails} exact/>

            
            {/*<Route component={NotFound} />*/}
          </Switch>
        </main>
      </div>
    );
  }
}
