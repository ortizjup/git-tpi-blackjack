import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  getNumberoCarta() : number {
    return Math.floor(Math.random() * (1 - 43 + 1) + 1);
  }
}
