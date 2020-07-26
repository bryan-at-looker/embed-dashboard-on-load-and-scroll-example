const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
var fs = require('fs');
require('dotenv').config()
var user = require('./config/user.json')
var { createSignedUrl } = require('./auth_utils')

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    https: true,
    historyApiFallback: true,
    before: (app) => {
      app.get('/', function (req, res) {
        const filePath = path.resolve(__dirname, './public', 'index.html')
        fs.readFile(filePath, 'utf8', function (err, data) {
          if (err) {
            return console.log(err);
          }
          const url = createSignedUrl('/embed/dashboards-next/10?sdk=2&embed_domain=https://localhost:8081', process.env.LOOKER_HOST, process.env.LOOKER_EMBED_SECRET, user);
          data = data.replace(/\$LOOKER_LOGIN/g, url);
          res.send(data);
        });
      });
      app.get('/auth', function (req, res) {
        const src = req.query.src
        const url = createSignedUrl(src, process.env.LOOKER_HOST, process.env.LOOKER_EMBED_SECRET, user);
        res.json({ url });
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ]
};  