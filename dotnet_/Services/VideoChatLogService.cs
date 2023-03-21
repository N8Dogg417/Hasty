using Sabio.Models.Domain.VideoChat;
using Sabio.Models.Requests.VideoChat;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Sabio.Services.Interfaces;
using Microsoft.Extensions.Options;
using Sabio.Data.Providers;
using Sabio.Models.AppSettings;
using System.Net.Http;
using Sabio.Data;
using Sabio.Models.Domain.VideoChatLog;
using Sabio.Models.Requests.VideoChatLogs;

namespace Sabio.Services
{
    public class VideoChatLogService : IVideoChatLogService
    {
        private readonly HttpClient _httpClient;
        private AppKeys _appKeys;
        IDataProvider _data = null;

        public VideoChatLogService(IOptions<AppKeys> appKeys,
            IDataProvider data)
        {
            _appKeys = appKeys.Value;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.daily.co/v1/");
            _data = data;
        }

        #region Meeting and Participant Logs
        public int AddMeeting(MeetingAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[DailyMeetings_Insert]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddMeetingParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                    col.AddWithValue("@HostId", userId);

                }
                , returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });
            return id;
        }
        public void AddMeetingParticipant(MeetingParticipantAddRequest model)
        {

            string procName = "[dbo].[DailyMeetingParticipants_Insert]";

            _data.ExecuteNonQuery(procName
               , inputParamMapper: delegate (SqlParameterCollection col)
               {

                   AddParticipantParams(model, col);
               }
               , returnParameters: null);
        }
        public Paged<Meeting> GetAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Meeting> pagedResult = null;

            List<Meeting> result = null;

            int totalCount = 0;

            string procName = "[dbo].[DailyMeetings_SelectAll_Paginated]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    Meeting model = MapMeeting(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }


                    if (result == null)
                    {
                        result = new List<Meeting>();
                    }

                    result.Add(model);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Meeting>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public Paged<Meeting> GetByCreatedBy(int pageIndex, int pageSize, int hostId)
        {
            Paged<Meeting> pagedResult = null;
            List<Meeting> result = null;

            int totalCount = 0;

            string procName = "[dbo].[DailyMeetings_SelectByCreatedBy_Paginated]";

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@HostId", hostId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {

                    int index = 0;

                    Meeting model = MapMeeting(reader, ref index);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index);
                    }


                    if (result == null)
                    {
                        result = new List<Meeting>();
                    }

                    result.Add(model);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<Meeting>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public Meeting SelectById(int id)
        {
            string procName = "[dbo].[DailyMeetings_Select_ById]";

            Meeting aMeeting = null;

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    aMeeting = MapMeeting(reader, ref index);
                });
            return aMeeting;
        }
        public void DeleteLog(int id)
        {
            string procName = "[dbo].[DailyMeetings_Delete_ById]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }
                , returnParameters: null);
        }

        #endregion


        #region Room Logs for Room Creation
        public int AddRoomLog(RoomLogAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[DailyRooms_Insert]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddRoomLogParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }
                , returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });
            return id;
        }
        public RoomLog GetRoomLogById(int id)
        {
            string procName = "[dbo].[DailyRooms_SelectById]";

            RoomLog aLog = null;

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    aLog = MapSingleLog(reader);

                });
            return aLog;
        }
        public List<RoomLog> GetRoomLogByUserId(int id)
        {
            List<RoomLog> roomList = null;

            string procName = "[dbo].[DailyRooms_SelectByUserId]";

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@UserId", id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    RoomLog aFriend = MapSingleLog(reader);

                    if (roomList == null)
                    {
                        roomList = new List<RoomLog>();
                    }

                    roomList.Add(aFriend);

                });
            return roomList;
        }
        public void DeleteRoomConnectionLog(int id)
        {
            string procName = "[dbo].[DailyRooms_Delete]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }
                , returnParameters: null);
        }
        #endregion


        #region Private Meeting Mappers


        private static void AddMeetingParams(MeetingAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@DailyId", model.DailyId);
            col.AddWithValue("@RoomName", model.RoomName);
            col.AddWithValue("@Duration", model.Duration);
            col.AddWithValue("@StartTime", model.StartTime);

        }
        private static void AddParticipantParams(MeetingParticipantAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@DailyMeetingId", model.DailyMeetingId);
            col.AddWithValue("@UserId", model.UserId);
            col.AddWithValue("@Duration", model.Duration);
            col.AddWithValue("@TimeJoined", model.TimeJoined);

        }

        private static Meeting MapMeeting(IDataReader reader, ref int index)
        {
            Meeting aMeeting = new Meeting();
            aMeeting.Participants = new List<Participant>();

            aMeeting.Id = reader.GetSafeInt32(index++);
            aMeeting.DailyId = reader.GetSafeString(index++);
            aMeeting.HostId = reader.GetInt32(index++);
            aMeeting.RoomName = reader.GetString(index++);
            aMeeting.StartTime = reader.GetSafeDateTime(index++);
            aMeeting.Duration = reader.GetInt32(index++);
            aMeeting.Participants = reader.DeserializeObject<List<Participant>>(index++);

            return aMeeting;
        }

        #endregion


        #region Private ROOM LOG Mappers

        private static void AddRoomLogParams(RoomLogAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@RoomName", model.RoomName);
            col.AddWithValue("@RoomUrl", model.RoomUrl);
            col.AddWithValue("@HostId", model.HostId);
            col.AddWithValue("@HostName", model.HostName);
            col.AddWithValue("@HostToken", model.HostToken);
            col.AddWithValue("@ParticipantId", model.ParticipantId);
            col.AddWithValue("@ParticipantName", model.ParticipantName);
            col.AddWithValue("@ParticipantToken", model.ParticipantId);

        }
        private static RoomLog MapSingleLog(IDataReader reader)
        {
            RoomLog aLog = new RoomLog();
            int startingIndex = 0;

            aLog.RoomName = reader.GetSafeString(startingIndex++);
            aLog.RoomUrl = reader.GetSafeString(startingIndex++);
            aLog.HostId = reader.GetInt32(startingIndex++);
            aLog.HostName = reader.GetSafeString(startingIndex++);
            aLog.HostToken = reader.GetSafeString(startingIndex++);
            aLog.ParticipantId = reader.GetSafeInt32(startingIndex++);
            aLog.ParticipantName = reader.GetSafeString(startingIndex++);
            aLog.ParticipantToken = reader.GetSafeString(startingIndex++);
            aLog.DateTimeCreated = reader.GetSafeDateTime(startingIndex++);
            aLog.DateTimeModified = reader.GetSafeDateTime(startingIndex++);

            return aLog;
        }
        #endregion
    }
}
