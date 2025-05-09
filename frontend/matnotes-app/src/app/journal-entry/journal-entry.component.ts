import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JournalService } from '../journal.service';
import { JournalEntry } from '../journal-entry.model';

@Component({
  selector: 'app-journal-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.scss'
})
export class JournalEntryComponent implements OnInit {
  entries: JournalEntry[] = [];
  newEntry: JournalEntry = { date: '', content: '' };
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.journalService.getEntries(this.selectedDate).subscribe({
      next: (data) => (this.entries = data),
      error: (error) => console.error('Error loading entries:', error),
    });
  }

  onSubmit(): void {
    this.newEntry.date = this.selectedDate;
    this.journalService.addEntry(this.newEntry).subscribe({
      next: (response) => {
        this.entries.push(response);
        this.newEntry = { date: '', content: ''};
        this.loadEntries();
      },
      error: (error) => console.error('Error adding entry:', error),
    });
  }
}
