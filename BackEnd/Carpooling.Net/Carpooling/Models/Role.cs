using System;
using System.Collections.Generic;

namespace Carpooling.Models
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int Rid { get; set; }
        public string Rname { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; }
    }
}
