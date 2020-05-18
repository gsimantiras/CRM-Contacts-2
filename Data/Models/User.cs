using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class User
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Company { get; set; }

        public long ContactInformationId { get; set; }

        public virtual ContactInformation ContactInformation { get; set; }

        public virtual IEnumerable<Address> Addresses { get; set; }


    }
}
