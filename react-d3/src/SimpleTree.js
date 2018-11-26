import React from 'react';
import * as d3 from "d3-3.5.17";
export default class SimpleTree extends React.Component {
  componentDidMount() {
    this.PrepareTree();
  }
  PrepareTree() {
    var treeData = [{
        "SystemTag": "MSQ",
        "ScriptGroupId": 2,
        "PatchId": 1,
        "ReleaseStatus": "Pending",
        "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\04\\Patch1_SC1_MSQ-ECDM_Deployment_20181003101020.sql",
        "ScriptFileId": 5,
        "children": [{
            "ScriptFileId": 6,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 7,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending",
            "children": [{
              "ScriptFileId": 10,
              "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
              "Status": "Pending",
              "children": [
                {
                "ScriptFileId": 11,
                "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                "Status": "Pending"
                },
                {
                  "ScriptFileId": 12,
                  "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                  "Status": "Pending"
                  },
                  {
                    "ScriptFileId": 13,
                    "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                    "Status": "Pending"
                    }
             ]
            }]
          },
          {
            "ScriptFileId": 8,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 9,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending",
            "children": [
              {
              "ScriptFileId": 12,
              "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
              "Status": "Pending"
              },
              {
                "ScriptFileId": 13,
                "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
                "Status": "Pending"
                }
            ]
          }
        ],
      },
      {
        "SystemTag": "MSQ",
        "ScriptGroupId": 2,
        "PatchId": 1,
        "ReleaseStatus": "Pending",
        "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\04\\Patch1_SC1_MSQ-ECDM_Deployment_20181003101020.sql",
        "ScriptFileId": 1,
        "children": [{
            "ScriptFileId": 2,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 3,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 4,
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
        "ScriptFileId": 21,
        "children": [{
            "ScriptFileId": 22,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 23,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          },
          {
            "ScriptFileId": 24,
            "FilePath": "\\\\I01BA1CSQLDOM02\\CDConfigurationScripts\\MSQ-ECDM\\2018\\10\\05\\Patch1_SC2_MSQ-ECDM_Deployment_20181003101020.sql",
            "Status": "Pending"
          }
        ]
      }
    ];

    var NoofRoots=treeData.length;
    // ************** Generate the tree diagram  *****************
    var margin = {top: 20,right: 0,bottom: 0, left:0 },
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;
    var i = 0;
    for (var k = 0; k < NoofRoots; k++) 
    {
       var widthper = (width);
           d3.select("#Trees").append('div')
               .attr('id', 'Tree'+k)
               .attr('display', ' flex:' + widthper)
            var tree = d3.layout.tree().size([height, width]);
            var diagonal = d3.svg.diagonal().projection(function (d) {
              return [d.x, d.y];
            });
      var svg = d3.select("#Tree" + k).append("svg")
        .attr('id', 'svg' + k)
        .attr("width", (width/NoofRoots)+ margin.right + margin.left)
        .attr("height", height+margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top+ ")");

      let  root = treeData[k];
      update(root);
      function update(root) 
      {
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
       
        nodes.forEach(function (d) { d.y = d.depth * 80;});       
        var node = d3.select('#svg'+k).selectAll("g.node")
                     .data(nodes, function (d) {return d.id || (d.id = ++i);});
        // Enter the nodes.
        var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
                var y= d.y===0? 25:d.y;
                  
            return "translate(" + d.x + "," +y+ ")";
          });

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

        // Declare the linksâ€¦
        var link = svg.selectAll("path.link")
          .data(links, function (d) {
            return d.target.id;
          });

        // Enter the links.
        link.enter().insert("path", "g")
          .attr("class", "link")
          .style("stroke", function(d) { return d.target.level; })
          .attr("d", diagonal);
          //.attr("d", diagonal);

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
