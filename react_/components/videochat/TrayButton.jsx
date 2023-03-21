import React from 'react';
import PropTypes from 'prop-types';
import '../traybutton/traybutton.css';
import Icon, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE,
  TYPE_CHAT,
} from '../icon/Icon';


export default function TrayButton(props) {
  return (
    <button
      disabled={props.isDisabled}
      onClick={props.onClick}
      className={'tray-button' + (props.isNewButtonGroup ? ' new-group' : '')}
    >
      <Icon type={props.type} isHighlighted={props.isHighlighted} />
    </button>
  );
}

TrayButton.propTypes = {
  type: PropTypes.string, 
  isDisabled: PropTypes.bool, 
  isHighlighted: PropTypes.bool,
  onClick: PropTypes.func,
  isNewButtonGroup: PropTypes.bool,
};



export { TYPE_MUTE_CAMERA, TYPE_MUTE_MIC, TYPE_SCREEN, TYPE_LEAVE, TYPE_CHAT };