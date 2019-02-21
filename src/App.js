import React from 'react';
import Note from  './note';
import './App.css';

var Board = React.createClass({
  propTypes: {
    count: function (props, propName) {
      if (typeof props[propName] !== 'number') {
        return new Error('the count should be a number')
      }
      if (props[propName] > 100) {
        return new Error('no more than 100')
      }
    }
  },
  getInitialState(){
    return {notes: []}
  },
  generateId(){
    this.unique = this.unique || 0
    return this.unique++
  },
  add(text){
    var notes = [
      ...this.state.notes,
      {
        id: this.generateId(),
        text
      }
    ]
    this.setState({notes});
  },
  update(newTxt, id){
    var notes = this.state.notes.map( note => 
      (note.id !== id) ? note :{ id: id, text: newTxt }
    )
    this.setState({notes})
  },
  remove(id){
    var notes = this.state.notes.filter((note) => note.id !== id)
    this.setState({notes})
  },
  eachNote(note){
    console.log(note);
    return ( <Note key={note.id}
                   id = {note.id}
                   onClick = {this.update}
                   onRemove = {this.remove}>
                    {note.text}
                    </Note> )
  },
  render(){
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={() => this.add('enter note...')}>+</button>
      </div>
    ) 
  }
})

export default Board
