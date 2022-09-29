import { ICategoriaCarta } from './i-categoria-carta';
export interface ICarta {
    id: number; 
    identificador: number;
    numero: number;
    nombre: string; 
    valores: number[];
    categoriaId: number;
    categoria: ICategoriaCarta;
}
