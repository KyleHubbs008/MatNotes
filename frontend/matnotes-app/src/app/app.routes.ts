import { Routes } from '@angular/router';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';

export const routes: Routes = [
  { path: '', component: JournalEntryComponent },
  { path: 'entries', component: JournalEntryComponent },
];
