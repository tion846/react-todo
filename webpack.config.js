module.exports = {
  entry: './js/index.js', // 入口文件
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
    ],
  },
  
};