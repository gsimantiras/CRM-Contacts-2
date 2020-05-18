using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Api_Core.Models.DTOs
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Company { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        public User User
        {
            get
            {
                return new User()
                {
                    Name = this.Name,
                    Title = this.Title,
                    Company = this.Company,
                    ContactInformation = new ContactInformation()
                    {
                        Email = this.Email,
                        PhoneNumber = this.PhoneNumber
                    },
                    Addresses = new List<Address>()
                    {
                        new Address() {
                            Street = this.Street, City = this.City, Country = this.Country, PostalCode = this.PostalCode, StreetNumber = this.StreetNumber
                        }
                    }
                };
            }
        }
    }
}
