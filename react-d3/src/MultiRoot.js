import React from 'react';
//import * as d3 from "d3";
import * as d3 from "d3-3.5.17";
export default class MultiRoot extends React.Component {
    componentDidMount() {
        this.PrepareTree();
    }
    PrepareTree() {
        var treeData = [
            {
                "name": "Root1",
                "parent": "null",
                "children": [
                    {
                        "name": "Level 2: A",
                        "parent": "Top Level",
                        "children": [
                            {
                                "name": "Son of A",
                                "parent": "Level 2: A"
                            },
                            {
                                "name": "Daughter of A",
                                "parent": "Level 2: A"
                            }
                        ]
                    },
                    {
                        "name": "Level 2: B",
                        "parent": "Top Level"
                    }
                ]
            },
            {
                "name": "Root2",
                "parent": "null",
                "children": [
                    {
                        "name": "Level 2: A",
                        "parent": "Top Level",
                        "children": [
                            {
                                "name": "Son of A",
                                "parent": "Level 2: A"
                            },
                            {
                                "name": "Daughter of A",
                                "parent": "Level 2: A"
                            }
                        ]
                    },
                    {
                        "name": "Level 2: B",
                        "parent": "Top Level"
                    }
                ]
            }
            ,
            {
                "name": "Root3",
                "parent": "null",
                "children": [
                    {
                        "name": "Level 2: A",
                        "parent": "Top Level",
                        "children": [
                            {
                                "name": "Son of A",
                                "parent": "Level 2: A"
                            },
                            {
                                "name": "Daughter of A",
                                "parent": "Level 2: A"
                            }
                        ]
                    },
                    {
                        "name": "Level 2: B",
                        "parent": "Top Level"
                    }
                ]
            }
        ];

        var NoofRoots=treeData.length;
        // ************** Generate the tree diagram  *****************
        var margin = { top: 50, right: 20, bottom: 2, left: 5 },
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;
        var i = 0;
        for(var k=0;k<=NoofRoots-1;k++)
        {
            var widthper=(width/NoofRoots);
            d3.select("#Trees").append('div')
                               .attr('id','Tree'+k) 
                               .attr('display',' flex:'+widthper)                            
            var tree = d3.layout.tree()
            .size([height, width/NoofRoots]);
            //   var diagonal = d3.svg.diagonal()
            //                        .projection(function (d) { return [d.y, d.x]; });        
              var diagonal = d3.svg.diagonal()
                                   .projection(function(d) { return [d.x, d.y]; });
               var svg = d3.select("#Tree"+k).append("svg")
                                   .attr('id','svg'+k)
                                   .attr("width", (width/NoofRoots))
                                   .attr("height", height )
                                   .append("g")
                                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
                var root = treeData[k];
                update(root);
                function update(source) {
                    // Compute the new tree layout.
                    var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);

                    // Normalize for fixed-depth.
                // nodes.forEach(function (d) { d.y = d.depth * 180; });
                    nodes.forEach(function(d) { d.y = d.depth * 100; });
                    // Declare the nodesâ€¦
                    var node = d3.select('#svg'+k).selectAll("g.node")
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });
                         var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function(d) { 
                        return "translate(" + ((d.x)+(10)) + "," + ((d.y)+(60)) + ")"; });

                    nodeEnter.append("circle")
                        .attr("r", 10)
                        .style("fill", "#fff");
                        nodeEnter.append("text")
                        .attr("y", function(d) { 
                        return d.children || d._children ? -18 : 18; })
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .text(function(d) { return d.name; })
                        .style("fill-opacity", 1);

                    // Declare the linksâ€¦
                    var link = svg.selectAll("path.link")
                        .data(links, function (d) { return d.target.id; });

                    // Enter the links.
                    link.enter().insert("path", "g")
                        .attr("class", "link")
                        .attr("d", diagonal);

                }
            }
       
    }
    render() {
        return (
                
              <div id='Trees' style={{display: 'flex',width:'100%' ,height:'500px',marginTop:'5%'}}   >
            </div>
            
        );

    }
}