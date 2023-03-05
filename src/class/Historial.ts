import Numero from "./Numero";
import Digitos from "./Digitos";

class Historial {
	#numeros: Numero[];
	#historico: Digitos[];

	constructor() {
		const numeros_1_10 = Array.from({ length: 10 }, (_, i) => i);
		this.#numeros = numeros_1_10.map(numero => new Numero(numero));
		this.#historico = [];
	}

	update(digitos: Digitos) {
		this.#historico.push(digitos);
		const digitos_ = digitos.getDigitos();
		const puntos = digitos.getPuntos();
		const famas = digitos.getFamas();

		let son_punto: boolean | null = false;
		let son_fama: boolean | null = false;
		let descartar = false;

		if (puntos === 0 && famas === 0) descartar = true;

		if (puntos > 0 && puntos < 4) son_punto = null;
		if (puntos === 4) son_punto = true;

		if (famas > 0 && famas < 4) son_fama = null;
		if (famas === 4) son_fama = true;

		digitos_.forEach((digito, index) => {
			const numero = this.numeros[digito];
			const posicion =
				index >= 0 && index < 4 ? (index as 0 | 1 | 2 | 3) : null;

			numero.update(posicion, { punto: son_punto, fama: son_fama });
			if (puntos + famas === 4) return numero.asegurar();
			if (descartar) return numero.descartar();
		});
		this.numeros
			.filter(numero => !digitos_.includes(numero.valor))
			.forEach(numero => numero.update(null, { punto: null, fama: null }));
	}

	descartar(numero: number, force?: boolean) {
		this.numeros[numero].descartar(force);
	}

	asegurar(numero: number, force?: boolean) {
		this.numeros[numero].asegurar(force);
	}

	get historico() {
		return this.#historico;
	}

	getNumero(numero: number): Numero {
		return this.numeros[numero];
	}

	get numeros() {
		return this.#numeros;
	}
}

export default Historial;
