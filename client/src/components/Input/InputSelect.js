import React, { Component } from 'react';
// import { MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption } from 'mdbreact';

class InputSelect extends Component {
  render() {
    console.log({ ...this.props });
    return (
      <div>
        <select {...this.props}>
          <option>{this.props.label}</option>
          {this.props.data.map((obj, i) => {
            return <option key={i} value={obj.value}>{obj.label}</option>;
          })}
        </select>
      </div>
    );
  }
}

export default InputSelect;
