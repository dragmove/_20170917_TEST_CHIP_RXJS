var webpack = require('webpack'),
  path = require('path');

module.exports = {
  context: __dirname,

  entry: {
    overlay: [/*'webpack/hot/dev-server', 'babel-polyfill',*/ './app/src/overlay.js']
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'app/build')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["env", {
              "modules": false
            }]
          ]
        }
      }
    ]

    /*
     loaders: [
     {test: /\.css$/, loader: "style!css"},
     {test: /\.jsx?$/, loaders: ['babel'], exclude: /(node_modules|bower_components)/}
     ]
     */
  },

  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
      output: {
        beautify: true,
        comments: true
      },
      compress: {
        unused: true,
        drop_console: false,
        warnings: true
      }
    }),

    new webpack.BannerPlugin({
      banner: '',
      raw: true
    })
  ],

  devServer: {
    contentBase: './app',
    noInfo: true, //  --no-info option
    // host: '',
    port: 9001,
    hot: true,
    inline: true
  }
};