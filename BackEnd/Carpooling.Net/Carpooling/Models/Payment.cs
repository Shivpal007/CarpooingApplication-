using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public int BookingId { get; set; }
        public string Status { get; set; } = null!;

        public virtual Booking Booking { get; set; } = null!;
    }
}
