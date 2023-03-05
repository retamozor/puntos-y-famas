import { shuffle } from "lodash";
import { Controller } from "../interface/Controller";
import Digitos, { CuatroDigitos } from "./Digitos";
import Historial from "./Historial";
import Jugador from "./Jugador";


class GamepadController implements Controller {
  jugador: Jugador | null;
  historial: Historial | null;
  setDigitosActuales: (digitos: Digitos) => void;

  constructor() {
    this.jugador = null;
    this.historial = null;
    this.setDigitosActuales = (digitos: Digitos) => {};
  }

  generarSiguienteNumero(input?: Array<number> | null) {
    if (input === null || input === undefined) return null;
    if (input.length !== 4) return null;

    const digitos_generados = new Uint8Array(4);
    digitos_generados.set(input);
    const digitos =  new Digitos(digitos_generados)
    this.setDigitosActuales(digitos);
		return digitos;
  }

  init(callback: (digitos: Digitos) => void): void {
    if (!this.jugador) return;
    this.setDigitosActuales = callback;
  }

  setJugador(jugador: Jugador) {
    this.jugador = jugador;
  }

  setHistorial(historial: Historial) {
    this.historial = historial;
  }

  getHistorial(): Historial | null {
    return this.historial;
  }

  update(puntos_y_famas: { puntos: number; famas: number }) {
    this.jugador?.update(puntos_y_famas);
  }
}

export default GamepadController;