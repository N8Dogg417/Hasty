using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.VideoChatLogs
{
    public class RoomLogAddRequest
    {
        [Required]
        [StringLength(50)]
        public string RoomName { get; set; }
        [Required]
        [StringLength(255)]
        public string RoomUrl { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int HostId { get; set; }
        [Required]
        [StringLength(50)]
        public string HostName { get; set; }
        [Required]
        [StringLength(255)]
        public string HostToken { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int ParticipantId { get; set; }
        [Required]
        [StringLength(50)]
        public string ParticipantName { get; set; }
        [Required]
        [StringLength(255)]
        public string ParticipantToken { get; set; }

    }
}
