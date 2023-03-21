using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChatLog
{
    public class MeetingLogEntry
    {
        public DateTime Time { get; set; }
        public DateTime Clienttime { get; set; }
        public string Message { get; set; }
        public string MtgSessionId { get; set; }
        public string UserSessionId { get; set; }
        public string PeerId { get; set; }
        public string DomainName { get; set; }

        #nullable enable
        public int? Level { get; set; }
        public int? Code { get; set; }
        #nullable disable


    }
}
