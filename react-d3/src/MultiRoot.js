import React from 'react';
//import * as d3 from "d3";
import * as d3 from "d3-3.5.17";
export default class MultiRoot extends React.Component {
    componentDidMount() {
        this.PrepareTree();
    }
    PrepareTree() {
        // var treeData = [
        //     {
        //         "name": "Root1",
        //         "parent": "null",
        //         "children": [
        //             {
        //                 "name": "Level 2: A",
        //                 "parent": "Top Level",
        //                 "children": [
        //                     {
        //                         "name": "Son of A",
        //                         "parent": "Level 2: A"
        //                     },
        //                     {
        //                         "name": "Daughter of A",
        //                         "parent": "Level 2: A"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "Level 2: B",
        //                 "parent": "Top Level"
        //             }
        //         ]
        //     },
        //     {
        //         "name": "Root2",
        //         "parent": "null",
        //         "children": [
        //             {
        //                 "name": "Level 2: A",
        //                 "parent": "Top Level",
        //                 "children": [
        //                     {
        //                         "name": "Son of A",
        //                         "parent": "Level 2: A"
        //                     },
        //                     {
        //                         "name": "Daughter of A",
        //                         "parent": "Level 2: A"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "Level 2: B",
        //                 "parent": "Top Level"
        //             }
        //         ]
        //     }
        //     ,
        //     {
        //         "name": "Root3",
        //         "parent": "null",
        //         "children": [
        //             {
        //                 "name": "Level 2: A",
        //                 "parent": "Top Level",
        //                 "children": [
        //                     {
        //                         "name": "Son of A",
        //                         "parent": "Level 2: A"
        //                     },
        //                     {
        //                         "name": "Daughter of A",
        //                         "parent": "Level 2: A"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "name": "Level 2: B",
        //                 "parent": "Top Level"
        //             }
        //         ]
        //     }
        // ];

        var treeData = [
            {
              "SystemTag": "MSQ",
              "ScriptGroupId": 2,
              "PatchId": 1,
              "ReleaseStatus": "Pending",
              "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\04\\Patch1_SC1_MSQ-ECDM_Deployment_20181003101020.sql",
              "ScriptFileId": 3,
              "children": [
                {
                  "ScriptFileId": 4,
                  "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                  "Status": "Pending"
                },
                {
                    "ScriptFileId": 5,
                    "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                    "Status": "Pending"
                  },
                  {
                    "ScriptFileId": 6,
                    "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                    "Status": "Pending"
                  },
                  {
                    "ScriptFileId": 7,
                    "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                    "Status": "Pending"
                  }
              ]
            },
            {
                "SystemTag": "MSQ",
                "ScriptGroupId": 2,
                "PatchId": 1,
                "ReleaseStatus": "Pending",
                "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\04\\Patch1_SC1_MSQ-ECDM_Deployment_20181003101020.sql",
                "ScriptFileId": 1,
                "children": [
                  {
                    "ScriptFileId": 2,
                    "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                    "Status": "Pending"
                  }
                ]
              },
            {
              "SystemTag": "MSQ",
              "ScriptGroupId": 2,
              "PatchId": 1,
              "ReleaseStatus": "Pending",
              "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
              "ScriptFileId": 4,
              "children": []
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
            
               // var root = treeData[k];
              //  update(root);

                var numberOfTrees = treeData[k].length;
                treeData.forEach(function (n, index) {
                    n.x0 = width * (index + 1) / numberOfTrees;
                    n.y0 = 0;
                    update(n, index);
                });
              function update(source,index) {

                        //Find if the source node already exists in the tree. If exists, add source's children to existing children
                var currentTreeNodes = svg.selectAll("g.node")[0];
                if (currentTreeNodes.length > 0)
                  var f = currentTreeNodes.find(function (value, index) { return value.__data__.id == source.id; });
                   // Compute the new tree layout.
                    var nodes = tree.nodes(source),
                        links = tree.links(nodes);
                    // Normalize for fixed-depth.
                // nodes.forEach(function (d) { d.y = d.depth * 180; });
                    nodes.forEach(function(d) { d.y = d.depth * 80; });
                    // Declare the nodesâ€¦
                    var node = d3.select('#svg'+k).selectAll("g.node")
                        .data(nodes, function (d) { return d.id || (d.id = ++i); });
                         var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function(d) { 
                            return "translate(" + d.x + "," + d.y + ")"; });
                        // .attr("transform", function(d) { 
                        // return "translate(" + ((d.x)+(10)) + "," + ((d.y)+(60)) + ")"; });

                     nodeEnter.append("circle")
                        .attr("r", 10)
                        .style("fill", "#fff");
                    nodeEnter.append("text")
                        .attr("y", function(d) { 
                        return d.children || d._children ? -18 : 18; })
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .text(function(d) { return d.ScriptFileId; })
                        .style("fill-opacity", 1);
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