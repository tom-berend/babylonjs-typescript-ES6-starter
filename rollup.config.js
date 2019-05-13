import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';
import serve from 'rollup-plugin-serve'

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.ts',
		output: {
			name: 'asteroids',
			file: pkg.browser,
			format: 'umd',
			sourcemap: 'inline'
		},
		plugins: [
			resolve({customResolveOptions: {moduleDirectory: 'node_modules'}}),   // so Rollup can find `ms`
			commonjs(),  // so Rollup can convert bundles like `ms` to an ES module
			typescript(), // so Rollup can convert TypeScript to JavaScript
			serve({
				contentBase:'',
				open: true,
				openPage: '/index.html',
				host: 'localhost',
				port: 1234,
				verbose: true
			})
		]
	}

	// CommonJS (for Node) and ES module (for bundlers) build.

	// {
	// 	input: 'src/main.ts',
	// 	plugins: [
	// 		typescript(), // so Rollup can convert TypeScript to JavaScript
	// 	],
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
	// 	]
	// }
];


