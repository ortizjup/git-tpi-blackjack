import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CartaService } from '../../../services/carta.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  
  cartasJugador: Array<ICarta> = [];
  juegoSeparado: Array<ICarta> = [];
  score: number = 0;
  juegoIniciado: boolean = false;


  @Output() solicitarCartaEventEmitter = new EventEmitter<ICarta[]>();
  @Output() terminarJuegoEventEmitter = new EventEmitter<ICarta[]>();
  @Output() checkGameStatusEventEmitter = new EventEmitter<number>();
  @Output() starNetGameEventEmimitter = new EventEmitter<any>();

  constructor(private cartaService: CartaService) { }

  ngOnInit() : void {

  }

  ngOnDestroy(): void {
   
  }

  setNuevaCarta(carta: ICarta) : void {
    this.cartasJugador.push(carta);
    this.updateScore();
    this.checkGameStatusEventEmitter.emit(this.score);
    this.estadoJuego();
  }

  updateScore() : void {
    this.score = 0;
    this.cartasJugador.forEach((x) => {
      this.score += x.valores[0];
    });
  }

  estadoJuego() : void {
    if(this.cartasJugador.length > 0){
      this.juegoIniciado = true;
    }
  } 
  
  separarJuego(): void {
    if(this.cartasJugador[0].numero === this.cartasJugador[1].numero){
      swal.fire({
        title: 'Esta seguro?',
        text: "¿Esta seguro de separar las jugadas?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.juegoSeparado.push(this.cartasJugador[1])
          this.cartasJugador.splice(1 , 1)
        }
      })
    }
  }

  solicitarNuevaCarta(juego: String) : void{
    if(juego === ''){
      this.solicitarCartaEventEmitter.emit(this.cartasJugador);
    } else {
      this.solicitarCartaEventEmitter.emit(this.juegoSeparado);
    }
  }

  retirarseDelJuego() : void {
    this.terminarJuegoEventEmitter.emit(this.cartasJugador);
  }

  startNewGame() : void {
    this.starNetGameEventEmimitter.emit();
  }
}
