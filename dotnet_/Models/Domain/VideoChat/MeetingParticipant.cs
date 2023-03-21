using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChat
{
    public class MeetingParticipant
    {
        public int DailyMeetingId { get; set; }
        public int UserId { get; set; }
        public int Duration { get; set; }
        public DateTime TimeJoined { get; set; }

    }
}
