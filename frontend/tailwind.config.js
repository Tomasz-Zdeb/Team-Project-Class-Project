/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"border-dark": "#404040",
				"border-light": "#6b7280",
				muted: "#525252",
			},
			boxShadow: {
				main: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
			},
		},
	},
	plugins: [],
};
