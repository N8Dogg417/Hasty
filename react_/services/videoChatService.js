import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = { VideoChatUrls: `${API_HOST_PREFIX}/apps/videochat` };

const createRoom = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatUrls}/room`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteRoom = (roomName) => {
  const config = {
    method: 'DELETE',
    url: `${endpoint.VideoChatUrls}/room?roomName=${roomName}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getDailyMeetingLogs = (roomName) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatUrls}/meetings?roomName=${roomName}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addMeetingLog = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatUrls}/log/meeting`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addParticipantLog = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatUrls}/log/participant`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRoomToken = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatUrls}/token`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getActiveRoomList = (limit) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatUrls}/active?limit=${limit}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const messageService = {
  createRoom,
  deleteRoom,
  getDailyMeetingLogs,
  addMeetingLog,
  addParticipantLog,
  getRoomToken,
  getActiveRoomList,
};
export default messageService;
