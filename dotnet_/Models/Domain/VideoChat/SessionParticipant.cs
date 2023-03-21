using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.VideoChat
{
    public class SessionParticipant
    {
        
        public string User_Id { get; set; }
        public string Participant_Id { get; set; }
        public string User_Name { get; set; }
        public int Join_Time { get; set; }
        public int Duration { get; set; }

    }
}
