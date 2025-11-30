using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Horarios")]
    public class Horario
    {
        [Key]
        [Column("id_horario")]
        public string IdHorario { get; set; } = string.Empty;

        [Required]
        [Column("id_ruta")]
        public string IdRuta { get; set; }

        [Required]
        [Column("hora_salida")]
        public TimeSpan HoraSalida { get; set; }

        [Required]
        [Column("hora_llegada")]
        public TimeSpan HoraLlegada { get; set; }

        [Required]
        [Column("asientos_disponibles")]
        public int AsientosDisponibles { get; set; }
    }
}
