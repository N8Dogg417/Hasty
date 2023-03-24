import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import debug from "hasty-debug";
import './tile.css';

function getTrackUnavailableMessage(kind, trackState) {
  if (!trackState) return;
  switch (trackState.state) {
    case 'blocked':
      if (trackState.blocked.byPermissions) {
        return `${kind} permission denied`;
      } else if (trackState.blocked.byDeviceMissing) {
        return `${kind} device missing`;
      }
      return `${kind} blocked`;
    case 'off':
      if (trackState.off.byUser) {
        return `${kind} muted`;
      } else if (trackState.off.byBandwidth) {
        return `${kind} muted to save bandwidth`;
      }
      return `${kind} off`;
    case 'sendable':
      return `${kind} not subscribed`;
    case 'loading':
      return `${kind} loading...`;
    case 'interrupted':
      return `${kind} interrupted`;
    case 'playable':
      return null;
    default:
        break;
    
  }
}

export default function Tile(props) {
  const videoEl = useRef(null);
  const audioEl = useRef(null);

  const _logger = debug.extend("videochat");
  const videoTrack = useMemo(() => {
    _logger("tile Props", props);
    return props.videoTrackState?.track;
  }, [props.videoTrackState]);

  const audioTrack = useMemo(() => {
    return props.audioTrackState?.persistentTrack;
  }, [props.audioTrackState]);

  const videoUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('video', props.videoTrackState);
  }, [props.videoTrackState]);

  const audioUnavailableMessage = useMemo(() => {
    return getTrackUnavailableMessage('audio', props.audioTrackState);
  }, [props.audioTrackState]);

  useEffect(() => {
    videoEl.current &&
      (videoEl.current.srcObject = videoTrack && new MediaStream([videoTrack]));
  }, [videoTrack]);

  useEffect(() => {
    audioEl.current &&
      (audioEl.current.srcObject = audioTrack && new MediaStream([audioTrack]));
  }, [audioTrack]);

  function getVideoComponent() {
    return videoTrack && <video autoPlay muted playsInline ref={videoEl} />;
  }

  function getAudioComponent() {
    return (
      !props.isLocalPerson &&
      audioTrack && <audio autoPlay ref={audioEl} />
    );
  }

  function getOverlayComponent() {
    return (
      videoUnavailableMessage && (
        <p className="overlay">
          {videoUnavailableMessage}
          {audioUnavailableMessage && (
            <>
              <br />
              {audioUnavailableMessage}
            </>
          )}
        </p>
      )
    );
  }

  function getCornerMessageComponent() {
    return (
      !props.isDisableCornerMessage &&
      audioUnavailableMessage &&
      !videoUnavailableMessage && (
        <p className="corner">{audioUnavailableMessage}</p>
      )
    );
  }

  function getClassNames() {
    let classNames = 'tile';
    classNames += props.isLarge ? ' large' : ' small';
    props.isLocalPerson && (classNames += ' local');
    return classNames;
  }

  return (
    <div className={getClassNames()} onClick={props.onClick}>
      <div className="background" />
      {getOverlayComponent()}
      {getVideoComponent()}
      {getAudioComponent()}
      {getCornerMessageComponent()}
    </div>
  );
}


Tile.propTypes = {
  videoTrackState: PropTypes.shape({
    callItems: PropTypes.shape({
      local: PropTypes.shape({
        videoTrackState: PropTypes.oneOfType,
        audioTrackState: PropTypes.oneOfType
      }),
    isClickAllowTimeoutFired: PropTypes.bool,
    camOrMicError: PropTypes.string,
    fatalError: PropTypes.string
    }),
    track: PropTypes.shape({
      track: PropTypes.string,
    })
  }),
 audioTrackState: PropTypes.shape({
    callItems: PropTypes.shape({
      local: PropTypes.shape({
        videoTrackState: PropTypes.oneOfType,
        audioTrackState: PropTypes.oneOfType
      }),
    isClickAllowTimeoutFired: PropTypes.bool,
    camOrMicError: PropTypes.string,
    fatalError: PropTypes.string, 
    }),
    persistentTrack: PropTypes.shape({
      isManagedByDaily: PropTypes.bool,
    })
 }),
 isLocalPerson: PropTypes.bool,
 isLarge: PropTypes.bool,
 isDisableCornerMessage: PropTypes.bool,
 onClick: PropTypes.func,
};
