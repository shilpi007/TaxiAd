import React from 'react';
import { MDBDataTable } from 'mdbreact';

const TableView = (props) => {
  console.log(props.data);
  return <MDBDataTable bordered small data={props.data} btn hover />;
};

export default TableView;
