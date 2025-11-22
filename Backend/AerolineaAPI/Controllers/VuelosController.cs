using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VuelosController : ControllerBase
    {
        private readonly AereolineaContext _context;

        public VuelosController(AereolineaContext context)
        {
            _context = context;
        }

        // ----------------- GET: todos los vuelos -----------------
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vuelo>>> GetVuelos()
        {
            return await _context.Vuelos.ToListAsync();
        }

        // ----------------- GET: vuelo por id -----------------
        [HttpGet("{id}")]
        public async Task<ActionResult<Vuelo>> GetVuelo(int id)
        {
            var vuelo = await _context.Vuelos.FindAsync(id);

            if (vuelo == null)
                return NotFound();

            return vuelo;
        }

        // ----------------- POST: crear nuevo vuelo -----------------
        [HttpPost]
        public async Task<ActionResult<Vuelo>> PostVuelo(Vuelo vuelo)
        {
            _context.Vuelos.Add(vuelo);
            await _context.SaveChangesAsync();

            // Devuelve el vuelo creado con su ID y la ruta GET para consultarlo
            return CreatedAtAction(nameof(GetVuelo), new { id = vuelo.Id }, vuelo);
        }

        // ----------------- PUT: actualizar vuelo -----------------
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVuelo(int id, Vuelo vuelo)
        {
            if (id != vuelo.Id)
                return BadRequest("El ID del vuelo no coincide.");

            _context.Entry(vuelo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VueloExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // ----------------- DELETE: eliminar vuelo -----------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVuelo(int id)
        {
            var vuelo = await _context.Vuelos.FindAsync(id);
            if (vuelo == null)
                return NotFound();

            _context.Vuelos.Remove(vuelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ----------------- Método privado para verificar existencia -----------------
        private bool VueloExists(int id)
        {
            return _context.Vuelos.Any(v => v.Id == id);
        }
    }
}
