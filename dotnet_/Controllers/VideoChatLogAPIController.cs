using Microsoft.Extensions.Logging;
using hasty.Services.Interfaces;
using hasty.Services;
using hasty.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using hasty.Models.Requests.VideoChat;
using hasty.Web.Models.Responses;
using System;
using hasty.Models.Domain.VideoChat;
using hasty.Models;
using hasty.Models.Domain.VideoChatLog;
using System.Collections.Generic;
using hasty.Models.Requests.VideoChatLogs;

namespace hasty.Web.Api.Controllers
{
    [ApiController]
    [Route("apps/videochat/log")]

    public class VideoChatLogAPIController : BaseApiController
    {
        private IVideoChatLogService _service = null;
        private IAuthenticationService<int> _authService = null;

        public VideoChatLogAPIController(IVideoChatLogService service,
            ILogger<VideoChatAPIController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region Meeting and Participant Log Calls
        [HttpPost("meeting")]
        public ActionResult<int> LogMeeting(MeetingAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUser().Id;
                int id = _service.AddMeeting(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("meeting/{id:int}")]
        public ActionResult<ItemResponse<Meeting>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Meeting meeting = _service.SelectById(id);

                if (meeting == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Meeting> { Item = meeting };
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
        
        [HttpPost("participant")]
        public ActionResult<int> LogMeetingParticipant(MeetingParticipantAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.AddMeetingParticipant(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<Meeting>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;//do not declare an instance.

            try
            {
                Paged<Meeting> page = _service.GetAllPaginated(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Meeting>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }

        [HttpGet("created/{hostId:int}")]
        public ActionResult<ItemResponse<Meeting>> GetByCreatedBy(int pageIndex, int pageSize, int hostId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Meeting> page = _service.GetByCreatedBy(pageIndex, pageSize, hostId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Meeting>> { Item = page };
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteLog(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteLog(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        } 
        #endregion


        [HttpPost("roomlog")]
        public ActionResult<int> LogRoomData(RoomLogAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUser().Id;
                int id = _service.AddRoomLog(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
        }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("roomlog/{id:int}")]
        public ActionResult<ItemResponse<RoomLog>> GetRoomLogById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                RoomLog roomLog = _service.GetRoomLogById(id);

                if (roomLog == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<RoomLog> { Item = roomLog };
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

        [HttpGet("roomlogUser/{id:int}")]
        public ActionResult<ItemsResponse<RoomLog>> GetRoomLogByUser(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<RoomLog> roomLog = _service.GetRoomLogByUserId(id);

                if (roomLog == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<RoomLog> { Items = roomLog };
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

        [HttpDelete("roomlog/{id:int}")]
        public ActionResult<SuccessResponse> DeleteRoomLog(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteRoomConnectionLog(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


    }
        
}
