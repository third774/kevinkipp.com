/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			sm: ['clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem)', '1.5'],
			base: ['clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem)', '1.5'],
			xl: ['clamp(1.35rem, calc(1.28rem + 0.37vw), 1.56rem)', '1.5'],
			'2xl': ['clamp(1.62rem, calc(1.50rem + 0.58vw), 1.95rem)', '1.5'],
			'3xl': ['clamp(1.94rem, calc(1.77rem + 0.87vw), 2.44rem)', '1.5'],
			'4xl': ['clamp(2.33rem, calc(2.08rem + 1.25vw), 3.05rem)', '1.5'],
			'5xl': ['clamp(2.80rem, calc(2.45rem + 1.77vw), 3.82rem)', '1.5'],
		},
		fontFamily: {
			sans: [
				// 'Seravek', 'Gill Sans Nova', 'Ubuntu', 'Calibri', 'DejaVu Sans', 'source-sans-pro', 'sans-serif'
				'-apple-system', 'BlinkMacSystemFont', 'avenir next', 'avenir', 'segoe ui', 'helvetica neue', 'helvetica', 'Cantarell', 'Ubuntu', 'roboto', 'noto', 'arial', 'sans-serif'
			]
		},

		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
};
