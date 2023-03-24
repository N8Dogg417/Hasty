using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using hasty.Models.Requests.VideoChat;
using hasty.Web.Controllers;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.Extensions.Logging;
using hasty.Web.Models.Responses;
using Stripe;
using hasty.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using hasty.Services;
using hasty.Models.Domain.VideoChat;
using hasty.Models.Requests;
using System.Xml.Linq;
using hasty.Data.Providers;
using hasty.Models;
using System.Drawing.Printing;
using hasty.Models.Domain.VideoChatLog;
using System.Collections.Generic;

namespace hasty.Web.Api.Controllers
{
    [ApiController]
    [Route("apps/videochat/")]
    public class VideoChatAPIController : BaseApiController
    {
        private IVideoChatService _service = null;
        private IAuthenticationService<int> _authService = null;

        public VideoChatAPIController(IVideoChatService service,
            ILogger<VideoChatAPIController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost("room")]
        public ActionResult<ItemResponse<Room>> CreateVideoChatRoom(RoomAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Task<Room> aRoom = _service.CreateVideoChatRoom(model);

                if (aRoom == null)
                {
                    code = 404;
                    response = new ErrorResponse("Room not created");
                }
                else
                {
                    response = new ItemResponse<Task<Room>>() { Item = aRoom };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("log/meeting")]
        public ActionResult<ItemResponse<Log>> GetMeetingById(string mtgSessionId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Log aLog = _service.GetMeetingData(mtgSessionId).Result;

                if (aLog == null)
                {
                    code = 404;
                    response = new ErrorResponse("Meeting Data not collected");
                }
                else
                {
                    response = new ItemResponse<Log>() { Item = aLog };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPost("token")]
        public ActionResult<ItemResponse<TokenVideoChat>> GetToken(TokenAddRequest data) { 
            int code = 200;
            BaseResponse response = null;

            try
            {
                TokenVideoChat aToken = _service.GetVideoRmToken(data).Result;

                if (aToken == null)
                {
                    code = 404;
                    response = new ErrorResponse("Meeting Data not collected");
                }
                else
                {
                    response = new ItemResponse<TokenVideoChat>() { Item = aToken };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpDelete("room")]
        public ActionResult<SuccessResponse> Delete(string roomName)
        {
            int code = 200;
            BaseResponse response = null;//do not declare an instance.

            try
            {
                _service.DeleteMeeting(roomName);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("meetings")]
        public ActionResult<ItemResponse<Session>> GetMeetingByRoomName(string roomName)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Session aSession = _service.GetMeetingDataByRoom (roomName).Result;

                if (aSession == null)
                {
                    code = 404;
                    response = new ErrorResponse("Meeting data not collected");
                }
                else
                {
                    response = new ItemResponse<Session>() { Item = aSession };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("active")]
        public ActionResult<ItemResponse<ActiveRoomList>> GetActiveRooms(int limit)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                ActiveRoomList activeRooms = _service.GetActiveRooms(limit).Result;

                if (activeRooms == null)
                {
                    code = 404;
                    response = new ErrorResponse("Meeting data not collected");
                }
                else
                {
                    response = new ItemResponse<ActiveRoomList>() { Item = activeRooms };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

    }

}

