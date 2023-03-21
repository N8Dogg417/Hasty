using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChatLog
{
    public class Log
    {
        public List<MeetingLogEntry> Logs { get; set; }
        public int LogsCount { get; set; }
    }
}
