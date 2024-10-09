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

	const minWidth = baseDimensions.w + 6 * baseDimensions.padding;
	const isSmallScreen = width <= minWidth;
	const smallScreenDimensions = {
		w: 224,
		h: 202,
		padding: 16,
	};

	const dimensions = isSmallScreen ? smallScreenDimensions : baseDimensions;
	return {
		minWidth,
		isSmallScreen,
		dimensions,
		pad: padFactory(dimensions.padding),
	};
}
