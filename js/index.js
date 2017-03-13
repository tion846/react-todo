import React from 'react';
import ReactDOM from 'react-dom';

const ENTER_KEY = 13;

let TodoPanel = React.createClass({
	getInitialState : function(){
		let array;
		if(localStorage.todoList){
			array = JSON.parse(localStorage.todoList);
		}
		return ( {todoList: array || [] , newtodo:"" } )
	},
	handleInput : function(e){
		this.setState({newtodo:e.target.value});
	},
	handleKeyDown : function(event){
		// console.log(event.which);
		if(event.which===ENTER_KEY){
			this.insert();
		}
	},
	toggleCheck : function(i){
		let arr = this.state.todoList;
		arr[i].isCheck = !arr[i].isCheck ;
		this.setState({todoList:arr});
	},
	insert : function(){
		if(this.state.newtodo){
		let arr = this.state.todoList;
		let t = {todo:this.state.newtodo ,isCheck:false};		
			arr.push(t);
			this.setState({todoList:arr, newtodo:""});
			// console.log(JSON.stringify(arr));
		}
	},
	remove : function(index){
		// console.log('remove clicked ' + index);
		let arr = this.state.todoList;
		arr.splice(index,1);
		this.setState({todoList:arr});
	},
	eachTodo : function(t,i){
		return(
			<TodoItem todo={t.todo} isCheck={t.isCheck} key={i} index={i} removeTodo={this.remove} handleCheckbox={this.toggleCheck} />
			);
	},
	clearDiv : function(){
		if( this.state.todoList.find(t=>t.isCheck===true) ){
			return (<div className='clearDiv col-lg-offset-7' ><a href='#' onClick={this.clear} >clear completed</a></div>);
		}
	},
	clear : function(){
		let arr = this.state.todoList.filter(t=>t.isCheck===false);
		this.setState({todoList:arr});
	},
	render : function(){
			localStorage.todoList = JSON.stringify(this.state.todoList);
		return (
				<div>
					<h1>Todos</h1>
					<div className='input-group col-lg-6 col-lg-offset-3'>
						<input className='form-control input-lg' type="text" onChange={this.handleInput} value={this.state.newtodo} onKeyDown={this.handleKeyDown} />
						<span className='input-group-btn'><button className='btn btn-info btn-lg' onClick={this.insert}>新增</button> </span>
					</div>
					<div className='list-group col-lg-6 col-lg-offset-3'>
						{this.state.todoList.map(this.eachTodo)}
					</div>
					{this.clearDiv()}
				</div>
			);
	}
});

let TodoItem = React.createClass({
	handleCheck : function(){
		// console.log('handleCheck' , this.props.isCheck);
		// this.setState({isCheck : !this.state.isCheck});
		// console.log('handleCheck');
		this.props.handleCheckbox(this.props.index);
	},
	btnRemove : function(){
		this.props.removeTodo(this.props.index);
	},
	isComplete : function(){
		if(this.props.isCheck){
		 	return (<label className='completed'>{this.props.todo} </label>);
		}else{
			return (<label>{this.props.todo} </label>);
		}
	},
	render : function(){
		return(
				<div className='list-group-item media'>
					<div className='col-lg-11 media-body' onClick={this.handleCheck}>
						<div className='media'>
							<div className='media-left'>
								<input type="checkbox" checked={this.props.isCheck} />
							</div>							
							<div className='media-body'>
								{this.isComplete()}
							</div>				
						</div>
					</div>
					<div className='media-right col-lg-1'>
					<span className='red glyphicon glyphicon-remove' onClick={this.btnRemove}></span>
					</div>
				</div>
				);
	}
});


ReactDOM.render(<TodoPanel /> , document.getElementById('app'));



