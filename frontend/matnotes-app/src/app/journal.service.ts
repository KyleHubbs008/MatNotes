import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalEntry } from './journal-entry.model'

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  private apiUrl = 'http://localhost:8000/journal/entries/';

  constructor(private http: HttpClient) { }

  getEntries(date?: string): Observable<JournalEntry[]> {
    let url = this.apiUrl;
    if(date) {
      url += `?date=${date}`;
    }
    return this.http.get<JournalEntry[]>(url);
  }

  addEntry(entry: JournalEntry): Observable<JournalEntry> {
    return this.http.post<JournalEntry>(this.apiUrl, entry);
  }
}
