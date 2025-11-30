namespace AerolineaAPI.DTOs
{
    public class ReservaCreateDTO
    {
        public int IdUsuario { get; set; }
        public required string IdRuta { get; set; }
        public required string IdHorario { get; set; }
        public int IdAsiento { get; set; }
        public int IdTipoVuelo { get; set; }
        public bool EstadoPago { get; set; }
    }
}
