import React from 'react';
import PropTypes from 'prop-types';
import '../callmessage/callmessage.css';


export default function CallMessage(props) {
  return (
    <div className={'call-message' + (props.isError ? ' error' : '')}>
      <p className="call-message-header">{props.header}</p>
      <p>{props.detail}</p>
    </div>
  );
}

CallMessage.propTypes = {
  isError: PropTypes.bool,
  header: PropTypes.string,
  detail: PropTypes.string,
};