import React, { useEffect, useRef } from "react";
import Jugador from "../class/Jugador";
import Digitos from "./Digitos";

interface Props {
	jugador: Jugador | null;
}

const Historico = ({ jugador }: Props) => {
	return (
		<div className="historico">
			{jugador?.historico
				?.slice(0)
				.reverse()
				.map((digito, index) => (
					<div key={index} style={{ margin: "0.5em" }}>
						<Digitos
							digitos={Array.from(digito.getDigitos())}
							puntos={digito.getPuntos()}
							famas={digito.getFamas()}
						/>
					</div>
				))}
		</div>
	);
};

export default Historico;
