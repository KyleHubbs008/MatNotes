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

            return Ok(new { message = "Note added", note });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, [FromBody] string content)
        {
            var note = _context.Notes.Find(id);
            if (note == null)
            {
                return NotFound(new { message = "Note not found." });
            }

            if (string.IsNullOrEmpty(content))
            {
                return BadRequest(new { message = "Content is required." });
            }

            note.Content = content;
            _context.SaveChanges();

            return Ok(new { message = "Note updated.", note });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = _context.Notes.Find(id);
            if (note == null)
            {
                return NotFound(new { message = "Note not found." });
            }

            _context.Notes.Remove(note);
            _context.SaveChanges();

            return Ok(new { message = "Note deleted." });
        }
	}
}
