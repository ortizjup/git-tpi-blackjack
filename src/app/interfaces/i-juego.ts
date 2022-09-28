import { IPartida } from './i-partida';
import { IJugador } from './i-jugador';
import { ICrupier } from './i-crupier';
export interface IJuego {
    id: number;
    crupier: ICrupier;
    jugador: IJugador;
    partidas: IPartida[];
}
