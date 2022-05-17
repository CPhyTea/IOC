const path = require('path')

module.exports = {
    entry: './src/index.ts',
    // 配置模块规则
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    }
}
