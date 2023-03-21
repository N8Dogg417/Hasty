using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChat
{
    public class MeetingData
    {
        public string Id { get; set; }
        public string Room { get; set; }
        public int Start_Time { get; set; }
        public int Duration { get; set; }
        public bool Ongoing { get; set; }
        public int Max_Participants { get; set; }
        public List<SessionParticipant> Participants { get; set; }

    }
}
