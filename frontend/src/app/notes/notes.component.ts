import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.interface'; // Import the interface

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
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
}
