using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoreTeste.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255,ErrorMessage ="Nome da imagem muito grande!")]
        public string FileName { get; set; }
    }
}
