module.exports = {
    entry: "./src/index.ts",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ["ts-loader"]
        }]
    }
}