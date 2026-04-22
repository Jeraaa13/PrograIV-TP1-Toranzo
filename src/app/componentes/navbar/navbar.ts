import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router) { }

  onRegistroClick() {
    console.log('Registro clicked');
    this.router.navigate(['/registro']);
  }

  onLoginClick() {
    console.log('Login clicked');
    this.router.navigate(['/login']);
  }

}