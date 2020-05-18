using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class ContactInformation
    {
        public long Id { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }

    }
}
