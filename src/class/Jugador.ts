import Historial from "./Historial";
import Digitos, { CuatroDigitos } from "./Digitos";
import { shuffle } from "lodash";
import { Controller } from "../interface/Controller";

class Jugador {
	private historial: Historial;
	private digitos_actuales: Digitos | null = null;
	private digitos_secretos: Digitos | null = null;
	private controler: Controller;

	constructor(controler: Controller) {
		this.controler = controler;
		this.historial = new Historial();

		this.controler.setJugador(this);
		this.controler.setHistorial(this.historial);
		this.controler.init(this.setDigitosActuales.bind(this));

		this.digitos_actuales = controler.generarSiguienteNumero();
		this.digitos_secretos = controler.generarSiguienteNumero();
	}

	private setDigitosActuales(digitos: Digitos) {
		this.digitos_actuales = digitos;
	}

	verificarNumero(digitos: CuatroDigitos | null) {
		if (!this.digitos_secretos || !digitos) return { puntos: 0, famas: 0 };

		const digitos_secretos = this.digitos_secretos.getDigitos();

		const puntos = digitos.reduce((puntos, digito) => {
			if (digitos_secretos.includes(digito)) {
				return puntos + 1;
			}
			return puntos;
		}, 0);

		const famas = digitos_secretos.reduce((famas, digito, index) => {
			if (digitos[index] === digito) return famas + 1;
			return famas;
		}, 0);

		return {
			puntos: puntos - famas,
			famas,
		};
	}

	update(puntos_y_famas: { puntos: number; famas: number }) {
		if (!this.digitos_actuales) return;
		this.digitos_actuales.setPuntos(puntos_y_famas.puntos);
		this.digitos_actuales.setFamas(puntos_y_famas.famas);
		this.historial.update(this.digitos_actuales);
	}

	get historico() {
		return this.historial.historico;
	}

	get digitos() {
		if (!this.digitos_actuales) return null;
		return this.digitos_actuales.getDigitos();
	}

	getControler() {
		return this.controler;
	}

	toString() {
		if (!this.digitos_secretos) return "";
		return this.digitos_secretos.toString();
	}
}

export default Jugador;
