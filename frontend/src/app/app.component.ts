import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/ NotesComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
