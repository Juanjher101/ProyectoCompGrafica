using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RutasController : ControllerBase
    {
        private readonly AereolineaContext _context;

        public RutasController(AereolineaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ruta>>> GetRutas()
        {
            return await _context.Rutas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ruta>> GetRuta(string id)
        {
            var ruta = await _context.Rutas.FindAsync(id);
            if (ruta == null) return NotFound();
            return ruta;
        }

        [HttpPost]
        public async Task<ActionResult<Ruta>> PostRuta(Ruta ruta)
        {
            _context.Rutas.Add(ruta);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRuta), new { id = ruta.IdRuta }, ruta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRuta(string id, Ruta ruta)
        {
            if (id != ruta.IdRuta) return BadRequest();

            _context.Entry(ruta).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Rutas.Any(r => r.IdRuta == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRuta(string id)
        {
            var ruta = await _context.Rutas.FindAsync(id);
            if (ruta == null) return NotFound();

            _context.Rutas.Remove(ruta);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        // GET: api/Rutas/BuscarRuta?idOrigen=1&idDestino=2
        [HttpGet("BuscarRuta")]
        public async Task<ActionResult<Ruta>> BuscarRuta([FromQuery] int idOrigen, [FromQuery] int idDestino)
        {
            var ruta = await _context.Rutas
                .FirstOrDefaultAsync(r => r.IdOrigen == idOrigen && r.IdDestino == idDestino);

            if (ruta == null)
                return NotFound(new { mensaje = "No se encontró ruta para este origen y destino." });

            return ruta;
        }
    }
}
