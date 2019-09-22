import React, { Component } from 'react';
import Table from '../../components/Table/Table';

class CamaignList extends Component {
  render() {
    return (
      <div>
        <Table type="campaign" />
      </div>
    );
  }
}

export default CamaignList;
