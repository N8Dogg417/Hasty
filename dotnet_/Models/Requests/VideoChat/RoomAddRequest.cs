using Sabio.Models.Domain.VideoChat;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.VideoChat
{
    public class RoomAddRequest
    {
        public string Name { get; set; }
        public string Privacy { get; set; }
        public RoomProperties Properties { get; set; }
    }
}
