import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesComponent } from "./notes/notes.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
