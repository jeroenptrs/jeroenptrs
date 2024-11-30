import colors from "@pico-ui/colors";
import { mix } from "@pico-ui/colors/lib/mix";
import container, { picoUiContainers } from "@pico-ui/container-plugin";
import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: ["./{app,components}/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		colors,
		extend: {
			...picoUiContainers,
			colors: {
				picobg: mix(colors.slate[950], colors.slate[900]),
			},
			fontFamily: {
				serif: [
					"Noto Serif",
					"ui-serif",
					"Georgia",
					"Cambria",
					'"Times New Roman"',
					"Times",
					"serif",
				],
				sans: [
					"Noto Sans",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
	},
	plugins: [container],
} satisfies Config;
