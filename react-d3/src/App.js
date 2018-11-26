import React, { Component } from 'react';
import './App.css';
//import Chart from './Chart'
//import Sample from './Sample';
// import TreeComponent from './TreeComponent'
// import Tree2 from './Tree2'
// import Chart from './Chart'
import PreparingTree from './PreparingTree'
import MultiRoot from './MultiRoot';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [12, 5, 6, 6, 9, 10],
      width: 700,
      height: 500
    }
  }
 
  render() {
    return (
      <div className="App" >
        {/* <PreparingTree></PreparingTree> */}
       <MultiRoot></MultiRoot>
      </div>
    );
  }
}

export default App;
