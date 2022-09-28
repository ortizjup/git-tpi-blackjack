import { ICategoriaCarta } from './i-categoria-carta';
export interface ICarta {
    id: number; 
    numero: number;
    nombre: string; 
    valores: number[];
    categoria: ICategoriaCarta;
}
