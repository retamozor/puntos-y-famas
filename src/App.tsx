import { useEffect, useState } from "react";
import "./App.css";
import Jugador from "./class/Jugador";
import GamepadController from "./class/GamepadController";
1;
import Gamepad from "./components/Gamepad";
import BotController from "./class/BotController";
import Digitos from "./components/Digitos";
import Historico from "./components/Historico";

function App() {
	const [jugador1, setJugador1] = useState<Jugador | null>(null);
	const [jugador2, setJugador2] = useState<Jugador | null>(null);
	const [digitos, setDigitos] = useState<Array<number | undefined> | null>(
		null
	);

	useEffect(() => {
		setJugador1(new Jugador(new GamepadController()));
		setJugador2(new Jugador(new BotController()));
	}, []);

	useEffect(() => {
		if (jugador1 === null) return;
		let digitos = jugador1.digitos;
		if (digitos === null) return setDigitos(null);

		setDigitos(Array.from(digitos));
	}, [jugador1]);

	return (
		<div className="App">
			<Digitos digitos={digitos}/>
			<div className="botones">
				<button
					onClick={() => {
						setJugador1(new Jugador(new GamepadController()));
						setJugador2(new Jugador(new BotController()));
					}}
				>
					Reiniciar
				</button>
			</div>
			<Historico jugador={jugador1} />

			<Gamepad
				gamepad={jugador1 ? jugador1.getControler() : null}
				oponente={jugador2}
				setDigitos={setDigitos}
			/>
		</div>
	);
}

export default App;
