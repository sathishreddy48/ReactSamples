import React from 'react';
import * as d3 from "d3";

export default class TreeComponent extends React.Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {

        // const treeData = [
        //     {
        //         id: 1,
        //         name: "\\\\servername\\sharedfoldername\\1.sql",
        //         children: [
        //             { id: 2, name: "\\\\servername\\sharedfoldername\\2.sql" },
        //             { id: 3, name: "\\\\servername\\sharedfoldername\\3.sql" }
        //         ]
        //     },
        //     {
        //         id: 1,
        //         name: "\\\\servername\\sharedfoldername\\1.sql",
        //         children: [
        //             { id: 11, name: "\\\\servername\\sharedfoldername\\11.sql", }
        //         ]
        //     },
        //     {
        //         id: 2,
        //         name: "\\\\servername\\sharedfoldername\\2.sql",
        //         children: [
        //             { id: 4, name: "\\\\servername\\sharedfoldername\\4.sql" },
        //             { id: 5, name: "\\\\servername\\sharedfoldername\\5.sql" }
        //         ]
        //     },
        //     {
        //         id: 3,
        //         name: "\\\\servername\\sharedfoldername\\3.sql",
        //         children: [
        //             { id: 4, name: "\\\\servername\\sharedfoldername\\4.sql" }
        //         ]
        //     },
        //     {
        //         id: 10,
        //         name: "\\\\servername\\sharedfoldername\\10.sql",
        //         children: [
        //             { id: 11, name: "\\\\servername\\sharedfoldername\\11.sql" },
        //             { id: 12, name: "\\\\servername\\sharedfoldername\\12.sql" }
        //         ]
        //     },
        //     {
        //         id: 12,
        //         name: "\\\\servername\\sharedfoldername\\12.sql",
        //         children: [
        //             { id: 13, name: "\\\\servername\\sharedfoldername\\13.sql" }
        //         ]
        //     },
        //     {
        //         id: 2,
        //         name: "\\\\servername\\sharedfoldername\\2.sql",
        //         children: [
        //             { id: 6, name: "\\\\servername\\sharedfoldername\\6.sql" },
        //             { id: 7, name: "\\\\servername\\sharedfoldername\\7.sql" }
        //         ]
        //     },
        //     {
        //         id: 6,
        //         name: "\\\\servername\\sharedfoldername\\6.sql",
        //         children: [
        //             { id: 8, name: "\\\\servername\\sharedfoldername\\8.sql" },
        //             { id: 9, name: "\\\\servername\\sharedfoldername\\9.sql" }
        //         ]
        //     },
        // ];

        var treeData =
        {

            "name": "Root",
            "children": [
                {
                    "name": " A",
                    "children": [
                        { "name": "Child - A-1" },
                        { "name": "Child - A-2" }
                    ]
                },
                {
                    "name": "B",
                    "children": [
                        { "name": "Child - B-1" },
                        { "name": "Child - B-2" }
                    ]
                },
                { "name": "C" },
                { "name": "D" },
                { "name": "Child - A-2" }
            ]
        };



        // set the dimensions and margins of the diagram
        var margin = { top: 40, right: 90, bottom: 50, left: 90 },
            width = 660 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // declares a tree layout and assigns the size
        var treemap = d3.tree()
            .size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function (d) {
                return "M" + d.x + "," + d.y
                    + "C" + d.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                    + " " + d.parent.x + "," + d.parent.y;
            });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" +
                    (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // adds the circle to the node
        node.append("circle")
            .attr("r", 10);

        // adds the text to the node
        node.append("text")
            .attr("dy", ".35em")
            .attr("y", function (d) { return d.children ? -20 : 20; })
            .style("text-anchor", "middle")
            .text(function (d) { return d.data.name; });













        //  ################  Working code #######################

        //     var root = d3.hierarchy(treeData.data)
        //     console.log(root);
        //    // var root = d3.hierarchy(treeData)
        //     var treeLayout = d3.tree();
        //     treeLayout.size([600, 300]);
        //     treeLayout(root);

        //     var nodes = d3.select('svg g.nodes')
        //     .selectAll('g')
        //     .data(root.descendants())
        //     .enter()
        //     .append('g')
        //     .attr('root', function(d) {return 'translate(' + [d.x, d.y] + ')'});

        //     nodes.append('circle')
        //          .classed('node', true)
        //         .attr('cx', function (d) {// console.log(d.data.name); 
        //             return d.x; })
        //         .attr('cy', function (d) { return d.y; })
        //         .attr('r', 10)   
        //         .style("fill", "Red");          

        //     nodes.append('text')
        //                   .attr('dx', function (d) {// console.log(d.data.name); 
        //                         return d.x; })
        //                 .attr('dy', function (d) { return d.y; })                                            
        //                 .attr("text-anchor", function (d) {
        //                       return d.children || d._children ? "end" : "start";
        //               })
        //             .text(function (d) {console.log(d.data.name); return d.data.name; })
        //             .style("fill-opacity", 1); 

        //     // Links
        //     d3.select('svg g.links')
        //         .selectAll('path.link')
        //         .data(root.links())
        //         .enter()
        //         .append('line')
        //         .attr('class', 'link')
        //         .attr('x1', function (d) { return d.source.x; })
        //         .attr('y1', function (d) { return d.source.y; })
        //         .attr('x2', function (d) { return d.target.x; })
        //        .attr('y2', function (d) { return d.target.y; });


        //  ################  Working code  END #######################



    }

    render() {
        return (
            <div id="main" style={{ margin: "10%" }}>
                {/* <svg width="750" height="320">
                    <g transform="translate(5, 5)">
                        <g class="links"></g>
                        <g class="nodes"></g>
                    </g>
                </svg> */}
            </div>
        );

    }

}