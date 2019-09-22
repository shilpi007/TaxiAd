import React, { Component } from 'react';
import InputText from './InputText';
import InputSelect from './InputSelect';

class InputField extends Component {
  renderFields = () => {
    const { type } = this.props;

    switch (type) {
      case 'text':
        return (
          <InputText
            label={this.props.label}
            placeholder={this.props.placeholder}
            type={this.props.type}
            {...this.props.input}
          />
        );
      case 'email':
        return (
          <InputText
            label={this.props.label}
            placeholder={this.props.placeholder}
            type={this.props.type}
            {...this.props.input}
          />
        );
      case 'date':
        return (
          <InputText
            label={this.props.label}
            placeholder={this.props.placeholder}
            type={this.props.type}
            {...this.props.input}
          />
        );
      case 'select':
        return (
          <InputSelect
            label={this.props.label}
            placeholder={this.props.placeholder}
            type={this.props.type}
            data={this.props.data}
            {...this.props.input}
          />
        );
      case 'number':
        return (
          <InputText label={this.props.label} placeholder={this.props.placeholder} type="text" {...this.props.input} />
        );
      default:
        return;
    }
  };

  render() {
    return <div style={{ marginTop: '20px' }}>{this.renderFields()}</div>;
  }
}

export default InputField;
