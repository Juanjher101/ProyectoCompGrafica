using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsientosController : ControllerBase
    {
        private readonly AereolineaContext _context;

        public AsientosController(AereolineaContext context)
        {
            _context = context;
        }

        // GET: api/Asientos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asiento>>> GetAsientos()
        {
            return await _context.Asientos.ToListAsync();
        }

        // GET: api/Asientos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asiento>> GetAsiento(int id)
        {
            var asiento = await _context.Asientos.FindAsync(id);

            if (asiento == null)
                return NotFound();

            return asiento;
        }

        // GET: api/Asientos/horario/ABC01
        [HttpGet("horario/{idHorario}")]
        public async Task<ActionResult<IEnumerable<Asiento>>> GetAsientosPorHorario(string idHorario)
        {
            var lista = await _context.Asientos
                        .Where(a => a.IdHorario == idHorario)
                        .ToListAsync();

            if (lista == null || lista.Count == 0)
                return NotFound();

            return lista;
        }

        // POST: api/Asientos
        [HttpPost]
        public async Task<ActionResult<Asiento>> PostAsiento(Asiento asiento)
        {
            _context.Asientos.Add(asiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAsiento), new { id = asiento.IdAsiento }, asiento);
        }

        // PUT: api/Asientos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsiento(int id, Asiento asiento)
        {
            if (id != asiento.IdAsiento)
                return BadRequest();

            _context.Entry(asiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Asientos.Any(a => a.IdAsiento == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Asientos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsiento(int id)
        {
            var asiento = await _context.Asientos.FindAsync(id);
            if (asiento == null)
                return NotFound();

            _context.Asientos.Remove(asiento);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
