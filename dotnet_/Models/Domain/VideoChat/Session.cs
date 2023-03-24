using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hasty.Models.Domain.VideoChat
{
    public class Session
    {
        public int Total_Count { get; set; }
        public List<MeetingData> Data { get; set; }
    }
}
