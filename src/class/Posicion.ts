interface PuntoFama {
	punto: boolean | null;
	fama: boolean | null;
}

class Posicion {
	0: PuntoFama | null;
	1: PuntoFama | null;
	2: PuntoFama | null;
	3: PuntoFama | null;

	constructor() {
		this[0] = null;
		this[1] = null;
		this[2] = null;
		this[3] = null;
	}

	update(posicion: 0 | 1 | 2 | 3, puntoFama: PuntoFama) {
		if (this[posicion] === null) {
			this[posicion] = puntoFama;
			return;
		}
		
		(this[posicion] as PuntoFama).punto = (this[posicion] as PuntoFama).punto ?? puntoFama.punto;
		(this[posicion] as PuntoFama).fama = (this[posicion] as PuntoFama).fama ?? puntoFama.fama;
	}

  get iterable() {
    return [this[0], this[1], this[2], this[3]];
  }
}

export default Posicion;
