import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/asteroids.js',
		format: 'umd',
		sourcemap: true,
		name: 'asteroids.js',
	},
	plugins: [
		commonjs(), // converts date-fns to ES modules
		typescript(), // so Rollup can convert TypeScript to JavaScript
		serve({
			contentBase:'',
			open: true,
			openPage: '/index.html',
			host: 'localhost',
			port: 1234,
			verbose: true
		}),
		production && terser() // minify, but only in production
	],
	external: ['babylonjs','babylonjs-materials']
};
