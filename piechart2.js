showpiechart1('Quebec')
function showpiechart1(region)
{
    if(document.getElementById('piechart1'))
  document.getElementById('piechart1').remove()
  if(document.getElementById('pie-legend1'))
  document.getElementById('pie-legend1').remove()
var width = 300;          //width
var height = 180;        //height
var r = 140/2;   //radius of the pie-chart
var total=0;
var colors=['#fdb863','#6facf2'];
d3.json("data.json", function(error, data) {

var total=0;
Object.keys(data[region]['transmission']).map((key,i)=>{
    total+=data[region]['transmission'][key];
})
// }

const maindata = [];
var pie_data=[];
 // simple logic to calculate percentage data for the pie
Object.keys(data[region]['transmission']).map((key,i)=>{
    pie_data.push(data[region]['transmission'][key]/total)*100;
    maindata.push({value:Math.round((data[region]['transmission'][key]/total)*100),color:colors[i]})
    
})

                var vis = d3.select("#pie_chart1")
                .append("svg:svg")  
                .attr('id', 'piechart1')            //create the SVG element inside the <body>
                .data([maindata])                   //associate our data with the document
                    .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                    .attr("height", height)
                .append("svg:g")                //make a group to hold our pie chart
                    .attr("transform", "translate(" + width/2 + "," + height/2 + ")")    //move the center of the pie chart from 0, 0 to radius, radius
        
            var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
                .outerRadius(r);
        
            var pie = d3.layout.pie()           //this will create arc data for us given a list of values
                .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
        
            var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
                .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
                .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                    .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                        .attr("class", "slice");    //allow us to style things in the slices (like text)
        
                arcs.append("svg:path")
                        .attr("fill", function(d, i) { return colors[i]; } ) //set the color for each slice to be chosen from the color function defined above
                        .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
        
                arcs.append("svg:text")                                     //add a label to each slice
                        .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                        //we have to make sure to set these before calling arc.centroid
                        d.innerRadius = 0;
                        d.outerRadius = r;
                        return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
                    })
                    .attr("text-anchor", "middle")                          //center the text on it's origin
                    .text(function(d, i) { return maindata[i].value+'%'; });  //get the label from our original data array
                    
                    
                    var pieLegend = d3.select("#pie_chart1")
                        .append("div")
                        .attr("id", "pie-legend1");
                    Object.keys(data[region]['transmission']).map((key,i)=>{
                        
                        pieLegend.append("i")
                                .style("background", colors[i])
                                .style("padding", "5px")
                                .style("color", "black")
                                .text(key);
                        
                    })
                    pieLegend.append("div")
                .html("<strong> Transmission of Cases</strong>")
                .style("color", "#008080")
                .style("margin-top", "35px");

});
}