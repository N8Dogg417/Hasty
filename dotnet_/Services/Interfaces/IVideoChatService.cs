
using Sabio.Models;
using Sabio.Models.Domain.VideoChat;
using Sabio.Models.Domain.VideoChatLog;
using Sabio.Models.Requests.VideoChat;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IVideoChatService
    {
        Task<Room> CreateVideoChatRoom(RoomAddRequest request);
        Task<TokenVideoChat> GetVideoRmToken(TokenAddRequest data);
        Task<HttpResponseMessage> DeleteMeeting(string roomName);
        Task<Log> GetMeetingData(string mtgSessionId);
        Task<Session> GetMeetingDataByRoom(string roomName);
        Task<ActiveRoomList> GetActiveRooms(int limit);


    }
}
