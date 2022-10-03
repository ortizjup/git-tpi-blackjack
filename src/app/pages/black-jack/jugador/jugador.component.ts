import { Output, EventEmitter, Component, OnInit } from '@angular/core';
import { ICarta } from 'src/app/interfaces/i-carta';
import { Subscription } from 'rxjs';
import { CartaService } from '../../../services/carta.service';
import { IJugador } from '../../../interfaces/i-jugador';
import { IswalMessageCommunicationDto } from '../../../interfaces/dtos/iswal-message-communication-dto';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  
  cartasJugador: Array<ICarta> = [];
  score: number = 0;
  private subscription: Subscription = new Subscription();
  @Output() jugadorEventEmitter = new EventEmitter<IJugador>();
  @Output() startNewGameEventEmiter = new EventEmitter<any>();
  @Output() terminarJuegoEventEmitter = new EventEmitter<any>();
  @Output() solictarNuevaCartaEventEmitter = new EventEmitter<any>();
  @Output() swalMessageEventEmitter = new EventEmitter<IswalMessageCommunicationDto>();

  constructor(private cartaService: CartaService) { }

  ngOnInit() : void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  solicitarNuevaCarta(cantidad: number) : void {
    if(this.score > 21){
      this.swalMessageEventEmitter.emit({message: "Las reglas no permiten que solicites mas cartas!", title: "Accion no permitida", icon:"warning"} as IswalMessageCommunicationDto);
      return;
    }

    this.subscription.add(
      this.cartaService.solicitarCartas(cantidad).subscribe({
      next: (results) => { this.setNuevaCarta(results); },
      error: (error) => { this.swalMessageEventEmitter.emit({message: error, title: "Oops...", icon:"error"} as IswalMessageCommunicationDto); }
    }));
  }

  setNuevaCarta(cartas: ICarta[]) : void {
    cartas.forEach(x => {
      this.cartasJugador.push(x);
    });
    this.updateScore();
  }

  updateScore(emitEvent: boolean = true) : void {
    this.score = 0;
    this.cartasJugador.forEach((x) => {
      this.score += x.valores[0];
    });

    if(emitEvent){
      this.jugadorEventEmitter.emit({id: 1, nombre: "Test", apellido: "Test", score: this.score, cartas: this.cartasJugador} as IJugador);
    }
  }

  retirarseDelJuego() : void {
    this.terminarJuegoEventEmitter.emit();
  }

  startNewGame() : void {
    this.startNewGameEventEmiter.emit();
  }

  resetJugador() : void {
    this.cartasJugador = [];
    this.updateScore(false);
  }
}
