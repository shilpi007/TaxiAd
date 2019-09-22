

import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import * as actions from '../../actions/adminActions';
import {MDBContainer} from 'mdbreact'
class RegisterDriver extends Component {
  state = {};
  submit = (values) => {
    this.props.add(values, 'driver','unsecured');
  };

  render() {
    return (
      <div>
      <MDBContainer>
        <h3 style={{alignItems:"centre"}}>
          <b>Add Driver</b>
        </h3>
        
        

        <Form type="driver" onSubmit={this.submit} />
        
        
        </MDBContainer>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(RegisterDriver);


