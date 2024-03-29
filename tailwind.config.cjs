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

const spaces = {
	/* @link https://utopia.fyi/space/calculator?c=320,16,1.125,1240,18,1.2,10,2,&s=0.75|0.5|0.25,1.5|2|3|4|6|8|12|16|24|32|40|48,s-l&g=s,l,xl,12 */
	"3xs": "clamp(0.25rem, 0.2283rem + 0.1087cqi, 0.3125rem)",
	"2xs": "clamp(0.5rem, 0.4783rem + 0.1087cqi, 0.5625rem)",
	xs: "clamp(0.75rem, 0.7065rem + 0.2174cqi, 0.875rem)",
	s: "clamp(1rem, 0.9565rem + 0.2174cqi, 1.125rem)",
	m: "clamp(1.5rem, 1.4348rem + 0.3261cqi, 1.6875rem)",
	l: "clamp(2rem, 1.913rem + 0.4348cqi, 2.25rem)",
	xl: "clamp(3rem, 2.8696rem + 0.6522cqi, 3.375rem)",
	"2xl": "clamp(4rem, 3.8261rem + 0.8696cqi, 4.5rem)",
	"3xl": "clamp(6rem, 5.7391rem + 1.3043cqi, 6.75rem)",
	"4xl": "clamp(8rem, 7.6522rem + 1.7391cqi, 9rem)",
	"5xl": "clamp(12rem, 11.4783rem + 2.6087cqi, 13.5rem)",
	"6xl": "clamp(16rem, 15.3043rem + 3.4783cqi, 18rem)",
	"7xl": "clamp(24rem, 22.9565rem + 5.2174cqi, 27rem)",
	"8xl": "clamp(32rem, 30.6087rem + 6.9565cqi, 36rem)",
	"9xl": "clamp(40rem, 38.2609rem + 8.6957cqi, 45rem)",
	"10xl": "clamp(48rem, 45.913rem + 10.4348cqi, 54rem)",

	/* One-up pairs */
	"3xs-2xs": "clamp(0.25rem, 0.1413rem + 0.5435cqi, 0.5625rem)",
	"2xs-xs": "clamp(0.5rem, 0.3696rem + 0.6522cqi, 0.875rem)",
	"xs-s": "clamp(0.75rem, 0.6196rem + 0.6522cqi, 1.125rem)",
	"s-m": "clamp(1rem, 0.7609rem + 1.1957cqi, 1.6875rem)",
	"m-l": "clamp(1.5rem, 1.2391rem + 1.3043cqi, 2.25rem)",
	"l-xl": "clamp(2rem, 1.5217rem + 2.3913cqi, 3.375rem)",
	"xl-2xl": "clamp(3rem, 2.4783rem + 2.6087cqi, 4.5rem)",
	"2xl-3xl": "clamp(4rem, 3.0435rem + 4.7826cqi, 6.75rem)",
	"3xl-4xl": "clamp(6rem, 4.9565rem + 5.2174cqi, 9rem)",
	"4xl-5xl": "clamp(8rem, 6.087rem + 9.5652cqi, 13.5rem)",
	"5xl-6xl": "clamp(12rem, 9.913rem + 10.4348cqi, 18rem)",
	"6xl-7xl": "clamp(16rem, 12.1739rem + 19.1304cqi, 27rem)",
	"7xl-8xl": "clamp(24rem, 19.8261rem + 20.8696cqi, 36rem)",
	"8xl-9xl": "clamp(32rem, 27.4783rem + 22.6087cqi, 45rem)",
	"9xl-10xl": "clamp(40rem, 35.1304rem + 24.3478cqi, 54rem)",
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
			spacing: {
				...spaces,
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
