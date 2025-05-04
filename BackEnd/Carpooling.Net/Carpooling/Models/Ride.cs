using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Ride
    {
        public Ride()
        {
            Bookings = new HashSet<Booking>();
            Triphistories = new HashSet<Triphistory>();
        }

        public int RideId { get; set; }
        public int DriverId { get; set; }
        public int SourceCity { get; set; }
        public int DestinationCity { get; set; }
        public float Fare { get; set; }
        public int Noseat { get; set; }
        public DateTime Ridedate { get; set; }
        public DateTime RideComplete { get; set; }
        public string? Status { get; set; } = null!;

        public virtual City? DestinationCityNavigation { get; set; } = null!;
        public virtual Driver? Driver { get; set; } = null!;
        public virtual City? SourceCityNavigation { get; set; } = null!;
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<Triphistory> Triphistories { get; set; }
    }
}
