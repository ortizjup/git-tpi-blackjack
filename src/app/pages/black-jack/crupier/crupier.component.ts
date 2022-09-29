import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { ICarta } from 'src/app/interfaces/i-carta';
import { CartaService } from '../../../services/carta.service';

@Component({
  selector: 'app-crupier',
  templateUrl: './crupier.component.html',
  styleUrls: ['./crupier.component.css']
})
export class CrupierComponent implements OnInit {

  cartas!: ICarta[];
  cartasCrupier!: ICarta[];
  @Input() numeroCarta: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private cartaService:CartaService) { }

  ngOnInit(): void {
    this.loadCartas();
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  loadCartas() : void{
    this.subscription.add(
      this.cartaService.cartaObservable.subscribe({
        next: (result) => { this.cartas = result },
        error: (error) => {console.log(error)} 
      })
    )
  }
}
