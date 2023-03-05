import React from "react";
import GamepadController from "../../class/GamepadController";
import style from "../Gamepad.module.css";

interface Props {
	gamepad: GamepadController | null;
	setDigitos: React.Dispatch<
		React.SetStateAction<Array<number | undefined> | null>
	>;
}

const { numeros, numero, digito, ["no-digito"]: noDigito } = style;

const Entrada = ({ gamepad, setDigitos }: Props) => {
	const draw = (input: number) => {
		setDigitos(digitos => {
			if (digitos === null) return [input, undefined, undefined, undefined];
			if (digitos && digitos.includes(input)) return digitos;
			const newDigitos = [...digitos];
			const index = newDigitos.findIndex(digito => digito === undefined);
			if (index === -1) return digitos;
			newDigitos[index] = input;
			return newDigitos;
		});
	};

	return (
		<div className={numeros}>
			{gamepad &&
				gamepad.getHistorial()?.numeros.map(num => {
					let className = numero;
					if (num.esDigito !== null)
						className += num.esDigito ? ` ${digito}` : ` ${noDigito}`;
					return (
						<div key={num.valor} className={className}>
							<button onMouseUp={() => draw(num.valor)}>{num.valor}</button>
						</div>
					);
				})}
		</div>
	);
};

export default Entrada;
