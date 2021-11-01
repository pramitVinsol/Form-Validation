import React from 'react';
import ValidationMessage from './ValidationMessage';

function Input(props) {

  const invalidClass = `${props.touched && !props.valid ? "Invalid" : null}`;

  return (
    <div className={`FormGroup ${invalidClass}`}>
      <label>{props.label}</label>
      <input value={props.value} type={props.type} checked={props.valid} onChange={props.changed} /><br />
      <ValidationMessage touched={props.touched} valid={props.valid} validationMessage={props.validationMessage} />
    </div>
  )
};


Input.defaultProps = {
  changed: () => {},
  label: '',
  touched: false,
  type: '',
  valid: false,
  validationMessage: '',
  value: ''
};

export default Input;