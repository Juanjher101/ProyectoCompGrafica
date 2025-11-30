
using Microsoft.EntityFrameworkCore;
using AerolineaAPI.Models; // Ajusta con tu namespace real

namespace AerolineaAPI.Data
{
    public class AereolineaContext : DbContext
    {
        public AereolineaContext(DbContextOptions<AereolineaContext> options)
            : base(options)
        {
        }

       
        public DbSet<Vuelo> Vuelos { get; set; }
        public DbSet<TipoVuelo> TipoVuelo { get; set; }
        public DbSet<Ruta> Rutas { get; set; }
        public DbSet<Horario> Horarios { get; set; }
        public DbSet<Asiento> Asientos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Reserva> Reservas { get; set; }


    }
}
