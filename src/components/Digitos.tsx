import React from "react";

interface Props {
	digitos: Array<number | undefined> | null;
	puntos?: number;
	famas?: number;
}

const Digitos = ({ digitos, puntos, famas }: Props) => {
	return (
		<div className="contenedor">
			<div className="num">
				<p>{(digitos && digitos[0]) ?? "-"}</p>
			</div>
			<div className="num">
				<p>{(digitos && digitos[1]) ?? "-"}</p>
			</div>
			<div className="num">
				<p>{(digitos && digitos[2]) ?? "-"}</p>
			</div>
			<div className="num" style={{ position: "relative" }}>
				<p>{(digitos && digitos[3]) ?? "-"}</p>
				{puntos !== undefined && famas !== undefined ? (
					<div className="punto-fama">
						{"• ".repeat(puntos)}
						{"F ".repeat(famas)}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Digitos;
