import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './tray.css';
import TrayButton, {
  TYPE_MUTE_CAMERA,
  TYPE_MUTE_MIC,
  TYPE_SCREEN,
  TYPE_LEAVE,
  TYPE_CHAT,
} from '../traybutton/TrayButton';
import Chat from '../chat/Chat';
import CallObjectContext from '../../videochat/CallObjectContext';
import DailyIframe from '@daily-co/daily-js';

function getStreamStates(callObject) {
  let isCameraMuted,
    isMicMuted,
    isSharingScreen = false;
  if (callObject && callObject.participants() && callObject.participants().local) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !localParticipant.video;
    isMicMuted = !localParticipant.audio;
    isSharingScreen = localParticipant.screen;
  }
  return [isCameraMuted, isMicMuted, isSharingScreen];
}

export default function Tray(props) {
  const callObject = useContext(CallObjectContext);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isSharingScreen, setSharingScreen] = useState(false);
  const [displayChat, setChatDisplay] = useState(false);
  const [highlightedChat, setChatHighlight] = useState(false);

  function toggleCamera() {
    callObject.setLocalVideo(isCameraMuted);
  }

  function toggleMic() {
    callObject.setLocalAudio(isMicMuted);
  }

  function toggleSharingScreen() {
    isSharingScreen ? callObject.stopScreenShare() : callObject.startScreenShare();
  }

  function leaveCall() {
    props.onClickLeaveCall && props.onClickLeaveCall();
  }

  function toggleChat() {
    setChatDisplay(!displayChat);
    if (highlightedChat) {
      setChatHighlight(!highlightedChat);
    }
  }

  function handleNewChat() {
    setChatHighlight(!highlightedChat);
  }

  useEffect(() => {
    if (!callObject) return;

    function handleNewParticipantsState() {
      const [isCameraMuted, isMicMuted, isSharingScreen] = getStreamStates(callObject);
      setCameraMuted(isCameraMuted);
      setMicMuted(isMicMuted);
      setSharingScreen(isSharingScreen);
    }

    handleNewParticipantsState();

    callObject.on('participant-updated', handleNewParticipantsState);

    return function cleanup() {
      callObject.off('participant-updated', handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <div className="tray">
      <TrayButton
        type={TYPE_MUTE_CAMERA}
        isDisabled={props.isDisabled}
        isHighlighted={isCameraMuted}
        onClick={toggleCamera}
      />
      <TrayButton type={TYPE_MUTE_MIC} isDisabled={props.isDisabled} isHighlighted={isMicMuted} onClick={toggleMic} />
      {DailyIframe.supportedBrowser().supportsScreenShare && (
        <TrayButton
          type={TYPE_SCREEN}
          isDisabled={props.isDisabled}
          isHighlighted={isSharingScreen}
          onClick={toggleSharingScreen}
        />
      )}
      <TrayButton type={TYPE_CHAT} isDisabled={props.isDisabled} isHighlighted={highlightedChat} onClick={toggleChat} />
      <Chat isOnClickDisplay={displayChat} notification={handleNewChat} />
      <TrayButton
        type={TYPE_LEAVE}
        isDisabled={props.isDisabled}
        isNewButtonGroup={true}
        isHighlighted={true}
        onClick={leaveCall}
      />
    </div>
  );
}

Tray.propTypes = {
  onClickLeaveCall: PropTypes.func,
  isDisabled: PropTypes.bool.isRequired,
};
