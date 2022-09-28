import { ICarta } from './i-carta';
export interface IJugador {
    id: number;
    nombre: string; 
    apellido: string; 
    scoreMaximo: number;
    cartas: ICarta[]
}
