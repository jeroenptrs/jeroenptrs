import { useWindowDimensions } from "react-native";

const baseDimensions = {
	w: 248,
	h: 223,
	padding: 24,
};

export function padFactory(base: number) {
	return function pad(multiplier = 1) {
		return base * multiplier;
	};
}

export function useSpacing() {
	const { width } = useWindowDimensions();

	const minWidth = 416; // 6 is for some spacing on web
	const isSmallScreen = width < minWidth;
	const isSmallPhone = width <= (minWidth - 32);
	const smallScreenDimensions = {
		w: 224,
		h: 202,
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
