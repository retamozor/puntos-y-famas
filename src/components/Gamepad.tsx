import { Dispatch, useEffect, useState } from "react";
import GamepadController from "../class/GamepadController";
import Jugador from "../class/Jugador";
import Numeros from "./numeros/index";
import style from "./Gamepad.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPen,
	faDeleteLeft,
	faPaperPlane,
	faPalette,
} from "@fortawesome/free-solid-svg-icons";
import useDebounceFnc from "../hooks/useDebounceFnc";

interface Props {
	gamepad: GamepadController | null;
	oponente: Jugador | null;
	setDigitos: Dispatch<React.SetStateAction<Array<number | undefined> | null>>;
}

const { gamepad: gamepadClass, botones, acciones, accion } = style;

const Gamepad = ({ gamepad, setDigitos, oponente }: Props) => {
	useEffect(() => {
		window.addEventListener("keydown", keyDown);
		return () => {
			window.removeEventListener("keydown", keyDown);
		};
	}, [gamepad]);

	const eraceDebounced = useDebounceFnc(erace, 100);
	const sendDebounced = useDebounceFnc(send, 100);

	function keyDown(e: KeyboardEvent) {
		if (e.key === "Enter") {
			sendDebounced();
			return;
		}
		if (e.key === "Backspace") {
			e.shiftKey ? setDigitos(null) : eraceDebounced();
			return;
		}
		const numero = Number(e.key);
		if (!Number.isNaN(numero)) {
			draw(numero);
			return;
		}
		console.log(e.key);
	}

	function send() {
		setDigitos(digitos => {
			
			if (gamepad === null) return digitos;
			if (oponente === null) return digitos;
			if (digitos === null) return digitos;
			if (digitos.includes(undefined)) return digitos;
			
			console.log('enter')
			const digito_jugador1 = gamepad.generarSiguienteNumero(
				digitos as number[]
			);
			if (digito_jugador1 === null) return digitos;

			const verificado = oponente.verificarNumero(digito_jugador1.getDigitos());

			gamepad.update(verificado);
			return null;
		});
	}

	function draw(input: number) {
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

	function erace() {
		setDigitos(digitos => {
			if (digitos === null) return digitos;
			const newDigitos = [...digitos];
			const index = newDigitos.findIndex(digito => digito === undefined);
			if (index === -1) {
				newDigitos[3] = undefined;
				return newDigitos;
			}
			if (index === 0) return digitos;
			newDigitos[index - 1] = undefined;
			return newDigitos;
		});
	};

	return (
		<div className={`contenedor ${gamepadClass}`}>
			<div className={botones}>
				<div className={acciones}>
					<div className={accion}>
						<button>
							<FontAwesomeIcon icon={faPen} />
						</button>
					</div>
					<div className={accion}>
						<button>
							<FontAwesomeIcon icon={faPalette} />
						</button>
					</div>
					<div className={accion}>
						<button onMouseUp={() => eraceDebounced()}>
							<FontAwesomeIcon icon={faDeleteLeft} />
						</button>
					</div>
					<div className={accion}>
						<button onMouseUp={sendDebounced}>
							<FontAwesomeIcon icon={faPaperPlane} />
						</button>
					</div>
				</div>
				<Numeros gamepad={gamepad} mode="entrada" setDigitos={setDigitos} />
			</div>
		</div>
	);
};

export default Gamepad;
