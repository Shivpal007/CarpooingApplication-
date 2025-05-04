using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Booking
    {
        public Booking()
        {
            Payments = new HashSet<Payment>();
            Triphistories = new HashSet<Triphistory>();
        }

        public int BookingId { get; set; }
        public DateTime Bookingdate { get; set; }
        public int RideId { get; set; }
        public int Uid { get; set; }

        public virtual Ride? Ride { get; set; } = null!;
        public virtual User? UidNavigation { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<Triphistory> Triphistories { get; set; }
    }
}
