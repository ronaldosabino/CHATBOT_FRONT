import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './pages/chat/components/chat/chat.component';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RISOFLORAI';
}
