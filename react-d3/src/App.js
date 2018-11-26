import React, {
  Component
} from 'react';
import './App.css';
//import Chart from './Chart'
//import Sample from './Sample';
// import TreeComponent from './TreeComponent'
// import Tree2 from './Tree2'
// import Chart from './Chart'
import PreparingTree from './PreparingTree'
import Tree2 from './Tree2';
import Chart from './Chart';
import MultiRoot from './MultiRoot';
import SimpleTree from './SimpleTree'
class App extends Component {
 

  render() {
    return ( <div className = "App" >
      {/* <Chart> </Chart>  */}
      {/* <PreparingTree></PreparingTree> */}
      <SimpleTree></SimpleTree>
      </div>
    );
  }
}

export default App;
