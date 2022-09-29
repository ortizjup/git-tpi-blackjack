import { Injectable } from '@angular/core';
import { ICarta } from '../interfaces/i-carta';
import { ICategoriaCarta } from '../interfaces/i-categoria-carta';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  constructor() { }

  getCartas() : Observable<ICarta[]>{
      return this.cartaObservable;
  }

  cartaObservable: Observable<ICarta[]> = new Observable((observer) => {
    observer.next(this.fillArray());
    observer.complete();
  });

  fillArray() : ICarta[] {
    let cartas: Array<ICarta> = [];
    let totalCats = 4;
    //Iteracion 1: Diamantes
    //Iteracion 2: Pica
    //Iteracion 3: Trebol
    //Iteracion 4: Corazon

    for(let i = 1; i < totalCats; i++){
        let descripcion = "";
        let codigo = "";
       
        if(i == 1){
          descripcion = "Diamante";
          codigo = "D";
        }else if(i == 2){
          descripcion = "Pica";
          codigo = "P";
        }else if(i == 3){
          descripcion = "Trebol";
          codigo = "T";
        }else if(i = 4){
          descripcion = "Corazon";
          codigo = "C";
        }

        let categoria = {id: i, descripcion: descripcion, codigo: codigo} as ICategoriaCarta;

        for(let j = 1; j < 14; j++){
          let valores = [];
          let nombreCarta = null;
          
          if(j == 11){
            nombreCarta = "Q";
          }else if(j == 12){
            nombreCarta = "K";
          }else if(j == 13){
            nombreCarta = "A";
          }else if(j == 14){
            nombreCarta = "J";
          }

          if(j == 1){
            valores = [1, 10];
          }else if(j >= 2 && j <= 9){
            valores = [i];
          }else{
            valores = [10];
          }

          cartas.push({id: j, numero: j, nombre: nombreCarta, valores: valores, categoriaId: j, categoria:  categoria} as ICarta);
      }
    }  
    return cartas;
  }
}
