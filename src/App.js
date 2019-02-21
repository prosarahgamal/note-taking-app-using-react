import React, { Component }  from 'react';
import Note from  './note';
import './App.css';

class Board extends Component{
  

  constructor(){
    super()
    console.log(this)
    this.state = {}
    this.state.notes = []
    this.render = this.render.bind(this)
    this.eachNote = this.eachNote.bind(this)
    this.generateId = this.generateId.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }
  generateId(){
    this.unique = this.unique || 0
    return this.unique++
  }
  add(text){
    var notes = [
      ...this.state.notes,
      {
        id: this.generateId(),
        text
      }
    ]
    this.setState({notes});
  }
  update(newTxt, id){
    var notes = this.state.notes.map( note => 
      (note.id !== id) ? note :{ id: id, text: newTxt }
    )
    this.setState({notes})
  }
  remove(id){
    var notes = this.state.notes.filter((note) => note.id !== id)
    this.setState({notes})
  }
  eachNote(note){
    console.log(note);
    return ( <Note key={note.id}
                   id = {note.id}
                   onClick = {this.update}
                   onRemove = {this.remove}>
                    {note.text}
                    </Note> )
  }
  render(){
    console.log('render: '+this);
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={() => this.add('enter note...')}>+</button>
      </div>
    ) 
  }
}

export default Board
