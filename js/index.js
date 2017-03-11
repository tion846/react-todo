import React from 'react';
import ReactDOM from 'react-dom';

let TodoPanel = React.createClass({
	getInitialState : function(){
		return ( {todoList:[] , newtodo:"" } )
	},
	handleInput : function(e){
		this.setState({newtodo:e.target.value});
	},
	toggleCheck : function(i){
		let arr = this.state.todoList;
		arr[i].isCheck = !arr[i].isCheck ;
		this.setState({todoList:arr});
	},
	insert : function(){
		let arr = this.state.todoList;
		let t = {todo:this.state.newtodo ,isCheck:false};
		if(t){
			arr.push(t);
			this.setState({todoList:arr, newtodo:""});
			console.log(JSON.stringify(arr));
		}
	},
	remove : function(index){
		console.log('remove clicked ' + index);	
		let arr = this.state.todoList;
		arr.splice(index,1);
		this.setState({todoList:arr});
	},
	eachTodo : function(t,i){
		return(
			<TodoItem todo={t.todo} isCheck={t.isCheck} key={i} index={i} removeTodo={this.remove} handleCheckbox={this.toggleCheck} />
			);
	},
	render : function(){

		return (
				<div>
					<div className='input-group'>
						<input type="text" onChange={this.handleInput} value={this.state.newtodo} />
						<button className='btn btn-info' onClick={this.insert}>新增</button>
					</div>
					<div className='list-group'>
						{this.state.todoList.map(this.eachTodo)}
					</div>
				</div>
			);
	}
});

let TodoItem = React.createClass({
	handleCheck : function(){
		console.log('handleCheck' , this.props.isCheck);
		// this.setState({isCheck : !this.state.isCheck});
		// console.log('handleCheck');
		this.props.handleCheckbox(this.props.index);
	},
	btnRemove : function(){
		this.props.removeTodo(this.props.index);
	},
	renderTodoComplete : function(){
			return(
				<div className='list-group-item'>
					<div className='col-lg-5' onClick={this.handleCheck}>
						<input type="checkbox" checked={this.props.isCheck} />
						<label className='completed'>{this.props.todo} </label>
					</div>
					<span className='red glyphicon glyphicon-remove' onClick={this.btnRemove}></span>
				</div>
				);
	},
	renderTodoUncomplete : function(){
			return(
				<div className='list-group-item'>
					<div className='col-lg-5' onClick={this.handleCheck}>
						<input type="checkbox" checked={this.props.isCheck} />					
						<label>{this.props.todo} </label>
					</div>
					<span className='red glyphicon glyphicon-remove' onClick={this.btnRemove}></span>
				</div>
				); 
	},
	render : function(){
		if(this.props.isCheck){
		 	return this.renderTodoComplete();
		}else{
			return this.renderTodoUncomplete()
		}
	}
});

ReactDOM.render(<TodoPanel /> , document.getElementById('boder'));