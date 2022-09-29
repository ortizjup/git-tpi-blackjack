import { Component, OnInit } from '@angular/core';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CartaService } from '../../../services/carta.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crupier',
  templateUrl: './crupier.component.html',
  styleUrls: ['./crupier.component.css']
})
export class CrupierComponent implements OnInit {

  cartasCrupier: Array<ICarta> = [];
  score: number = 0;
  constructor(private cartaService:CartaService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  initializeCrupier(carta: ICarta) : void {
    this.cartasCrupier.push(carta);
    this.updateScore();   
    this.checkGrameStatus(); 
  }

  updateScore() : void {
    this.cartasCrupier.forEach((x) => {
      this.score += x.valores[0];
    });
  }

  setNuevaCarta(carta: ICarta) : void{
    console.log(carta);
  }

  checkGrameStatus() : void {
    if(this.score > 21){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Perdiste la partida! Superaste los 21 puntos!',
      });
    }

    if(this.score == 21){
      swal.fire({
        icon: 'success',
        title: 'Black Jack!',
        text: 'Ganaste la partida...',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
