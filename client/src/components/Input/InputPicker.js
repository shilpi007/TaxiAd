import React from 'react';
import { MDBDatePicker } from 'mdbreact';

import moment from 'moment';
import 'moment/locale/fr';

class InputPicker extends React.Component {
  getPickerValue = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div>
        <MDBDatePicker cancelLabel="Effacer" locale={moment.locale('fr')} getValue={this.getPickerValue} />
      </div>
    );
  }
}

export default InputPicker;
