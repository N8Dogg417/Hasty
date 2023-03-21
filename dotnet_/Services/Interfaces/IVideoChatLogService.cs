using Sabio.Models.Domain.VideoChat;
using Sabio.Models.Requests.VideoChat;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Sabio.Models.Requests.VideoChatLogs;
using Sabio.Models.Domain.VideoChatLog;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Sabio.Services.Interfaces
{
    public interface IVideoChatLogService
    {
        int AddMeeting(MeetingAddRequest model, int userId);
        void AddMeetingParticipant(MeetingParticipantAddRequest model);
        Paged<Meeting> GetAllPaginated(int page, int pageSize);
        Paged<Meeting> GetByCreatedBy(int pageIndex, int pageSize, int createdBy);
        Meeting SelectById(int id);
        void DeleteLog(int id);
        
        int AddRoomLog(RoomLogAddRequest model, int userId);
        RoomLog GetRoomLogById(int id);
        List<RoomLog> GetRoomLogByUserId(int id);
        void DeleteRoomConnectionLog(int id);


    }
}
