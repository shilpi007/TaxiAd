import React, { Component } from 'react';
import Table from '../../components/Table/Table'
import {MDBCard,MDBCardBody,MDBContainer} from 'mdbreact'

class CampaignDetails extends Component {
  render() {

    return (<div>
      
      <MDBContainer>
      <h2>Campaign Details</h2>
            <MDBCard style={{marginTop:"30px"}}>
            <MDBCardBody>
            <Table type="driver" roles="client" id={this.props.location.query._id}/>
            </MDBCardBody>
        </MDBCard>
            </MDBContainer>
      </div>);
  }
}

export default CampaignDetails;
