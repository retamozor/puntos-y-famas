import Posicion from "./Posicion";

interface PuntoFama {
	punto: boolean | null;
	fama: boolean | null;
}

class Numero {
	#numero: number;
	#posicion: Posicion;
	posicion_actual: number | null;
	#es_digito: boolean | null;

	constructor(numero: number) {
		this.#numero = numero;
		this.#posicion = new Posicion();
		this.posicion_actual = null;
		this.#es_digito = null;
	}

	update(posicion: 0 | 1 | 2 | 3 | null, puntoFama: PuntoFama) {
		this.posicion_actual = posicion;

		if (posicion === null) return;
		this.#posicion.update(posicion, puntoFama);
	}

	descartar(force: boolean = false) {
		if (!force && this.#es_digito !== null) return;
		this.#es_digito = false;
	}

	asegurar(force: boolean = false) {
		if (!force && this.#es_digito !== null) return;
		this.#es_digito = true;
	}

  get esDigito() {
    return this.#es_digito;
  }

  get valor() {
    return this.#numero;
  }

	get posicion() {
		return this.#posicion;
	}

	get punto() {
		return this.#posicion.iterable.some(
			posicion => posicion?.punto === true
		);
	}
}

export default Numero;
