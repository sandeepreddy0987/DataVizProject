showbarchart('Quebec');
function showbarchart(region){
  if(document.getElementById('barchart'))
  document.getElementById('barchart').remove()
var margin = {top: 60, right: 60, bottom: 50, left: 70},
    width = 650 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .15);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(8);


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg = d3.select("#chart_display").append("svg")
.attr('id','barchart')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .text("Cases by age")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("data.json", function(error, data) {
   console.log(data);
    const maindata = Object.keys(data[region]['ageGroup']).map(function(d) {
      let  obj={}
        obj.age = d;
        obj.cases = +data[region]['ageGroup'][d];
        
        return obj;

    });
	console.log(maindata);
  // scale the range of the data
  x.domain(maindata.map(function(d) { return d.age; }));
  y.domain([0,0]);
  y.domain([0, d3.max(maindata, function(d) { return d.cases; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top + height -20)
    .style("text-anchor", "end")
    .text("Age group");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+30)
      .attr("x", -margin.top)
      .text("Number of Cases")


  // Add bar chart
  svg.selectAll("bar")
      .data(maindata)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.age); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.cases); })
      .attr("height", function(d) { return height - y(d.cases); })
      .append("svg:title") // TITLE APPENDED HERE
    .text(function(d) { return d.cases; });
      


var title = "Number of Confirmed Cases by AgeGroup";

svg.append("g")
  .append("text")
  .text(title)
  .attr("class", "title")
  .attr("x", width / 2)
  .style("text-anchor","middle")
  .style("color","black")
  .attr("y", -margin.top+20);

});}