using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Vuelos")]  // <-- Importante: indica el nombre de la tabla
    public class Vuelo
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]  // corresponde a NOT NULL
        [Column("nombre_destino")]
        public string NombreDestino { get; set; } = string.Empty;

        [Column("descripcion")]
        public string? Descripcion { get; set; }  // puede ser NULL

        [Column("imagen_url")]
        public string? ImagenUrl { get; set; }  // puede ser NULL

        [Column("destacado")]
        public bool Destacado { get; set; }  // bit -> bool
    }
}
