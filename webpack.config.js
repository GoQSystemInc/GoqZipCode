module.exports = {
  target: ['web'],
  devServer: {
    contentBase: './',
    publicPath: '/dist/',
    open: true,
    openPage: 'docs/index.html'
  },
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}
