using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Vuelos")]
    public class Vuelo
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("nombre_destino")]
        public string NombreDestino { get; set; } = string.Empty;

        [Column("descripcion")]
        public string? Descripcion { get; set; }

        [Column("imagen_url")]
        public string? ImagenUrl { get; set; }

        [Column("destacado")]
        public bool Destacado { get; set; } = false;
    }
}
