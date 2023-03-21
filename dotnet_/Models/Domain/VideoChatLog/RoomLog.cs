using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChatLog
{
    public class RoomLog
    {
        public string RoomName { get; set; }
        public string RoomUrl { get; set; }
        public int HostId { get; set; }
        public string HostName { get; set; }
        public string HostToken { get; set; }
        public int ParticipantId { get; set; }
        public string ParticipantName { get; set; }
        public string ParticipantToken { get; set; }
        public DateTime DateTimeCreated { get; set; }
        public DateTime DateTimeModified { get; set; }
    }
}
