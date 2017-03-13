## React-todo筆記

#### 觀念

- 當 `setState()` 方法更新了 state 後將重新呼叫 `render()` 方法，重新繪製 component 內容。
- 若有需要進行 Ajax 非同步處理，請在 `componentDidMount` 進行處理。



#### webpack.config.js配置

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


#### component起手式

```jsx
//注意開頭英文大寫
let Component = React.createClass({
	getInitialState:function(){
		//state初始值
		return({myState:"hello world" });
		},
  	// render 是 Class based 元件唯一必須的方法（method）
	render:function(){
		//只允許回傳單個最高層級的tag
		return(
			<div>
				<h1>{this.state.myState}</h1>
				<p>text</p>
			</div>
			);
	}
});

ReactDOM.render(<Component /> , document.getElementById('myid') );
```


#### props & props.childen

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


#### state

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


#### refs

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


#### array.map()產生Component & Props呼叫function()

```jsx
let Panel = React.createClass({
	getInitialState : function(){
		return ( {array:[{thing:'dinner',money:120},{thing:'breakfast',money:50}]} )
	},
	remove : function(index){
		let arr = this.state.array;
		arr.splice(index,1);
		this.setState({array:arr});
	},
	eachThing : function(t,i){
		return(
			<Section thing={t.thing} money={t.money} key={i} index={i} removeThing={this.remove} />
			);
	},
	render : function(){
		return (
				<div>
					<div className='list-group'>
					  {//透過array.map訪問每個節點
                          this.state.array.map(this.eachThing)
                      	}
					</div>
				</div>
			);
	}
});

let Section = React.createClass({
	btnRemove : function(){
      	 //透過props呼叫Panel的function()
		this.props.removeThing(this.props.index);
	},
	render : function(){
      //為了避開javascript的保留字class，因此使用className來表示
		return(
				<div className='list-group-item'>
            		 <p>{this.props.thing}</p>
					<button onClick={this.btnRemove}>REMOVE</button>
				</div>
				);
	}
});

ReactDOM.render(<Panel /> , document.getElementById('myid') );
```



#### Component Life Cycle 生命週期

- Mounting : 已插入真實的 DOM
  - componentWillMount()
  - componentDidMount()
- Updating : 正在被重新渲染
  - componentWillUpdate(object nextProps, object nextState)
  - componentDidUpdate(object prevProps, object prevState)
- Unmounting : 已移出真實的 DOM
  - componentWillUnmount()




#### Component各個方法的執行順序

**讀取頁面**

1. getInitialState()
2. componentWillMount()
3. render()
4. componentDidMount()

**呼叫setStaet()**

1. componentWillUpdate()
2. render()
3. componentDidUpdate()



#### Javascript

- 使用`JSON.parse();`可以將`String`轉成`json`

- 移出陣列

  ```js
  let arr = [{title:0},{title:1},{title:2}];
  arr.splice(0,1);//splice(開始位置,刪除數量)
  //arr=[{title:1},{title:2}]
  ```



#### CSS

- input checkbox樣式修改

  ```css
  input[type=checkbox] {
      /*自行修改checkbox樣式*/
      -webkit-appearance: none;/*無樣式*/
      width: 18px;
      height: 18px;
      background-color: #fafafa;
      border: 1px solid #cacece;
      border-radius: 5px;/*圓角矩形-圓形:0px-10px*/
  }

  input[type=checkbox]:checked {
      /*input在checked的情況下*/
      background-color: #eee;
  }

  input[type=checkbox]:checked:after {
      /*after表示: 在input[type=checkbox]:checked 後面插入內容*/
      content: '\2714';/* 2713-14勾勾;2715-18叉叉  */
      position: absolute;/*設定位置*/
      top: 0px;
      left: 18px;
      font-size: 18px;
      font-weight: bold;/*粗體使用 font-weight : bold;*/
      color: #5cb85c;
  }
  ```


- 漸層色彩: [WebGradients](https://webgradients.com/)

  ```css
  div{
    	background-image: linear-gradient(to left, #ffecd2 0%, #fcb69f 100%);
    	/*可以使用 deg | top、right、bottom、left 搭配,ex: right top */
    	background-repeat: no-repeat;
  }
  ```

- 文字換行 & 刪除線

  ```css
  div{
    word-wrap:break-word;/*文字換行*/
    text-decoration: line-through;/*刪除線*/
  }
  ```

- 陰影效果

  ```css
  div{
    box-shadow: 10px 10px 15px #bdc3c7;
    /*box-shadow: h-shadow v-shadow blur spread color inset;*/
    /*水平位置 垂直位置 (blur:模糊距離) (spread:陰影尺寸) 色碼 (inset:內陰影)*/
    /*位置允許負值*/
  }
  ```

- css選擇器

  ```css
  *{
    /*選擇所有元素*/
  }

  div,
  p{
    /*選擇所有<div>和所有<p>*/
  }

  div p{
    /*選擇<div>內的所有<p>*/
    /*<div>
    	<p>有</p>
    	<span>
    		<p>有<p/>
    	</span>
    </div>*/
  }

  div>p{
    /*選擇父元素是<div>的所有<p>*/
    /*<div>
    	<p>有</p>
    	<span>
    		<p>無<p/>
    	</span>
    </div>*/
  }

  div+p{
    /*選擇緊接在<div>後的所有<p>*/
    /*<div></div>
    	<p>有</p>
    	<p>無<p/>*/
  }

  p~ul{
    /*選擇前面有<p>的所有<ul>*/
      /*<div></div>
    	<p>有</p>
    	<p>有<p/>*/
  }
  ```







