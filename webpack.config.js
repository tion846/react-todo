let webpack = require('webpack');

module.exports = {
  entry: './js/main.js', // 入口文件
  output: {
    filename: 'bundle.js',// 打包输出的文件
    path: `${__dirname}/dist`
  },
  module: {
  	loaders: [
      {
        test: /\.js$/,// test 去判断是否为.js,是的话就是进行es6和jsx的编译
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      //style-loader css-loader url-loader file-loader
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192'},// 當圖片大小小於 8k 時使用 base64 URL, 其餘使用直接連接到圖片的 URL
      {test : /\.(woff|woff2|ttf|eot)$/,loader: 'url-loader'},
    ],
  },

  plugins: [
  //Provide Plugin的主要功能是當在程式中遇到特定字元且沒被定義時會自動載入特定模組。
  //當遇到 $，jQuery，window.jQuery 或 root.jQuery 時都載入 jquery 套件。
  //解決Uncaught ReferenceError: jQuery is not defined 的問題。
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'root.jQuery': 'jquery'
    }),
  ]
  
};