import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './componentes/navbar/navbar';
import { Chat } from './componentes/chat/chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
