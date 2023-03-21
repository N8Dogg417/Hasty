import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = { VideoChatLogUrls: `${API_HOST_PREFIX}/apps/videochat/log` };

const logMeeting = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatLogUrls}/meeting`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const logParticipant = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatLogUrls}/participant`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllMeetingsPaginated = (pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatLogUrls}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMeetingById = (id) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatLogUrls}/meeting/${id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMeetingsCreatedByPaginated = (hostId, pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatLogUrls}/created/${hostId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteLog = (meetingId) => {
  const config = {
    method: 'Delete',
    url: `${endpoint.VideoChatLogUrls}/${meetingId}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addRoomConnectionData = (payload) => {
  const config = {
    method: 'POST',
    url: `${endpoint.VideoChatLogUrls}/roomlog`,
    data: payload,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRoomLogById = (id) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatLogUrls}/roomLog/${id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getRoomLogByUserId = (Userid) => {
  const config = {
    method: 'GET',
    url: `${endpoint.VideoChatLogUrls}/roomlogUser/${Userid}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteRoomConnectionLog = (id) => {
  const config = {
    method: 'Delete',
    url: `${endpoint.VideoChatLogUrls}/roomLog/${id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const messageService = {
  logMeeting,
  logParticipant,
  getAllMeetingsPaginated,
  getMeetingById,
  getMeetingsCreatedByPaginated,
  deleteLog,
  addRoomConnectionData,
  getRoomLogById,
  getRoomLogByUserId,
  deleteRoomConnectionLog,
};
export default messageService;
