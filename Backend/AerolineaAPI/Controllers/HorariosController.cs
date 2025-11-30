using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorariosController : ControllerBase
    {
        private readonly AereolineaContext _context;
        public HorariosController(AereolineaContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Horario>>> GetHorarios() => await _context.Horarios.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Horario>> GetHorario(string id)
        {
            var h = await _context.Horarios.FindAsync(id);
            if (h == null) return NotFound();
            return h;
        }

        [HttpPost]
        public async Task<ActionResult<Horario>> PostHorario(Horario horario)
        {
            _context.Horarios.Add(horario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetHorario), new { id = horario.IdHorario }, horario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHorario(string id, Horario horario)
        {
            if (id != horario.IdHorario) return BadRequest();

            _context.Entry(horario).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Horarios.Any(h => h.IdHorario == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHorario(string id)
        {
            var horario = await _context.Horarios.FindAsync(id);
            if (horario == null) return NotFound();

            _context.Horarios.Remove(horario);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
