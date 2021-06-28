module.exports = {
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
  resolve: {
    extensions: ['.js', '.ts'],
  },
}
