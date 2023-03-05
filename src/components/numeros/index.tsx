import React, { Dispatch } from "react";
import GamepadController from "../../class/GamepadController";
import Entrada from "./Entrada";

interface Props {
	gamepad: GamepadController | null;
	mode: "entrada" | "editar" | "agrupar";
	setDigitos: Dispatch<React.SetStateAction<Array<number | undefined> | null>>;
}

const index = ({ gamepad, mode, setDigitos }: Props) => {
	if (mode === "entrada")
		return <Entrada gamepad={gamepad} setDigitos={setDigitos} />;
	if (mode === "editar") return <></>;
	if (mode === "agrupar") return <></>;

	return <></>;
};

export default index;
