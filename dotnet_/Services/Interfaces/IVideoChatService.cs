
using hasty.Models;
using hasty.Models.Domain.VideoChat;
using hasty.Models.Domain.VideoChatLog;
using hasty.Models.Requests.VideoChat;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace hasty.Services.Interfaces
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
