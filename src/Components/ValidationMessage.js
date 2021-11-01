import React from "react";

function ValidationMessage(props) {

  if (props.touched && !props.valid) {
    return (
      <div className="ErrorMessage">
        {props.validationMessage}
      </div>
    )
  } else {
    return <div></div>
  }
};

ValidationMessage.defaultProps = {
  touched: false,
  valid: false,
  validationMessage: ''
};

export default ValidationMessage;