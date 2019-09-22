import React from 'react';
import { MDBInput } from 'mdbreact';

const InputPage = (props) => {
  return (
    <div className="form-group">
      <MDBInput {...props} label={props.label} type={props.type} />
    </div>
  );
};

export default InputPage;
