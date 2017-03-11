
### React-todo筆記

- webpack.config.js

```js
//webpack.config.js

module.exports = {
  entry: './js/index.js', // 入口文件
  output: {
    filename: 'bundle.js',// 打包输出的文件
    path: `${__dirname}/dist`
  },
  module: {
  	loaders: [
      {
        test: /\.js$/,// test 去判斷是否為.js,是的話就進行es6和jsx的編譯
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  
};

```



- component起手式
```jsx
let Component = React.createClass({
	//注意開頭英文大寫

	getInitialState:function(){
		//state初始值
		return({myState:"" });
		},
	render:function(){
		//只允許回傳單個最高層級的tag
		return(
			<div>
				<h1></h1>
				<p></p>
			</div>
			);
	}
});

ReactDOM.render(<Component /> , document.getElementById('myid') );
```


- props

```jsx
let Component = React.createClass({
  render : function(){
    return(
      <div>
      	<p> {this.props.anyName} </p>
      </div>
    );
  }
});

ReactDOM.render( <Componnet anyName="my name is bacon" /> , document.getElementById('myid') );
```



- state

```jsx
let Component = React.createClass({
	getInitialState:function(){
		//state初始值(object)
		return( {myState:"this is state" , title:"this is title" } );
		},
	render:function(){
		//只允許回傳單個最高層級的tag
		return(
			<div>
				<h1> {this.state.title} </h1>
				<p> {this.state.myState} </p>
			</div>
			);
	}
});

ReactDOM.render(<Component /> , document.getElementById('myid') );
```



- refs





