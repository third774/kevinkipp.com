import harmonyPalette from "@evilmartians/harmony/tailwind";

/* @link https://utopia.fyi/type/calculator?c=320,16,1.125,1240,18,1.2,10,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
const fontSizes = {
	"--step--2": "clamp(0.7813rem, 0.7932rem + -0.0154vi, 0.7901rem)",
	"--step--1": "clamp(0.8889rem, 0.872rem + 0.0845vi, 0.9375rem)",
	"--step-0": "clamp(1rem, 0.9565rem + 0.2174vi, 1.125rem)",
	"--step-1": "clamp(1.125rem, 1.0467rem + 0.3913vi, 1.35rem)",
	"--step-2": "clamp(1.2656rem, 1.1424rem + 0.6163vi, 1.62rem)",
	"--step-3": "clamp(1.4238rem, 1.2429rem + 0.9046vi, 1.944rem)",
	"--step-4": "clamp(1.6018rem, 1.3475rem + 1.2713vi, 2.3328rem)",
	"--step-5": "clamp(1.802rem, 1.4551rem + 1.7345vi, 2.7994rem)",
	"--step-6": "clamp(2.0273rem, 1.564rem + 2.3164vi, 3.3592rem)",
	"--step-7": "clamp(2.2807rem, 1.6719rem + 3.0441vi, 4.0311rem)",
	"--step-8": "clamp(2.5658rem, 1.7757rem + 3.9505vi, 4.8373rem)",
	"--step-9": "clamp(2.8865rem, 1.8715rem + 5.0752vi, 5.8048rem)",
	"--step-10": "clamp(3.2473rem, 1.954rem + 6.4668vi, 6.9657rem)",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		colors: harmonyPalette,
		textColor: (theme) => ({
			...theme("colors"),
			subtle: "var(--color-subtle)",
		}),

		// https://zellwk.com/blog/media-query-units/
		screens: {
			sm: "40em",
			md: "48em",
			lg: "64em",
			xl: "80em",
			"2xl": "96em",
		},
		fontSize: {
			xs: fontSizes["--step--2"],
			sm: fontSizes["--step--1"],
			base: fontSizes["--step-0"],
			lg: fontSizes["--step-1"],
			xl: fontSizes["--step-2"],
			"2xl": fontSizes["--step-3"],
			"3xl": fontSizes["--step-4"],
			"4xl": fontSizes["--step-5"],
			"5xl": fontSizes["--step-6"],
			"6xl": fontSizes["--step-7"],
			"7xl": fontSizes["--step-8"],
			"8xl": fontSizes["--step-9"],
			"9xl": fontSizes["--step-10"],
		},
		fontFamily: {
			sans: ["Recursive", "Recursive-fallback", "sans-serif"],
			mono: ["Recursive", "Recursive-fallback", "sans-serif"],
		},
		extend: {
			fontWeight: {
				blackest: "1000",
			},
			typography: {
				DEFAULT: {
					css: {
						fontSize: fontSizes["--step-0"],
						"blockquote p:first-of-type::before": false,
						"blockquote p:last-of-type::after": false,
					},
				},
			},
		},
	},
	plugins: [],
};
