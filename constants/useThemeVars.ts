import { useTheme } from "@react-navigation/native";

export function useThemeVars() {
	const { colors } = useTheme();
	return {
		"--card-color": colors.card,
		"--text-color": colors.text,
		"--border-color": colors.border,
		"--primary-color": colors.primary,
	};
}
