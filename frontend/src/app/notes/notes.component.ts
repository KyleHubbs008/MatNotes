import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: string[] = [];
  newNote: string = '';

  addNote() {
    if(this.newNote.trim()) {
      this.notes.push(this.newNote);
      this.newNote = '';
    }
  }
}
