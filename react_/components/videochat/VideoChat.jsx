import React, { useEffect, useState} from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { useLocation} from 'react-router-dom';
import {getCurrentUser} from '../../../services/userService';
import Header from '../../elements/Header';
import videoChatService from '../../../services/videoChatService';
import DailyIframe from '@daily-co/daily-js';
import CallObjectContext from '../videochat/CallObjectContext';
import Call from '../videochat/call/Call';
import Tray from '../videochat/tray/Tray';
import { FaVideo } from 'react-icons/fa';
import toastr from 'toastr';
import debug from 'sabio-debug';
import swal from 'sweetalert2';
import './videochat.css';

const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';

const crumbs = [
  { name: 'Apps', path: '/apps' },
  { name: 'VideoChat', path: '/apps/videochat' },
];

const localUrlPrefix = { videoChatUrls: `https://www.hasty.com/apps/videochat` };



export default function VideoChat() {

  const _logger = debug.extend('videochat');

  const [appState, setAppState] = useState(STATE_IDLE);
  const [currUser, setCurrUser] = useState(null);
  const [roomData, setRoomData] = useState({
    roomUrl: null,
    roomName: null, 
    roomToken: null, 
    hostId: null,
    localUrl:null 
  })
  const [callObject, setCallObject] = useState(null);
  const [meetingData, setMeetingData] = useState(null);
  const [meetingIdNew, setMeetingIdNew] = useState(0);
  const [isHost, setIsHost] = useState(false); 
  const [hostId, setHostId] = useState(0);
  const searchParams = useLocation()

  useEffect(() =>{
    const roomParam = searchParams.search;
    const roomNameRequested = new URLSearchParams(roomParam).get("roomname");
    const hostIdPassed = new URLSearchParams(roomParam).get("hostid");
    setHostId(parseInt(hostIdPassed));
    const builtRoomUrl = `https://hastydevs.daily.co/${roomNameRequested}`;

    setRoomData((prevState) => {
      const currData = {...prevState};
      const newData = currData; 
      newData.roomUrl = builtRoomUrl;
      newData.roomName = roomNameRequested;
      newData.hostId = hostIdPassed;
      return newData;
    });
    _logger("useParams",roomNameRequested);
    getCurrentUser().then(getCurrentUserSuccess).catch(getCurrentUserError);
    _logger("Host ID", hostIdPassed);
    
  },[]);

  useEffect(() => {
    if(currUser){
      _logger("Host ID...", hostId);
      _logger("current User ID", currUser.id);
      
      if(hostId === currUser.id){
        _logger("THIS IS THE HOST!!!!");
        setIsHost(true);
      }
    }
  },[currUser]);

  useEffect(() =>{
    if(currUser){
      getRoomToken();
      setRoomData((prevState) => {
        const currData = {...prevState};
        const newData = currData; 
        newData.localUrl = `${localUrlPrefix.videoChatUrls}?roomname=${roomData.roomName}&hostid=${hostId}`
        return newData;
      });
    }
    
  },[currUser,roomData.roomName]);

  useEffect(() => {
    if (meetingIdNew)
    {
      sendParticipantData(meetingData.participants);
    }
  }, [meetingIdNew]);

  const getCurrentUserSuccess = (response) => {
    _logger("current User UPON Success:", response.item);
    setCurrUser(response.item);
    return response.item;
  };
  const getCurrentUserError = () => {
    toastr.error('Unable to Get Current User! ', 'User error');
  };

  const getRoomToken = () =>{
    const tokenRequest =  {
      properties: {
        roomName: roomData.roomName,
        userName: currUser.name,
        userId: currUser.id,
        enableScreenShare: true,
        startVideoOff: true,
        startAudioOff: true,
        exp: Math.floor(Date.now() / 1000) + 3600
      }  
    }
    videoChatService.getRoomToken(tokenRequest).then(getTokenSuccess).catch(getTokenError)
  }
  const getTokenSuccess = (response) => {
    const token = response.item.token;
    setRoomData((prevState) => {
      const currData = {...prevState};
      const newData = currData; 
      newData.roomToken = token;
      return newData;
    });
    _logger("newToken generated: ",token);
  };
  const getTokenError = () => {
    toastr.error('Creating TOKEN ERROR ');
  };


  const startVideoChat = () => {
    videoChatService.getActiveRoomList(10).then(getActiveSuccess).catch(getActiveError)
  }
  const getActiveSuccess = (response) => {
    _logger("Active Rooms", response);
    const activeRmList = response.item.data;
    const totalCount = response.item.total_count;

    if(totalCount > 0){
      const fliteredRooms = activeRmList.filter((room) =>{
        let isRoomCreated = false;
        if(room.name === roomData.roomName){
          isRoomCreated = true;
        }
        return isRoomCreated;
      });
      _logger("# of ACTIVE Rooms with same name: ", fliteredRooms.length);
      if(fliteredRooms.length === 0){
        createRoom();
      }
      else{
        startJoiningCall();
      }
    }
    else{
      createRoom();
    }
  };
  const getActiveError = (err) => {
    _logger("get active room ERROR", err);
    toastr.error('Getting Active Room List ');
  };

  const createRoom = () => {
    setAppState(STATE_CREATING);
    let payload = {
      name: roomData.roomName,
      privacy: 'private',
      properties: {
        startAudioOff: true,
        startVideoOff: true,
        enableChat: true,
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
    };
    _logger('current User', currUser);
    _logger('Room Request Payload', payload);

    videoChatService.createRoom(payload).then(createRoomSuccess).catch(createRoomError);
  };

  const createRoomSuccess = (response) => {
    const result = response.item.result;
    _logger('Room Created', result);
    toastr.success("Video Chat Room Created.");
    setAppState(STATE_IDLE);
    startJoiningCall();
  };
  const createRoomError = (err) => {
    toastr.error('Creating a video room failed. ', err);
    setAppState(STATE_IDLE);
  };


  const startJoiningCall =() => {
    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setAppState(STATE_JOINING);
    _logger("final check before call creation:", roomData.roomUrl);
    newCallObject.join({ url: roomData.roomUrl, token: roomData.roomToken});
  };

  const startLeavingCall = () =>{
    if (!callObject) return;

    swal.fire({
      title: 'Are you sure you want to leave the Room?',
      text: "Click to confirm",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Leave Room'
    }).then((result) => {
      if (result.isConfirmed) {
        if(isHost){
          videoChatService.getDailyMeetingLogs(roomData.roomName).then(getDailyMeetingLogSuccess).catch(getDalyMeetingLogError);
          _logger("LOGGING MEETING AS HOST OF:",roomData.roomName);
        }
        if (appState === STATE_ERROR) {
          callObject.destroy().then(() => {
          setCallObject(null);
          setAppState(STATE_IDLE);
        });
        } else {
          setAppState(STATE_LEAVING);
          callObject.leave();
        }
      }
    })
  };
 
  const getDailyMeetingLogSuccess = (response) => {
    const allMeetingData = response.item.data;
    let epochNow = Math.floor(Date.now() / 1000);
    const filteredRoomLogs = allMeetingData.filter((meeting) => {
      let isCurrentRoom = false;
      let timeSinceMtg = (epochNow - meeting.start_Time);
        if (meeting.room === roomData.roomName){
          if(timeSinceMtg < 4000){
            isCurrentRoom = true;
          }
        }
        return isCurrentRoom;
    });
    let meetingLogs = filteredRoomLogs[0];
    setMeetingData(meetingLogs);
    sendMeetingLogs(meetingLogs);
  };
  const getDalyMeetingLogError = (err) => {
    _logger("get meeting Data ERROR ",err);
    toastr.error('Retrieving Meeting Logs Failed. ', 'Log error');
  };


  const sendMeetingLogs = (meetingLogs) => {
    const startTime = getDateTimeFromEpoch(meetingLogs.start_Time);
    let meetingPayload = {
      hostId: currUser.id,
      dailyId: meetingLogs.id,
      roomName: meetingLogs.room,
      duration: meetingLogs.duration,
      startTime: startTime
    }
    videoChatService.addMeetingLog(meetingPayload).then(addMeetingSuccess).catch(addMeetingError);
  }
  const addMeetingSuccess = (response) => {
    _logger("meeting ADDED ID:");
    setMeetingIdNew(response.item);
  };
  const addMeetingError = () => {
    toastr.error('Error Logging Meeting! ', 'Log error');
  };

  const sendParticipantData = (participants) => {
    participants.forEach(participant => {
      const participantPayload = {
        dailyMeetingId: meetingIdNew,
        userId: participant?.user_Id, 
        duration: participant?.duration,
        timeJoined: getDateTimeFromEpoch(participant.join_Time),
      }
      videoChatService.addParticipantLog(participantPayload).then(addParticpantLogSuccess).catch(addParticipantLogError);
    });
  }

  const addParticpantLogSuccess = (response) => {
    _logger("participant added:");
    return response;
    
  };
  const addParticipantLogError = () => {
    toastr.error('Error Participant NOT added', 'Log error');
  };

  useEffect(() => {
    if (!callObject) return;

    const events = ['joined-meeting', 'left-meeting', 'error'];

    function handleNewMeetingState() {
        switch (callObject.meetingState()) {
          case 'joined-meeting':
            setAppState(STATE_JOINED);
            break;
          case 'left-meeting':
            callObject.destroy().then(() => {
              setCallObject(null);
              setAppState(STATE_IDLE);
            });
            break;
          case 'error':
            setAppState(STATE_ERROR);
            break;
          default:
            break;
        }
    }

    handleNewMeetingState();

    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);


  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      if (!event) {
        toastr.error('ERROR. ', 'Video Chat Error. ', event);
        _logger("error msg", event);
      }
      else{
      }
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject]);

  const getDateTimeFromEpoch = (epoch) => {
      const epochTimestampInSeconds = epoch;
      const epochTimestampInMilliseconds = epochTimestampInSeconds * 1000;
      const date = new Date(epochTimestampInMilliseconds);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateString;
  }

  const setRoomName = (name) =>{
    _logger("roomName proposed", name);
    setHostId(currUser.id);
    setRoomData((prevState) => {
      const currData = {...prevState};
      const newData = currData; 
      newData.roomName = name.roomName;
      newData.roomUrl = `https://hastydevs.daily.co/${name.roomName}`;
      newData.hostId = currUser.id;
      newData.localUrl = `${localUrlPrefix.videoChatUrls}?roomname=${name.roomName}&hostid=${hostId}`;
      return newData;
    });
    setIsHost(true);
  }

  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(appState);
  const enableCallButtons = [STATE_JOINED, STATE_ERROR].includes(appState);

    return (
       <>
          <Container>
            <Row>
                <Col>
                    <Header title="Video Chat" crumbs={crumbs} />
                </Col>
            </Row>
            </Container>
            <Container className="textAlign-center">
            <Card>
              <Card.Header className="bg-secondary">
                <Row className="bg-secondary video-text" >
                  <Col className="col-6 col-form-label-sm">
                    
                      <a className="video-text"> RoomName: <strong>{roomData.roomName}</strong></a>
                      {!hostId ? (
                        <Formik
                          initialValues={{
                            roomName:''
                          }}
                          onSubmit={(values) => setRoomName(values)}
                            >
                          <Form>
                            <label htmlFor="roomName"></label>
                            <Field id="roomName" name="roomName" placeholder="hasty12345" />
                            <button type="submit">Submit</button>
                          </Form>
                        </Formik>):<></> }
                      
                  </Col>
                  <Col className="col-6 text-end">
            <Row>
                      <Col className="col-1">
              </Col>
                      <Col className="my-2 col-7">
                        {isHost ? (
                          <p className="video-text col-8 m-0 mx-auto"> <strong>-You ARE the Host-</strong></p>
                        ):<p className="video-text col-8 m-0 mx-auto"> <strong>-GUEST-</strong></p>}
                      </Col>
                      <Col className="col-auto">
              {!showCall ? (
                  <Button
                            className="w-60 m-1"
                            variant="primary"
                    onClick={startVideoChat}>
                    <FaVideo /> Join Room
                          </Button>): (
                  <Button
                    className="w-60 mb-1"
                    variant="danger"
                    onClick={startLeavingCall}>
                    <FaVideo /> Leave Room
                          </Button>)}
              </Col>
            </Row>
                </Col>
                </Row>
                <Row className='text-center'>
                      <Col className="col-12 mx-0">
                        {(roomData.localUrl && roomData.roomName && !showCall) ? 
                            (<div><a className="video-text col-4" > 
                                URL:  <strong>{roomData.localUrl}</strong>
                                </a>
                              <button className="bg-success" onClick={() =>  
                                  {
                                    navigator.clipboard.writeText(roomData.localUrl);
                                    toastr.success("Url Copied!");
                                  }}>
                                    Copy
                              </button>
                            </div>): <div></div>}
                </Col>
              </Row>
              </Card.Header>
              <Card.Body className="bg-primary-lighten">
              {!showCall ? (
                <Container>
                  <Card>
                    <img src='https://sabio-training.s3-us-west-2.amazonaws.com/0494b1b0-c39e-43dd-807e-e2153890587f/hastybigger(1).png' alt=''/>
                  </Card>
                </Container> ) : (
            <Container className="video-background">
              <CallObjectContext.Provider value={callObject}>
                <Call roomUrl={roomData.roomUrl} />
                <Tray
                    isDisabled={!enableCallButtons}
                    onClickLeaveCall={startLeavingCall}
                    />
              </CallObjectContext.Provider>
                </Container> )}
              </Card.Body>
            </Card>            
          </Container>
        </>
    );
};



