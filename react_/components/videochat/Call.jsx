import React, { useEffect, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../call/call.css';
import Tile from '../tile/Tile';
import CallObjectContext from '../CallObjectContext';
import CallMessage from '../callmessage/CallMessage';
import {
  initialCallState,
  CLICK_ALLOW_TIMEOUT,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  isScreenShare,
  containsScreenShare,
  getMessage,
} from './callstate';

export default function Call() {
  const callObject = useContext(CallObjectContext);
  const [callState, dispatch] = useReducer(callReducer, initialCallState);

  useEffect(() => {
    if (!callObject) return;

    const events = [
      'participant-joined',
      'participant-updated',
      'participant-left',
    ];

    function handleNewParticipantsState() {
      dispatch({
        type: PARTICIPANTS_CHANGE,
        participants: callObject.participants(),
      });
    }

    handleNewParticipantsState();

    for (const event of events) {
      callObject.on(event, handleNewParticipantsState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewParticipantsState);
      }
    };
  }, [callObject]);


  useEffect(() => {
    if (!callObject) return;

    function handleCameraErrorEvent(event) {
      dispatch({
        type: CAM_OR_MIC_ERROR,
        message:
          (event && event.errorMsg && event.errorMsg.errorMsg) || 'Unknown',
      });
    }

    callObject.on('camera-error', handleCameraErrorEvent);

    return function cleanup() {
      callObject.off('camera-error', handleCameraErrorEvent);
    };
  }, [callObject]);

  useEffect(() => {
    if (!callObject) return;

    function handleErrorEvent(e) {
      dispatch({
        type: FATAL_ERROR,
        message: (e && e.errorMsg) || 'Unknown',
      });
    }

    callObject.on('error', handleErrorEvent);
    return function cleanup() {
      callObject.off('error', handleErrorEvent);
    };
  }, [callObject]);


  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({ type: CLICK_ALLOW_TIMEOUT });
    }, 2500);

    return function cleanup() {
      clearTimeout(t);
    };
  }, []);


  const sendHello = useCallback(
    (participantId) => {
      callObject &&
        callObject.sendAppMessage({ hello: 'world' }, participantId);
    },
    [callObject]
  );

  function getTiles() {
    let largeTiles = [];
    let smallTiles = [];
    Object.entries(callState.callItems).forEach(([id, callItem]) => {
      const isLarge =
        isScreenShare(id) ||
        (!isLocal(id) && !containsScreenShare(callState.callItems));
      const tile = (
        <Tile
          key={id}
          videoTrackState={callItem.videoTrackState}
          audioTrackState={callItem.audioTrackState}
          isLocalPerson={isLocal(id)}
          isLarge={isLarge}
          isDisableCornerMessage={isScreenShare(id)}
          onClick={
            isLocal(id)
              ? null
              : () => {
                  sendHello(id);
                }
          }
        />
      );
      if (isLarge) {
        largeTiles.push(tile);
      } else {
        smallTiles.push(tile);
      }
    });
    return [largeTiles, smallTiles];
  }

  const [largeTiles, smallTiles] = getTiles();
  const message = getMessage(callState);
  return (
    <div className="call col">
      <div className="large-tiles">
        {
          !message
            ? largeTiles
            : null
        }
      </div>
      <div className="small-tiles">{smallTiles}</div>
      {message && (
        <CallMessage
          header={message.header}
          detail={message.detail}
          isError={message.isError}
        />
      )}
    </div>
  );
}

Call.propTypes = {
    roomUrl: PropTypes.string.isRequired,
};
