showbarchart1('Quebec');
function showbarchart1(region){
  if(document.getElementById('barchart1'))
  document.getElementById('barchart1').remove()
var margin = {top: 60, right: 20, bottom: 100, left: 65},
    width = 420 - margin.left - margin.right,
    height = 320 - margin.top - margin.bottom;



// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .25);

var y = d3.scale.linear().range([height, 0]);
var arr=['HCW- Health care workers','S/D care- School/Day care attendees','LTCR- Long Term Care Residents']
// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5);
    


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("#barchart_display").append("svg")
.attr('id','barchart1')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("data.json", function(error, data) {
   console.log(data);
    const maindata = Object.keys(data[region]['occupation']).map(function(d) {
      let  obj={}
        obj.Letter = d;
        obj.Freq = +data[region]['occupation'][d];
        
        return obj;

    });
	console.log(maindata);
  // scale the range of the data
  x.domain(maindata.map(function(d) { return d.Letter; }));
//   y.domain([0,0]);
  y.domain([0, d3.max(maindata, function(d) { return d.Freq; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
    .attr("transform", "translate(15,0)rotate(0)")
    .style("text-anchor", "end")
    .style("font-size", 12)
    .style("fill", "black");
      

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+25)
    .attr("x", -margin.top+5)
    .text("Number of Cases")
    svg.append("text")
    .attr("x", width-20)
    .attr("y", margin.top + height -20)
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .text("Occupation");

  // Add bar chart
  svg.selectAll("bar")
      .data(maindata)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d.Freq); })
      .append("svg:title") // TITLE APPENDED HERE
      .text(function(d) { return d.Freq; });

var title = "Number of Confirmed Cases by Occupation";

svg.append("g")
  .append("text")
  .text(title)
  .attr("class", "title")
  .attr("x", width / 2)
  .style("text-anchor","middle")
  .style("color","black")
  .attr("y", -margin.top+20);

  var legend_text = svg.selectAll("legend_text")
      .data(arr)
      .enter();

    legend_text.append("text")
      .attr("class", "legend_text")
      .attr("x", -margin.left+10)
      .attr("y", function(d, i) {
        return (i * 20) +margin.bottom+100;
      })
      .attr("dy", "0.32em")
      .style("font-weight", "")
      .text(function(d) {
        return d;
      });

});
}