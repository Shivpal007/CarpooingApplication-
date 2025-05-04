using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Triphistory
    {
        public int TripId { get; set; }
        public int RideId { get; set; }
        public int? Rating { get; set; }
        public string? Feedback { get; set; }
        public int? BookingId { get; set; }

        public virtual Booking? Booking { get; set; }
        public virtual Ride? Ride { get; set; } = null!;
    }
}
