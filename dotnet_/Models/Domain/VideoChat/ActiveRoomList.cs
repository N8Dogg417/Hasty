using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hasty.Models.Domain.VideoChat
{
    public class ActiveRoomList
    {
        public int Total_count { get; set; }
        public List<Room> Data { get; set; }

    }
}
