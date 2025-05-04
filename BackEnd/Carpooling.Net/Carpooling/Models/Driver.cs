using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Driver
    {
        public Driver()
        {
            Rides = new HashSet<Ride>();
        }

        public int DriverId { get; set; }
        public string DrivingLicence { get; set; } = null!;
        public int Age { get; set; }
        public int Uid { get; set; }
        public string VehicleInfo { get; set; } = null!;
        public string? Status { get; set; } = null!;

        public virtual User? UidNavigation { get; set; } = null!;
        public virtual ICollection<Ride> Rides { get; set; }
    }
}
