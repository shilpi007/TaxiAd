import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';

import * as actions from '../../actions/adminActions';
class AddDriver extends Component {
  state = {};
  submit = async (values) => {
    try{
      await this.props.add(values, 'driver','secured');
      toast('Successfully added');
    }catch (e) {
      toast('Error! Unable to add');
    }
  };

  render() {
    
    return (
      <div>
        <h3>
          <b>Add Driver</b>
        </h3>
        <Form type="driver" onSubmit={this.submit}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {admin:state.admin,
  loading:state.loading}

}

export default connect(
  mapStateToProps,
  actions
)(AddDriver);
