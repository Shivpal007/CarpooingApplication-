using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class User
    {
        public User()
        {
            Bookings = new HashSet<Booking>();
            Drivers = new HashSet<Driver>();
        }

        public int Uid { get; set; }
        public string Name { get; set; } = null!;
        public string Contactno { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime Dob { get; set; }
        public string Password { get; set; } = null!;
        public string Address { get; set; } = null!;
        public int Rid { get; set; }

        public virtual Role? RidNavigation { get; set; } = null!;
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Driver> Drivers { get; set; }
    }
}
