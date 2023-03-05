import Digitos from "../class/Digitos";
import Historial from "../class/Historial";
import Jugador from "../class/Jugador";

export interface Controller {
	jugador: Jugador | null;
	historial: Historial | null;
  setDigitosActuales: (digitos: Digitos) => void;
  getHistorial(): Historial | null;
  generarSiguienteNumero(input?: Array<number> | null): Digitos | null;
  init(callback: (digitos: Digitos) => void): void;
  setHistorial(historial: Historial): void;
  setJugador(jugador: Jugador): void;
  update(puntos_y_famas: { puntos: number; famas: number }): void;
}
