import { useWindowDimensions } from "react-native";

const baseDimensions = {
	w: 298,
	h: 268.2,
	padding: 20,
};

export function padFactory(base: number) {
	return function pad(multiplier = 1) {
		return base * multiplier;
	};
}

export function useSpacing() {
	const { width } = useWindowDimensions();

	const minWidth = 424; // 8 is for some spacing on web
	const isSmallScreen = width < minWidth;
	const isSmallPhone = width < 390;
	const smallScreenDimensions = {
		w: 160,
		h: 144,
		padding: 16,
	};

	const dimensions = isSmallPhone ? smallScreenDimensions : baseDimensions;
	return {
		minWidth,
		isSmallScreen,
		isSmallPhone,
		dimensions,
		pad: padFactory(dimensions.padding),
	};
}
