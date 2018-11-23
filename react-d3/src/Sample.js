import React from 'react';
import * as d3 from "d3";
export default class Sample extends React.Component 
{
     componentDidMount(){    
      this.drawChart();
    }      
    drawChart() {
    
      const data =  [12, 5, 6, 6, 9, 10];      
      const svg = d3.select("root").append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)                              
       svg.selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => i * 70)
         .attr("y", (d, i) => this.props.height - 10 * d)
         .attr("width", 65)
         .attr("height", (d, i) => d * 10)
         .attr("fill", "green")             
 
}
          
render(){
  return (
    <div>
  <div id="#root"></div>
   <svg  height='300' width='200'>
      <circle cx="60" cy="60" r="50"/>
      {/* <rect x='30' y='40' width='20' height='10' fill='green'>
      </rect> */}
    </svg>
  </div>
  );
  
}

}