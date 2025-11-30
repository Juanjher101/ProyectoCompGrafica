using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Asientos")]
    public class Asiento
    {
        [Key]
        [Column("id_asiento")]
        public int IdAsiento { get; set; }

        [Required]
        [Column("id_horario")]
        public string IdHorario { get; set; } = string.Empty;

        [Required]
        [Column("fila")]
        public string Fila { get; set; } = string.Empty;

        [Required]
        [Column("columna")]
        public int Columna { get; set; }

        [Required]
        [Column("tipo_asiento")]
        public string TipoAsiento { get; set; } = string.Empty;

        [Required]
        [Column("precio_adicional")]
        public decimal PrecioAdicional { get; set; }

        [Required]
        [Column("estado")]
        public bool Estado { get; set; }   // false = disponible, true = ocupado

        // FK a Horarios
        [ForeignKey("IdHorario")]
        public Horario? Horario { get; set; }
    }
}
