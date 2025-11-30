using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Rutas")]
    public class Ruta
    {
        [Key]
        [Column("id_ruta")]
        public string IdRuta { get; set; } = string.Empty;

        [Required]
        [Column("id_origen")]
        public int IdOrigen { get; set; }

        [Required]
        [Column("id_destino")]
        public int IdDestino { get; set; }

        [Required]
        [Column("precio_base")]
        public decimal PrecioBase { get; set; }
    }
}
