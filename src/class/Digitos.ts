export type CuatroDigitos = Uint8Array

class Digitos {
	private digitos: CuatroDigitos;
	private puntos: number;
	private famas: number;

	constructor(digitos: CuatroDigitos) {
		this.digitos = digitos;
		this.puntos = 0;
		this.famas = 0;
	}

	public getDigitos() {
		return this.digitos;
	}

	public getPuntos() {
		return this.puntos;
	}

	public setPuntos(puntos: number) {
		this.puntos = puntos;
	}

  public getFamas() {
    return this.famas;
  }

  public setFamas(famas: number) {
    this.famas = famas;
  }

	public toString() {
		return this.digitos.join('');
	}
}

export default Digitos;
