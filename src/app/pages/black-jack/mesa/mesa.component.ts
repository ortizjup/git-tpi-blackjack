import { Component, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CrupierComponent } from '../crupier/crupier.component';
import { JugadorComponent } from '../jugador/jugador.component';
import { CartaService } from '../../../services/carta.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  
  cartas!: ICarta[];
  jugadorScore: number = 0;
  @ViewChild(CrupierComponent) crupier!: CrupierComponent;
  @ViewChild(JugadorComponent) jugador!: JugadorComponent;
  private subscription: Subscription = new Subscription();
  
  constructor(private cartaService: CartaService) { }

  ngOnInit(): void {
    this.loadCartas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCartas() : void{
    this.subscription.add(
      this.cartaService.cartaObservable.subscribe({
        next: (results) => { this.cartas = results; console.log(results);},
        error: (error) => {console.log(error)} 
      })
    )
  }

  enviarNuevaCartaJugador() : void {
    let numeroCarta = Math.floor(Math.random() * (36 - 1 + 1) + 1);
    let carta = this.cartas.find(x => x.identificador == numeroCarta) as ICarta;
    this.jugador.setNuevaCarta(carta);
  }

  jugadorSolicitadNuevaCarta(cartasJugador: ICarta[]) : void {
    this.enviarNuevaCartaJugador();
  }

  updateJugadorSecore(score: number) : void{
    this.jugadorScore = score;
    this.checkGrameStatus(this.jugadorScore);
  }
  
  juegadorSeRetiraDelJuego(cartas: ICarta[]) : void {
    swal.fire({
      title: 'Esta seguro?',
      text: "Esta seguro de terminar esta partida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        //TODO: end crupier
        this.checkGrameStatus(this.jugadorScore);
      }
    })
  }

  jugadorStartNewGame(any: any) : void {
    //this.crupier.initializeCrupier();
  }

  checkGrameStatus(score: number) : void {
    if(score > 21){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Perdiste la partida! Superaste los 21 puntos!',
      });
    }

    if(score == 21){
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
