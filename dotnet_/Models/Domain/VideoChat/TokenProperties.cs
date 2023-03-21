using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChat
{
    public class TokenProperties
    {
        public string RoomName { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public bool EnableScreenShare { get; set; }
        public bool StartVideoOff { get; set; }
        public bool StartAudioOff { get; set; }
            
    }
}
