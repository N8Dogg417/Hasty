using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain.VideoChat;
using Sabio.Models.Domain.VideoChatLog;
using Sabio.Models.Requests.VideoChat;
using Sabio.Services.Interfaces;
using sib_api_v3_sdk.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Text;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class VideoChatService : IVideoChatService
    {
        private readonly HttpClient _httpClient;
        private AppKeys _appKeys;
        IDataProvider _data = null;

        public VideoChatService(IOptions<AppKeys> appKeys,
            IDataProvider data)
        {
            _appKeys = appKeys.Value;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.daily.co/v1/");
            _data = data;
        }

        public async Task<Room> CreateVideoChatRoom(RoomAddRequest model)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                string uri = "rooms/";
                

                var body = new
                {
                    name = model.Name,
                    privacy = model.Privacy,
                    properties = new
                    {
                        start_audio_off = model.Properties.StartAudioOff,
                        start_video_off = model.Properties.StartVideoOff,
                        enable_chat = model.Properties.EnableChat,
                        exp = model.Properties.Exp,
                    }
                };

                var response = await _httpClient.PostAsJsonAsync(uri, body);
                var result = await response.Content.ReadAsStringAsync();
                var resultJson = JsonConvert.DeserializeObject<Room>(result);

                return resultJson;
            }
            catch (Exception ex)
            {
                throw new Exception("Create Video chat Room Failed", ex);
            }
        }

        public async Task<TokenVideoChat> GetVideoRmToken(TokenAddRequest model)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                string uri = "meeting-tokens/";


                var body = new
                {
                    properties = new
                    {
                        room_name = model.Properties.RoomName,
                        user_name = model.Properties.UserName,
                        user_id = model.Properties.UserId,
                        enable_screenshare = model.Properties.EnableScreenShare,
                        start_video_off = model.Properties.StartVideoOff,
                        start_audio_off = model.Properties.StartAudioOff,
                    }
                };

                var response = await _httpClient.PostAsJsonAsync(uri, body);
                var result = await response.Content.ReadAsStringAsync();
                var resultJson = JsonConvert.DeserializeObject<TokenVideoChat>(result);

                return resultJson;
            }
            catch (Exception ex)
            {
                throw new Exception("Create Video chat Room Failed", ex);
            }
        }

        public async Task<Log> GetMeetingData(string mtgSessionId)
        {
            try
            {
                var responseObject = new Log();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                var fullUrl = $"logs?mtgSessionId={mtgSessionId}&includeMetrics=0&includeLogs=1";

                var response = await _httpClient.GetAsync(fullUrl);

                var content = await response.Content.ReadAsStringAsync();
                responseObject = JsonConvert.DeserializeObject<Log>(content);

                return responseObject;
            }
            catch (Exception ex)
            {
                throw new Exception("Get Meeting Data Failed", ex);
            }
        }

        public async Task<Session> GetMeetingDataByRoom(string roomName)
        {
            try
            {
                var responseObject = new Session();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                var fullUrl = $"meetings?room={roomName}";

                var response = await _httpClient.GetAsync(fullUrl);

                if (response.IsSuccessStatusCode)
                {
                    var jsonContent = await response.Content.ReadAsStringAsync();
                    var meetingData = JsonConvert.DeserializeObject<Session>(jsonContent);

                    return meetingData;
                }
                else
                {
                    var errorMessage = $"Failed to get meeting data for room {roomName}. HTTP status code: {response.StatusCode}";
                    throw new Exception(errorMessage);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Get Meeting Room Data Failed", ex);
            }
        }

        public async Task<ActiveRoomList> GetActiveRooms(int limit)
        {
            try
            {
                var responseObject = new ActiveRoomList();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                var fullUrl = $"rooms?limit={limit}";

                var response = await _httpClient.GetAsync(fullUrl);

                var content = await response.Content.ReadAsStringAsync();
                responseObject = JsonConvert.DeserializeObject<ActiveRoomList>(content);

                return responseObject;
            }
            catch (Exception ex)
            {
                throw new Exception("Get Meeting Data Failed", ex);
            }
        }

        public async Task<HttpResponseMessage> DeleteMeeting(string roomName)
        {
            try
            {
                var responseObject = new Log();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _appKeys.DailyVideoChatApiKey);
                var fullUrl = $"rooms/{roomName}";
                var response = await _httpClient.DeleteAsync(fullUrl);

                return response;

            }
            catch (Exception ex)
            {
                throw new Exception("Unable to retrieve Active Room List", ex);
            }
        }

    }
}
