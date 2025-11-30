using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AerolineaAPI.Models
{
    [Table("Reservas")]
    public class Reserva
    {
        [Key]
        [Column("id_reserva")]
        public int IdReserva { get; set; }

        [Required]
        [Column("id_usuario")]
        public int IdUsuario { get; set; }

        [Required]
        [Column("id_ruta")]
        public string IdRuta { get; set; } = string.Empty;

        [Required]
        [Column("id_horario")]
        public string IdHorario { get; set; } = string.Empty;

        [Required]
        [Column("id_asiento")]
        public int IdAsiento { get; set; }

        [Required]
        [Column("id_tipo_vuelo")]
        public int IdTipoVuelo { get; set; }

        [Column("fecha_compra")]
        public DateTime FechaCompra { get; set; } = DateTime.Now;

        [Column("estado_pago")]
        public bool EstadoPago { get; set; } = true;
    }
}
