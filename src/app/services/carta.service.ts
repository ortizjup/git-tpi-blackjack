import { Injectable } from '@angular/core';
import { ICarta } from '../interfaces/i-carta';
import { ICategoriaCarta } from '../interfaces/i-categoria-carta';
import { Observable, Observer } from 'rxjs';
import { datasetprovider } from './data-source/datasetprovider';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  private cantidad: number = 0;
  constructor() { }

  getCartas() : Observable<ICarta[]>{
      return this.obtenerTodoElMasoObservable;
  }
  
  solicitarCartas(cantidad: number) : Observable<ICarta[]>{
    this.cantidad = cantidad;
    return this.solicitarCartasObservable;
  }

  private obtenerTodoElMasoObservable: Observable<ICarta[]> = new Observable((observer) => {
    observer.next(new datasetprovider().fillArray());
    observer.complete();
  });

  private solicitarCartasObservable: Observable<ICarta[]> = new Observable((observer) => {
    observer.next(this.getCartasRamdomByCantidad());
    observer.complete();
  });

  private getCartasRamdomByCantidad() : ICarta[] {
      let cartas = new datasetprovider().fillArray();
      let retVal: Array<ICarta> = [];
      for(let i = 0; i < this.cantidad; i++){
        let numeroCarta = Math.floor(Math.random() * (52 - 1 + 1) + 1);
        retVal.push(cartas.find(x => x.identificador == numeroCarta) as ICarta);
      }
      return retVal;
  }
}
