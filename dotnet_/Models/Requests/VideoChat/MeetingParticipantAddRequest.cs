using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hasty.Models.Requests.VideoChat
{
    public class MeetingParticipantAddRequest
    {
#nullable enable
        public int? DailyMeetingId { get; set; }
        public int? UserId { get; set; }
        public int Duration { get; set; }
#nullable disable
        public string TimeJoined { get; set; }
    }
}
