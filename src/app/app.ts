import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientInfo } from './client-info/client-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client-app');
}
