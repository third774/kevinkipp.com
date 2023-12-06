import harmonyPalette from "@evilmartians/harmony/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: harmonyPalette,
		// https://zellwk.com/blog/media-query-units/
		screens: {
			sm: "40em",
			md: "48em",
			lg: "64em",
			xl: "80em",
			"2xl": "96em",
		},
		// https://utopia.fyi/type/calculator/?c=320,18,1.125,1240,20,1.2,10,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12
		fontSize: {
			xs: "clamp(0.8681rem, 0.8959rem + -0.0359vw, 0.8888rem)",
			sm: "clamp(1rem, 0.9854rem + 0.0728vw, 1.0419rem)",
			base: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",
			lg: "clamp(1.2656rem, 1.1841rem + 0.4076vw, 1.5rem)",
			xl: "clamp(1.4238rem, 1.2929rem + 0.6543vw, 1.8rem)",
			"2xl": "clamp(1.6019rem, 1.4077rem + 0.9707vw, 2.16rem)",
			"3xl": "clamp(1.8019rem, 1.5271rem + 1.3739vw, 2.5919rem)",
			"4xl": "clamp(2.0275rem, 1.6508rem + 1.8837vw, 3.1106rem)",
			"5xl": "clamp(2.2806rem, 1.7756rem + 2.525vw, 3.7325rem)",
			"6xl": "clamp(2.5656rem, 1.9002rem + 3.3272vw, 4.4788rem)",
			"7xl": "clamp(2.8863rem, 2.0206rem + 4.3283vw, 5.375rem)",
			"8xl": "clamp(3.2475rem, 2.1336rem + 5.5696vw, 6.45rem)",
			"9xl": "clamp(3.6531rem, 2.2318rem + 7.1065vw, 7.7394rem)",
		},
		fontFamily: {
			sans: ["Recursive", "Recursive-fallback", "sans-serif"],
			mono: [
				"Monaspace Neon",
				"Berkeley Mono",
				"Commit Mono",
				"MonoLisa",
				"Dank Mono",
				"Operator Mono",
				"Fira Code",
				"ui-monospace",
				"Cascadia Code",
				"Source Code Pro",
				"Menlo",
				"Consolas",
				"DejaVu Sans Mono",
				"monospace",
			],
		},
		extend: {
			fontWeight: {
				blackest: "1000",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
