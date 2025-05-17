import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.interface'; // Import the interface
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.http.get<Note[]>('https://localhost:5001/api/notes').subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      },
    });
  }

  addNote(): void {
    if (this.newNote.trim()) {
      this.http
        .post(
          'https://localhost:5001/api/notes',
          JSON.stringify(this.newNote),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .subscribe({
          next: () => {
            this.loadNotes();
            this.newNote = '';
          },
          error: (err) => {
            console.error('Error adding note:', err);
          },
        });
    }
  }

  editNote(note: Note): void {
    const updatedContent = prompt('Edit note:', note.content);
    if (updatedContent && updatedContent.trim()) {
      this.http
        .put(
          `https://localhost:5001/api/notes/${note.id}`,
          JSON.stringify(updatedContent),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .subscribe({
          next: () => {
            this.loadNotes();
          },
          error: (err) => {
            console.error('Error updating note:', err);
          },
        });
    }
  }

  deleteNode(id: number): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.http.delete(`https://localhost:5001/api/notes/${id}`).subscribe({
        next: () => {
          this.loadNotes();
        },
        error: (err) => {
          console.error('Error deleting note:', err);
        },
      });
    }
  }
}
