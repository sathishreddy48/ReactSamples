import React from 'react';
import * as d3 from "d3-3.5.17";


export default class Chart extends React.Component 
{
    componentDidMount()
    {
      this.drawChart();
    }      
    drawChart() {
  
        var treeData = [
            {
                "id":1,
                "name":"\\\\servername\\sharedfoldername\\1.sql",
                "children":[
                    {"id":2,"name":"\\\\servername\\sharedfoldername\\2.sql"},
                    {"id":3,"name":"\\\\servername\\sharedfoldername\\3.sql"}
                ]
            },
            {
                "id":1,
                "name":"\\\\servername\\sharedfoldername\\1.sql",
                "children":[
                    {"id":11, "name":"\\\\servername\\sharedfoldername\\11.sql",}
                ]
            },
            {
                "id":2,
                "name":"\\\\servername\\sharedfoldername\\2.sql",
                "children":[
                    {"id":4,"name":"\\\\servername\\sharedfoldername\\4.sql"},
                    {"id":5,"name":"\\\\servername\\sharedfoldername\\5.sql"}
                ]
            },
            {
                "id":3,
                "name":"\\\\servername\\sharedfoldername\\3.sql",
                "children":[
                    {"id":4,"name":"\\\\servername\\sharedfoldername\\4.sql"}
                ]
            },
            {
                "id":10,
                "name":"\\\\servername\\sharedfoldername\\10.sql",
                "children":[
                    {"id":11,"name":"\\\\servername\\sharedfoldername\\11.sql"},
                    {"id":12,"name":"\\\\servername\\sharedfoldername\\12.sql"}
                ]
            },
            {
                "id":12,
                "name":"\\\\servername\\sharedfoldername\\12.sql",
                "children":[
                    {"id":13,"name":"\\\\servername\\sharedfoldername\\13.sql"}
                ]
            },
            {
                "id":2,
                "name": "\\\\servername\\sharedfoldername\\2.sql", 
                "children": [ 
                    {"id":6,"name":"\\\\servername\\sharedfoldername\\6.sql"},
                    {"id":7,"name":"\\\\servername\\sharedfoldername\\7.sql"}
                ]
            },
            {
                "id":6,
                "name": "\\\\servername\\sharedfoldername\\6.sql",
                "children": [ 
                    {"id":8,"name": "\\\\servername\\sharedfoldername\\8.sql"}, 
                    {"id":9,"name": "\\\\servername\\sharedfoldername\\9.sql"} 
                ]
            },
        ];
            
        for (var i = treeData.length - 1; i > 0; i--) {
            for (var j = 0; j < i; j++) {
                if (treeData[i].id === treeData[j].id) {
                    if (treeData[j].children === undefined)
                        treeData[j].children = [];
                    if (treeData[i].children) {
                        treeData[i].children.forEach(function (nc) {
                            treeData[j].children.push(nc);
                        });
                    }
                    treeData.splice(i, 1);
                    break;
                }
                else {
                    var nodeDeleted = false;
                    treeData[j].children.forEach(function (c) {
                        if (!nodeDeleted && treeData[i].id === c.id) {
                            if (c.children === undefined)
                                c.children = [];
                            treeData[i].children.forEach(function (nc) {
                                c.children.push(nc);
                            });
                            treeData.splice(i, 1);
                            nodeDeleted = true;
                            return;
                        }
                    });
                    if (nodeDeleted)
                        break;
                }
            }
        }
        
        var parentData = [];
        
        function populateParentList(node){
            if(node.children || node._children){ //if children are collapsed d3 object will have them instantiated as _children
                var children = (node.children) ? node.children : node._children;
                for(var i=children.length - 1; i >= 0; i--){
                    var currentChild = children[i];
                    var childNode = parentData.find(pd => pd.childId === currentChild.id);
                    if (childNode && childNode !== undefined) {
                        childNode.parentList.push({"parentId": node.id});
                        children.splice(i, 1);
                    }
                    else {
                        parentData.push({"childId": currentChild.id, "parentList": [ {"parentId": node.id} ]});// we assume this path is the right one
                    }
                    
                    populateParentList(currentChild);
                }
            }
        }
        
        treeData.forEach(function (n) {
            populateParentList(n);
        });
        
        function searchTreeNode(data, idToSearch) {
            var nodeFound = false;
            var searchedNode = null;
            data.forEach(function (n) {
                if (!nodeFound) {
                    searchedNode = tree.nodes(n).filter(function(d) {
                        return d['id'].toString() === idToSearch.toString();
                    })[0];
                    if (searchedNode && searchedNode !== null) {
                        nodeFound = true;
                        return
                    }
                }
            });
            
            return searchedNode;
        }
        
            // ************** Generate the tree diagram *****************
            var margin = { top: 40, right: 120, bottom: 20, left: 120 },
                width = 960 - margin.right - margin.left,
                height = 900 - margin.top - margin.bottom;
            var i = 0;
            var tree = d3.layout.tree()
                .size([width, height])
                .separation(function separation(a, b) {
                    var sep = (a.parent == undefined && b.parent == undefined) ? 4 : (a.parent == b.parent ? 2 : 1);
                    return sep;
                });
            var diagonal = d3.svg.diagonal()
                .projection(function (d) { return [d.x, d.y]; });
            var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            //root = treeData[0];
            //update(root);
            
            var numberOfTrees = treeData.length;
            
            treeData.forEach(function (n, index) {
                n.x0 = width * (index + 1) / numberOfTrees;
                n.y0 = 0;
                update(n, index);
            });
            
            function update(source, index) {
                //Find if the source node already exists in the tree. If exists, add source's children to existing children
                var currentTreeNodes = svg.selectAll("g.node")[0];
                if (currentTreeNodes.length > 0)
                    var f = currentTreeNodes.find(function (value, index) {return value.__data__.id == source.id; });
                // Compute the new tree layout.
                var nodes = tree.nodes(source),
                    links = tree.links(nodes);
                // Normalize for fixed-depth.
                var childNodeCount = nodes.length;
                //source.x = (index + 2) * 120;
                source.x = source.x0;
                nodes.forEach(function (d, childIndex) { 
                    //d.x = source.x + (childIndex - childNodeCount / 2) * 30; 
                    d.y = d.depth * 180; 
                });
                // Declare the nodes
                var node = svg.selectAll("g.node")
                    .data(nodes, function (d) { return d.id || (d.id = ++i); });
                // Enter the nodes.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                nodeEnter.append("circle")
                    .attr("r", 10)
                    .style("fill", "#fff")
                    .on("mouseover", function(d) {
                        highlightScriptNodeAndRow(d.id, true);
                    })
                    .on("mouseout", function(d) {
                        highlightScriptNodeAndRow(d.id, false);
                    });
           
                    
                nodeEnter.append("text")
                    .attr("y", function (d) {
                        return d.children || d._children ? -20 : 20;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function (d) { return d.id; })
                    .style("fill-opacity", 1);
                // Declare the linksâ€¦
                var link = svg.selectAll("path.link")
                    .data(links, function (d) { return d.target.id; });
                // Enter the links.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", diagonal);
                    
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }
            
            var multiParents = [];
            parentData.forEach(function (pd) {
                if (pd.parentList.length > 1) {
                    for (var i = 1; i < pd.parentList.length; i++) {
                        var couplingParent = searchTreeNode(treeData, pd.parentList[i].parentId);
                        var couplingChild = searchTreeNode(treeData, pd.childId);
                        
                        multiParents.push({ parent: couplingParent, child: couplingChild });						
                    }
                } 
            });
            
            multiParents.forEach(function(multiPair) {
                svg.append("path", "g")
                .attr("class", "link")
                .attr("d", function() {
                    var oTarget = {
                        x: multiPair.parent.x0,
                        y: (multiPair.parent.y0 + 10)
                    };
                    var oSource = {
                        x: multiPair.child.x0,
                        y: (multiPair.child.y0 - 10)
                    };
                    /*if (multiPair.child.depth === multiPair.parent.depth) {
                        return "M" + oSource.y + " " + oSource.x + " L" + (oTarget.y + ((Math.abs((oTarget.x - oSource.x))) * 0.25)) + " " + oTarget.x + " " + oTarget.y + " " + oTarget.x;
                    }*/
                    return diagonal({
                        source: oSource,
                        target: oTarget
                    });
                });
            });
            
            var table = document.createElement("table");
            table.id = "scriptlist-table";
            table.classList.add("script-table");
            var tableHeader = document.createElement("thead");
            var headerRow = document.createElement("tr");
            var headerCell = document.createElement("th");
            headerCell.innerText = "Id";
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.innerText = "Script Path";
            headerRow.appendChild(headerCell);
            headerCell = document.createElement("th");
            headerCell.innerText = "Status";
            headerRow.appendChild(headerCell);
            table.appendChild(headerRow);
                    
            var q = [];
            treeData.forEach(function (n) {
                q.push(n);
            });
            
            while(q.length > 0) {
                var n = q.shift();
                var row = document.createElement("tr");
                var attr = document.createAttribute("data-id");
                attr.value = n.id;
                row.attributes.setNamedItem(attr);
                var cell = document.createElement("td");
                cell.innerText = n.id;
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.innerText = n.name;
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.innerText = "";
                row.appendChild(cell);
                var tableBody = document.createElement("tbody");
                table.appendChild(tableBody);
                
                row.onmouseover = function (e) {
                    highlightScriptNodeAndRow(this.attributes.getNamedItem("data-id").value, true);
                }
                
                row.onmouseout = function (e) {
                    highlightScriptNodeAndRow(this.attributes.getNamedItem("data-id").value, false);
                }
                tableBody.appendChild(row);
                
                if (n.children && n.children !== null) {
                    n.children.forEach(function (c) {
                        q.push(c);
                    });
                }
            }
            document.body.appendChild(table);
            
            function highlightScriptNodeAndRow(id, state) {
                var rows = document.getElementsByTagName("tr");
                for(var i = 0; i < rows.length; i++) {
                    var tr = rows[i];
                    tr.classList.remove("highlight");
                    if (state && tr.attributes.getNamedItem("data-id") && tr.attributes.getNamedItem("data-id").value.toString() === id.toString())
                        tr.classList.add("highlight");
                }
                
                var allNodes = svg.selectAll("g.node")[0];
                var searchedNode = allNodes.filter(function (n) {
                    n.childNodes[0].classList.remove("highlight");
                    return n.__data__.id.toString() === id.toString();
                })[0];
                if (state && searchedNode && searchedNode != null) {
                    searchedNode.childNodes[0].classList.add("highlight");
                }
            }      
 
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
      

