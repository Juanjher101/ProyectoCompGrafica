using AerolineaAPI.Data;
using AerolineaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AerolineaAPI.DTOs;

namespace ProyectoAereolinea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservasController : ControllerBase
    {
        private readonly AereolineaContext _context;

        public ReservasController(AereolineaContext context)
        {
            _context = context;
        }

        // GET: api/Reservas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservas()
        {
            return await _context.Reservas.ToListAsync();
        }

        // GET: api/Reservas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> GetReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            return reserva;
        }

        // POST: api/Reservas
        [HttpPost]
        public async Task<ActionResult<Reserva>> PostReserva(ReservaCreateDTO dto)
        {
            var reserva = new Reserva
            {
                IdUsuario = dto.IdUsuario,
                IdRuta = dto.IdRuta,
                IdHorario = dto.IdHorario,
                IdAsiento = dto.IdAsiento,
                IdTipoVuelo = dto.IdTipoVuelo,
                EstadoPago = dto.EstadoPago,
                FechaCompra = DateTime.Now
            };

            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReserva), new { id = reserva.IdReserva }, reserva);
        }

        // PUT: api/Reservas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReserva(int id, Reserva reserva)
        {
            if (id != reserva.IdReserva)
                return BadRequest();

            _context.Entry(reserva).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Reservas.Any(r => r.IdReserva == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Reservas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);

            if (reserva == null)
                return NotFound();

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // LISTAR RESERVAS DE UN USUARIO
        // GET: api/Reservas/PorUsuario/3
        [HttpGet("PorUsuario/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<Reserva>>> GetReservasPorUsuario(int idUsuario)
        {
            var reservas = await _context.Reservas
                .Where(r => r.IdUsuario == idUsuario)
                .ToListAsync();

            if (reservas.Count == 0)
                return NotFound();

            return reservas;
        }
    }
}
