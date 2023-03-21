using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.VideoChat
{
    public class MeetingAddRequest
    {
        public int HostId { get; set; }
        public string DailyId { get; set; }
        public string RoomName { get; set; }
        public int Duration { get; set; }
        public string StartTime { get; set; }
    }
}
