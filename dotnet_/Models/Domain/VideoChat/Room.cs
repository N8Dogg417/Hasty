using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace hasty.Models.Domain.VideoChat
{
    public class Room
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool ApiCreated { get; set; }
        public string Privacy { get; set; } 
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public RoomProperties Config { get; set; }
    }
}
