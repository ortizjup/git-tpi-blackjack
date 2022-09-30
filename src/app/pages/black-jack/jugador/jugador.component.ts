import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CartaService } from '../../../services/carta.service';


@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  
  cartasJugador: Array<ICarta> = [];
  score: number = 0;
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
  }

  updateScore() : void {
    this.score = 0;
    this.cartasJugador.forEach((x) => {
      this.score += x.valores[0];
    });
  }

  

  solicitarNuevaCarta() : void{
    this.solicitarCartaEventEmitter.emit(this.cartasJugador);
  }

  retirarseDelJuego() : void {
    this.terminarJuegoEventEmitter.emit(this.cartasJugador);
  }

  startNewGame() : void {
    this.starNetGameEventEmimitter.emit();
  }
}
