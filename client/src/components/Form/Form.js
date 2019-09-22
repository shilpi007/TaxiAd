import React, { Component } from 'react';
import Input from '../Input/Input';
import { MDBBtn } from 'mdbreact';
import { DriverField, CampaignField, CompanyField } from './FormField';
import { Field, reduxForm } from 'redux-form';
// import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
let type = '';
class Form extends Component {
  state = {
    type: '',
    field: {},
  };

  componentWillMount() {
    let field = {};
    if (this.props.type === 'driver') {    
      field = DriverField;
    } else if (this.props.type === 'company') {
      field = CompanyField;
    } else {
      field = CampaignField;
    }
    this.setState({ type: this.props.Type, field });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {this.state.field.map((obj, i) => {
            return (
              <Field
              key={i}
                name={obj.value}
                component={(props) => (
                  <Input
                    type={obj.type}
                    placeholder={obj.placeholder}
                    label={obj.label}
                    data={this.props.companyList}
                    {...props}
                  />
                )}
                type={obj.type}
              />
            );
          })}
          <div style={{ textAlign: 'center' }}>
            <MDBBtn type="submit">{this.props.loading?"Loading...":"Submit"} </MDBBtn>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'form',
  destroyOnUnmount: true
})(Form);
