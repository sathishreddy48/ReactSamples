import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent'

class App extends Component {
  render() {
    return (
       <div>
          <MyComponent></MyComponent>
          {/* <MyComponent></MyComponent> */}
       </div>
    );
  }
}

export default App;
