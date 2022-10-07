import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {
  fondo = 'https://res.cloudinary.com/dfyevp7g4/image/upload/v1665177884/blackjack/background /fondoReglas.jpg';
  video = 'https://drive.google.com/file/d/117V3PSUD5x-vybR_dQ9Y-LJZ3k6oDLam/preview'; 
  constructor() { }

  ngOnInit(): void {
  }

}
