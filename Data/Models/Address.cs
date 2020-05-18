using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Address
    {
        public long Id { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string StreetNumber { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string PostalCode { get; set; }
        
        public long UserId { get; set; }

    }
}
