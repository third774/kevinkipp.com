/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontSize: {
			/* Step -2: 14.22px → 13.89px */
			xs: "clamp(0.8681rem, 0.8959rem + -0.0359vw, 0.8888rem)",

			/* Step -1: 16.00px → 16.67px */
			sm: "clamp(1rem, 0.9854rem + 0.0728vw, 1.0419rem)",

			/* Step 0: 18.00px → 20.00px */
			base: "clamp(1.125rem, 1.0815rem + 0.2174vw, 1.25rem)",

			/* Step 1: 20.25px → 24.00px */
			lg: "clamp(1.2656rem, 1.1841rem + 0.4076vw, 1.5rem)",

			/* Step 2: 22.78px → 28.80px */
			xl: "clamp(1.4238rem, 1.2929rem + 0.6543vw, 1.8rem)",

			/* Step 3: 25.63px → 34.56px */
			"2xl": "clamp(1.6019rem, 1.4077rem + 0.9707vw, 2.16rem)",

			/* Step 4: 28.83px → 41.47px */
			"3xl": "clamp(1.8019rem, 1.5271rem + 1.3739vw, 2.5919rem)",

			/* Step 5: 32.44px → 49.77px */
			"4xl": "clamp(2.0275rem, 1.6508rem + 1.8837vw, 3.1106rem)",

			/* Step 6: 36.49px → 59.72px */
			"5xl": "clamp(2.2806rem, 1.7756rem + 2.525vw, 3.7325rem)",

			/* Step 7: 41.05px → 71.66px */
			"6xl": "clamp(2.5656rem, 1.9002rem + 3.3272vw, 4.4788rem)",

			/* Step 8: 46.18px → 86.00px */
			"7xl": "clamp(2.8863rem, 2.0206rem + 4.3283vw, 5.375rem)",

			/* Step 9: 51.96px → 103.20px */
			"8xl": "clamp(3.2475rem, 2.1336rem + 5.5696vw, 6.45rem)",

			/* Step 10: 58.45px → 123.83px */
			"9xl": "clamp(3.6531rem, 2.2318rem + 7.1065vw, 7.7394rem)",
		},
		fontFamily: {
			sans: [
				"Inter",
				"Roboto",
				"Helvetica Neue",
				"Arial Nova",
				"Nimbus Sans",
				"Arial",
				"sans-serif",
			],
		},
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
