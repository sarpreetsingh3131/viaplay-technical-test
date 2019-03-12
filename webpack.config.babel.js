import path from 'path'
import fs from 'fs'

let nodeModules = {}

fs.readdirSync('node_modules')
  .filter(x => { return ['.bin'].indexOf(x) === -1 })
  .forEach(mod => { nodeModules[mod] = 'commonjs ' + mod })

export default {
  entry: path.join(__dirname, 'src/app.js'),
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map',
  externals: nodeModules
}
