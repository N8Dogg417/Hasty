using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChat
{
    public class Meeting
    {
        public int Id { get; set; }
        public string DailyId { get; set; }
        public int HostId { get; set; }
        public string RoomName { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public List<Participant> Participants { get; set; }
    }
}
