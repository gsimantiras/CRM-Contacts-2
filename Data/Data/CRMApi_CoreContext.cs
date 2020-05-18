using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Data.Models;

namespace Data.Data
{
    public class CRMContactsContext : DbContext
    {
        public CRMContactsContext(DbContextOptions<CRMContactsContext> options)
            : base(options)
        {
            this.Database.EnsureCreated();
        }


        public DbSet<User> Users { get; set; }
        public DbSet<ContactInformation> ContactInformations { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
