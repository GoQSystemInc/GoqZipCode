const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

module.exports = (_, argv) => {
  const config = {
    target: ['web'],
    devServer: {
      static: 'docs',
      open: true
    },
    mode: 'development',
    entry: {
      'dist/index': './src/index.ts',
      'docs/demo': './src/demo.ts',
    },
    output: {
      path: `${__dirname}`,
      filename: '[name].js',
      libraryTarget: 'umd',
      globalObject: 'this',
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

  const mode = argv.mode
  if (mode === 'development') {
    config.devtool = 'source-map'
  }
  if (mode === 'production') {
    config.mode = mode
  }

  return config
}
