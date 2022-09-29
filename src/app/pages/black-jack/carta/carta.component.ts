import { Component, Input, OnInit } from '@angular/core';
import { ICarta } from '../../../interfaces/i-carta';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  @Input() carta: ICarta = {} as ICarta;
  pathImagenCarta: string =  "";

  constructor() { }

  ngOnInit(): void {
    this.pathImagenCarta =   `../../../../assets/img/cards/${this.carta.id}${this.carta.categoria.codigo}`;
  }
}
