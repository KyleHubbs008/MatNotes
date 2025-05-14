using Microsoft.AspNetCore.Mvc;
using MatNotesApi.Data;
using MatNotesApi.Models;

namespace MatNotesApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class NotesController : ControllerBase
	{
		private readonly NotesContext _context;

        public NotesController(NotesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            return Ok(_context.Notes.ToList());
        }

        [HttpPost]
        public IActionResult AddNote([FromBody] string content)
        {
            if (string.IsNullOrEmpty(content))
            {
                return BadRequest("Content is required.");
            }

            var note = new Note
            {
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notes.Add(note);
            _context.SaveChanges();

            return Ok(new { message = "Note added", note});
        }
	}
}
