using Microsoft.EntityFrameworkCore;
using MatNotesApi.Models;

namespace MatNotesApi.Data;

public class NotesContext : DbContext
{
    public NotesContext(DbContextOptions<NotesContext> options) : base(options) { }
    public DbSet<Note> Notes { get; set; }
}