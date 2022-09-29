import { Injectable } from '@angular/core';
import { ICarta } from '../interfaces/i-carta';
import { ICategoriaCarta } from '../interfaces/i-categoria-carta';
import { Observable, Observer } from 'rxjs';
import { datasetprovider } from './datasetprovider';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  cantidad: number = 0;
  cartasActuales: Array<ICarta> = [];

  constructor() { }

  getCartas() : Observable<ICarta[]>{
      return this.cartaObservable;
  }
  
  solicitarCarta(cantidad: number, cartasActuales: ICarta[]) : Observable<ICarta[]>{
    this.cantidad = cantidad;
    this.cartasActuales = cartasActuales;
    return this.cartaObservable;
  }

  cartaObservable: Observable<ICarta[]> = new Observable((observer) => {
    observer.next(new datasetprovider().fillArray());
    observer.complete();
  });

  solicitarCartaObservable: Observable<ICarta[]> = new Observable((observer) => {
    observer.next();
    observer.complete();
  });
}
