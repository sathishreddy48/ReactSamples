import React from 'react';
//import * as d3 from "d3";
import * as d3 from "d3-3.5.17";
export default class PreparingTree extends React.Component {
    componentDidMount() {
        this.PrepareTree();
    }
    PrepareTree() {
        var treeData = [
            {
                "ScriptFileId": 1,
                "FilePath": "\\\\servername\\sharedfoldername\\1.sql",
                "children": [
                    { "ScriptFileId": 2, "FilePath": "\\\\servername\\sharedfoldername\\2.sql" },
                    { "ScriptFileId": 3, "FilePath": "\\\\servername\\sharedfoldername\\3.sql" }
                ]
            },
            {
                "ScriptFileId": 1,
                "FilePath": "\\\\servername\\sharedfoldername\\1.sql",
                "children": [
                    { "ScriptFileId": 11, "FilePath": "\\\\servername\\sharedfoldername\\11.sql", }
                ]
            },
            {
                "ScriptFileId": 2,
                "FilePath": "\\\\servername\\sharedfoldername\\2.sql",
                "children": [
                    { "ScriptFileId": 4, "FilePath": "\\\\servername\\sharedfoldername\\4.sql" },
                    { "ScriptFileId": 5, "FilePath": "\\\\servername\\sharedfoldername\\5.sql" }
                ]
            },
            {
                "ScriptFileId": 3,
                "FilePath": "\\\\servername\\sharedfoldername\\3.sql",
                "children": [
                    { "ScriptFileId": 4, "FilePath": "\\\\servername\\sharedfoldername\\4.sql" }
                ]
            },
            {
                "ScriptFileId": 10,
                "FilePath": "\\\\servername\\sharedfoldername\\10.sql",
                "children": [
                    { "ScriptFileId": 11, "FilePath": "\\\\servername\\sharedfoldername\\11.sql" },
                    { "ScriptFileId": 12, "FilePath": "\\\\servername\\sharedfoldername\\12.sql" }
                ]
            },
            {
                "ScriptFileId": 12,
                "FilePath": "\\\\servername\\sharedfoldername\\12.sql",
                "children": [
                    { "ScriptFileId": 13, "FilePath": "\\\\servername\\sharedfoldername\\13.sql" }
                ]
            },
            {
                "ScriptFileId": 81,
                "FilePath": "\\\\servername\\sharedfoldername\\81.sql",
                "children": [

                ]
            },
            {
                "ScriptFileId": 82,
                "FilePath": "\\\\servername\\sharedfoldername\\82.sql",

            },
            {
                "ScriptFileId": 2,
                "FilePath": "\\\\servername\\sharedfoldername\\2.sql",
                "children": [
                    { "ScriptFileId": 6, "FilePath": "\\\\servername\\sharedfoldername\\6.sql" },
                    { "ScriptFileId": 7, "FilePath": "\\\\servername\\sharedfoldername\\7.sql" }
                ]
            },
            {
                "ScriptFileId": 6,
                "FilePath": "\\\\servername\\sharedfoldername\\6.sql",
                "children": [
                    { "ScriptFileId": 8, "FilePath": "\\\\servername\\sharedfoldername\\8.sql" },
                    { "ScriptFileId": 9, "FilePath": "\\\\servername\\sharedfoldername\\9.sql" }
                ]
            },
        ];
        let Independet = [];
        let MultiParent = [];
        let Parentchilds = [];
        let sortedParentchilds = [];
        let SingleParentchilds = [];
        let RootElements = []; let Values = [];
        let modifiedTreeData = [];
        FindIndependentScripts(treeData);

        function FindIndependentScripts(treeData) {
            // Getting Independent Nodes 
            treeData.forEach(element => {
                if (element.children === undefined || element.children.length === 0) {
                    Independet.push(element);
                }
            });
            //End Of Getting Independent Nodes            
            //Getting Multi Parent Nodes
            treeData.forEach(e => {
                if (e.children !== undefined && e.children.length !== 0) {
                    e.children.forEach(child =>
                        Parentchilds.push({ 'Parent': e.ScriptFileId, 'Child': child.ScriptFileId })
                    )
                }
            });

            // Sorting parent child in order . 
            sortedParentchilds = Parentchilds.sort((a, b) => a.Parent - b.Parent);
            sortedParentchilds.forEach((Topelem) => {
                var ismultiparent = false;
                sortedParentchilds.forEach(elm => {
                    if (elm.Child === Topelem.Child && elm.Parent !== Topelem.Parent) {
                        MultiParent.push({ 'Parent': elm.Parent, 'Child': elm.Child })
                        ismultiparent = true;
                    }
                })
                if (!ismultiparent) {
                    console.log('Single parent childs ' + Topelem.Parent + ' ' + Topelem.Child)
                    SingleParentchilds.push({ 'Parent': Topelem.Parent, 'Child': Topelem.Child });
                }


            })
            MultiParent = MultiParent.sort((a, b) => a.Child - b.Child);

            console.log(SingleParentchilds);

            SingleParentchilds.map((x) => Values.push(x.Child));
            console.log('only values ' + Values);
            SingleParentchilds.forEach((element) => {
                if (Values.indexOf(element.Parent) === -1 && RootElements.indexOf(element.Parent) === -1) {
                    RootElements.push(element.Parent);
                    console.log('Parent   ' + element.Parent + '  Child ' + element.Child)
                    // modifiedTreeData.push({'Parent':element.Parent,'Child':element.Child});
                    console.log(element.Parent);
                }
            }
            );
        }
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
        var svg = d3.select("#Tree").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // var numberOfTrees = modifiedTreeData.length;
        var numberOfTrees = SingleParentchilds.length;

        printIndependentFiles(SingleParentchilds);
        function printIndependentFiles(datatoprint) {
            console.log('Printing ..');
            datatoprint.forEach(element => {
                console.log('Parent ' + element.Parent + '  Child' + element.Child);
                if (element.Parent)
                    modifiedTreeData.push({ 'Parent': element.Parent, 'Child': element.Child });
            });
        }



        SingleParentchilds.forEach(function (n, index) {
            n.x0 = width * (index + 1) / numberOfTrees;
            n.y0 = 0;
            update(n, index);
        });
        function update(source, index) {
            //Find if the source node already exists in the tree. If exists, add source's children to existing children
            var currentTreeNodes = svg.selectAll("g.node")[0];
            if (currentTreeNodes.length > 0)
                var f = currentTreeNodes.find(function (value, index) { return value.__data__.id == source.id; });
            // Compute the new tree layout.
            var nodes = tree.nodes(source),
                links = tree.links(nodes);
            // Normalize for fixed-depth.
            var childNodeCount = nodes.length;
            //source.x = (index + 2) * 120;
            source.x = source.x0;
            nodes.forEach(function (d, childIndex) {
                //d.x = source.x + (childIndex - childNodeCount / 2) * 30; 
                d.y = d.depth * 100;
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
            // .on("mouseover", function (d) {
            //     highlightScriptNodeAndRow(d.id, true);
            // })
            // .on("mouseout", function (d) {
            //     highlightScriptNodeAndRow(d.id, false);
            // });


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

            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }







        //Console check ..!!!!
        // printParentChild(sortedParentchilds);
        // function printParentChild(sortedParentchilds)
        // {
        //     console.log('Inside printParentChild')
        //     sortedParentchilds.forEach(element => {
        //         console.log('Parent : '+element.Parent+' Child : '+element.Child);
        //     });
        //     console.log('End printParentChild')
        // }

        // printMParentChild(MultiParent);
        // function printMParentChild(MultiParent)
        // {
        //     console.log('Inside multi parent')
        //     MultiParent.forEach(element => {
        //         console.log('MultiParent Parent : '+element.Parent+' Child : '+element.Child);
        //     });
        // }

        // function printIndependentFiles(Independet)
        // {
        //     Independet.forEach(element => {
        //         console.log(element.ScriptFileId);
        //     });
        // }



    }

    render() {
        return (
            <div id="Tree">

            </div>
        );

    }
}