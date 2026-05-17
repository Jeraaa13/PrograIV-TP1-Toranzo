import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-quiensoy',
  imports: [],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class Quiensoy implements OnInit {                                                                                                                                                                                                                                              
  datos = signal<any>(null);

  constructor(private http: HttpClient) {

  }
  
  ngOnInit(): void {
    this.http.get('https://api.github.com/users/Jeraaa13').subscribe(data => {
      this.datos.set(data);                                                                                                                                                                                                                                                            
    });
  }                                                                                                                                                                                                                                                                                    
}
