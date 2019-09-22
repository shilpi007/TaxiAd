import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import * as actions from '../../actions/adminActions';
import {toast} from 'react-toastify';
class AddCompany extends Component {

  submit = async (values) => {
    try{
      await this.props.add(values, 'company');
      toast('Successfully added!');
    }catch (e) {
      toast('Error! Unable to add');
    }
  };

  render() {
    return (
      <div>
        <h3>
          <b>Add Company</b>
        </h3>

        <Form type="company" onSubmit={this.submit} loading={this.props.admin.loading}/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    admin:state.admin
  }

}

export default connect(
  mapStateToProps,
  actions
)(AddCompany);
