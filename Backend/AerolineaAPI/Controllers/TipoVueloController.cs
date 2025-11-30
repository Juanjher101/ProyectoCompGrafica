using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoVueloController : ControllerBase
    {
        private readonly AereolineaContext _context;

        public TipoVueloController(AereolineaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoVuelo>>> GetTipos()
        {
            return await _context.TipoVuelo.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoVuelo>> GetTipo(int id)
        {
            var tipo = await _context.TipoVuelo.FindAsync(id);
            if (tipo == null) return NotFound();
            return tipo;
        }

        [HttpPost]
        public async Task<ActionResult<TipoVuelo>> PostTipo(TipoVuelo tipo)
        {
            _context.TipoVuelo.Add(tipo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTipo), new { id = tipo.Id }, tipo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipo(int id, TipoVuelo tipo)
        {
            if (id != tipo.Id) return BadRequest();

            _context.Entry(tipo).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TipoVuelo.Any(t => t.Id == id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipo(int id)
        {
            var tipo = await _context.TipoVuelo.FindAsync(id);
            if (tipo == null) return NotFound();

            _context.TipoVuelo.Remove(tipo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
