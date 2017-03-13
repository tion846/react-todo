### React-todo筆記

- 觀念

  當 `setState()` 方法更新了 state 後將重新呼叫 `render()` 方法，重新繪製 component 內容。

  若有需要進行 Ajax 非同步處理，請在 `componentDidMount` 進行處理。

  ​


- webpack.config.js配置

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
  //注意開頭英文大寫
  let Component = React.createClass({
  	getInitialState:function(){
  		//state初始值
  		return({myState:"" });
  		},
    	// render 是 Class based 元件唯一必須的方法（method）
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



- props & props.childen

  ```jsx
  let Component = React.createClass({
    render : function(){
      return(
        <div>
          <h2> {this.props.childen} </h2>
        	<p> {this.props.anyName} </p>
        </div>
      );
    }
  });

  ReactDOM.render(
    <div>
      <Component anyName="my name is bacon">this is title</Component>
    	<Componnet anyName="my name is niko">I Lvoe Bacon</Component>
    </div>,
    document.getElementById('myid') );
  ```


- state

  ```jsx
  let Component = React.createClass({
  	getInitialState:function(){
  		//state初始值(object)
  		return( {myState:"this is state" , title:"this is title" } );
  		},
  	render:function(){
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

  ```jsx
  let Component = React.createClass({
    handleClick: function() {
      this.refs.myTextInput.focus();
      //refs取得整個真實DOM節點
      console.log(this.refs.myTextInput.value);
    },
  	render:function(){
  		return(
  			<div>
  				<input type="text" ref="myTextInput" />
  				<button onClick={this.handleClick}>Focus the text input</button>
  			</div>
  			);
  	}
  });

  ReactDOM.render(<Component /> , document.getElementById('myid') );
  ```

- ​









