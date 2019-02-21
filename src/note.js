import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './App.css';

class Note extends Component{
    constructor(){
      super()
      this.state = {}
      this.editing = false
      this.edit = this.edit.bind(this)
      this.save = this.save.bind(this)
      this.remove = this.remove.bind(this)
      this.renderDisplay = this.renderDisplay.bind(this)
      this.renderForm = this.renderForm.bind(this)
    }
    edit(){
      this.setState({editing: true})
    }
    save(){
      this.props.onClick(this.refs.newTxt.value, this.props.id)
      this.setState({editing: false})
    }
    remove(){
      this.props.onRemove(this.props.id)
    }
    componentWillMount(){
      this.style = {
        top: this.randomBetween(0, window.innerHeight-150, 'px'),
        right: this.randomBetween(0, window.innerWidth-150, 'px')
      }
    }
    randomBetween(x, y, s){
      var r = (x + Math.ceil(Math.random() * (y-x))) + s
      console.log(r);
      return r
    }
    componentDidUpdate() {
      if (this.state.editing) {
        this.refs.newTxt.focus()
        this.refs.newTxt.select()
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      return this.props.children !== nextProps.children || this.state !== nextState
    }
    renderForm(){
      return (
        <div className="note"
        style={this.style}>
        <textarea ref="newTxt" defaultValue={this.refs.text.innerText}></textarea>
        <button onClick={this.save}>save</button>
        </div>
      )
      }
    renderDisplay(){
      return (
        <div className="note"
        style={this.style}>
          <p ref="text">{this.props.children}</p>
          <span>
          <button onClick={this.edit}>EDIT</button>
          <button onClick={this.remove}>X</button>
          </span>
        </div>
      )
    }
    render() {
      return ( <Draggable>
        {this.state.editing ? this.renderForm() : this.renderDisplay()}
        </Draggable>
        )
    }
  }

  export default Note