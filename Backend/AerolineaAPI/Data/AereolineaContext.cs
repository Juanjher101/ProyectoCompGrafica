
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

        //public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Vuelo> Vuelos { get; set; }
    }
}
