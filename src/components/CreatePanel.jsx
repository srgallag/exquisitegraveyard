import React, { Component } from "react";
import db from '../db/db_config';
import Bttn from './Bttn'

export default class CreatePanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      author:'',
      snippet: props.src,
      panelCreated: false
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({author:e.target.value});
  }

   handleSubmit = (e) => {
     e.preventDefault();
    let postData = {
      author: this.state.author,
      completed:false,
      drawingId: this.props.drawingId,
      orderNum:this.props.orderNum +1,
      previousPanel: this.props.prevPanelId,
      src: ''
    }
    const postRef = db.collection("panels").doc()
    console.log(this.props.drawingId.path)
    postRef.set(postData)
    .then(() => {
      console.log('sucsessfully written to db')
    })
    .catch((err) => console.log(err))

    const drawingRef = db.collection("drawings").doc(this.props.drawingId.path.split('/')[1]).collection('panels').doc()
    drawingRef.set({panel:postRef})
    .then(() => {
      console.log('sucsessfully written to db')
    })
    .catch((err) => console.log(err))


   }
  render(){
    return(
      <div>
      <select
        value={this.state.author}
        onChange={this.handleChange}
      >
       <option value="Orange">friend1</option>
        <option value="Radish">friend2</option>
        <option value="Cherry">friend3</option>
      </select>
      <div>
      <Bttn value="Create New Panel" onClick ={this.handleSubmit}/>
      </div>
      </div>
    )
  }
}
