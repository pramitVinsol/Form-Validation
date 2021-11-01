import React from 'react';
import ValidationMessage from './ValidationMessage';

function TextArea(props) {

  const invalidClass = `${props.touched && !props.valid ? "Invalid" : null}`;

  return (
    <div className={`FormGroup ${invalidClass}`}>
      <label>{props.label}</label><br />
      <textarea value={props.value} onChange={props.changed}></textarea><br />
      <ValidationMessage touched={props.touched} valid={props.valid} validationMessage={props.validationMessage} />
    </div>
  )
};

TextArea.defaultProps = {
  changed: () => {},
  label: '',
  touched: false,
  valid: false,
  validationMessage: '',
  value: ''
};

export default TextArea;