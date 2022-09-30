import { Component, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CrupierComponent } from '../crupier/crupier.component';
import { JugadorComponent } from '../jugador/jugador.component';
import { CartaService } from '../../../services/carta.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  fondo = '../../../../assets/img/background/Pano-transformedd.jpg';

  cartas!: ICarta[];
  jugadorScore: number = 0;
  jugadorEstado: string = "activo";

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
    if(this.jugadorScore >= 21 || this.jugadorEstado == "inactivo" ){
      Swal.fire({
        icon: 'error',
        title: 'IMPOSIBLE',
        text: 'Las reglas no permiten que solicites mas cartas!',
      })                                                                                                                        
    } else if (this.jugadorScore === 0){                                                      
      this.enviarNuevaCartaJugador();
      this.enviarNuevaCartaJugador();
      this.jugador.separarJuego();
    } else {
      this.enviarNuevaCartaJugador();
    }
  }

  updateJugadorSecore(score: number) : void{
    this.jugadorScore = score;
    this.checkGrameStatus(this.jugadorScore);
  }
  
  juegadorSeRetiraDelJuego(cartas: ICarta[]) : void {
    if(this.jugadorScore == 0){
      Swal.fire({
        icon: 'error',
        title: '¿MIEDO?',
        text: 'Aun no tienes ninguna carta!',
      })   
    } else{
      swal.fire({
        title: 'Esta seguro?',
        text: "¿Esta seguro de retirarse de esta partida?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO: end crupier
          this.jugadorEstado = "inactivo";
          this.checkGrameStatus(this.jugadorScore);
        }
      })
    }
  }

  jugadorStartNewGame(any: any) : void {
    window.location.reload();  //esto es momentaneo en segunda entrega pide algo (no me quiero extender)
                               // que no permite que hagamos esta gronchada
    //this.jugadorScore = 0;
    //this.jugadorEstado="activo";
    //this.cartas = [];

    //this.crupier.initializeCrupier();
  }

  checkGrameStatus(score: number) : void {
    if(score > 21){
      swal.fire({
        icon: 'error',
        title: 'Que mala suerte!!!',
        text: 'Perdiste la partida! Superaste los 21 puntos!',
      });
    }

    if(score == 21){
      swal.fire({
        icon: 'success',
        title: 'BlackJack!',
        text: 'Haz hecho un BlackJack, tienes mas posibilidades de ganar...',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
