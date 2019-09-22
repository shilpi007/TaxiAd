import React, { Component } from 'react';
import Cards from './DashboardComponent/Cards';
import {MDBContainer,MDBRow} from 'mdbreact';
import DatatablePage from './DashboardComponent/ActivityTable';
class Dashboard extends Component {
  render() {

    // state={
    //   notificationCount :0,
    //   totalRunningCampaigns: 0,
    //   totalCampanies:0,
    //   totalDriverEngaged:0,
    //   successfulCampaign:0,
    //   campaignList:[]
    // }

    // componentWillMount(){
    //   try{
    //   const res = axios.get('/api/v1/admin/dashboard')
    //   this.setState({
        
    //   })
    //   }catch(e){
    //     console.log(e)
    //   }
    // }

    return (
      <div>
        <MDBContainer>
              <Cards data = {this.state}/>
        </MDBContainer>
      </div>
    )
  }
}

export default Dashboard;
