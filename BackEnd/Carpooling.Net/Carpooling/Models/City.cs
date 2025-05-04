using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class City
    {
        public City()
        {
            RideDestinationCityNavigations = new HashSet<Ride>();
            RideSourceCityNavigations = new HashSet<Ride>();
        }

        public int CityId { get; set; }
        public string? Cityname { get; set; }

        public virtual ICollection<Ride> RideDestinationCityNavigations { get; set; }
        public virtual ICollection<Ride> RideSourceCityNavigations { get; set; }
    }
}
