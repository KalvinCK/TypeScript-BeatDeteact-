const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { config } = require("process");

module.exports =
{
    mode: "development",
    entry: 
    {
        index: "./src/Main.ts"
    },
    devtool: 'inline-source-map',
    devServer: 
    {
        static: "./dist",
    },
    plugins: 
    [
        new HtmlWebpackPlugin({
          title: 'WebGL APP',
        }),
    ],
    output: 
    {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: "/",
    },
    module: {
        rules: [
          // load files typescript
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          // load modules css 
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          // Load Imagens
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          // Load Texts
          {
            test: /\.(txt|glsl|webgl|vert|frag)$/,
            use: 'raw-loader'
          },
          // load musics
          {
            test: /\.(mp3|wav|wma|opus|ogg|aac)$/,
            use: 'file-loader',
          }
        ],
    },
    resolve: 
    {
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization:
    {
        runtimeChunk: "single",
    },
};

// npm run server