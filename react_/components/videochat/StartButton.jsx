import React from 'react';
import PropTypes from 'prop-types';
import '../startbutton/startbutton.css';

export default function StartButton(props) {
  return (
    <button
      className="start-button"
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      Click to start a call
    </button>
  );
}

StartButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
}