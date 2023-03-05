import { shuffle } from "lodash";
import { Controller } from "../interface/Controller";
import Digitos, { CuatroDigitos } from "./Digitos";
import Historial from "./Historial";
import Jugador from "./Jugador";

class BotController implements Controller {
	jugador: Jugador | null;
	historial: Historial | null;
	setDigitosActuales: (digitos: Digitos) => void;

	constructor() {
		this.jugador = null;
		this.historial = null;
		this.setDigitosActuales = (digitos: Digitos) => {};
	}

	generarSiguienteNumero() {
		if (!this.historial) return null;
		let digitos = this.historial.numeros
			.filter(numero => numero.esDigito !== false)
			.map(numero => numero.valor);
		const digitos_generados: CuatroDigitos = new Uint8Array(4);

		for (let i = 0; i < 4; i++) {
			digitos = shuffle(digitos);
			const digito = digitos.pop() as number;
			digitos_generados[i] = digito;
		}

		const digitos_generados_ = new Digitos(digitos_generados);
		this.setDigitosActuales(digitos_generados_);
		return digitos_generados_;
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

export default BotController;
