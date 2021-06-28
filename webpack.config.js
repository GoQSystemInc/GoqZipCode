const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;
  return {
    target: ['web'],
    devServer: {
      contentBase: './',
      publicPath: '/dist/',
      open: true,
      openPage: 'docs/index.html',
    },
    entry: {
      'dist/index': './src/index.ts',
      'docs/demo': './src/demo.ts',
    },
    output: {
      path: `${__dirname}`,
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        }
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ],
    resolve: {
      extensions: ['.js', '.ts'],
    },
  }
}
