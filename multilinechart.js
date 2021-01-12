
showmultilinechart('Quebec');
function showmultilinechart(region)
{
  if(document.getElementById('linechart'))
  document.getElementById('linechart').remove()
var color=['orange','green','red'];
var label = d3.select(".label");
// set the dimensions and margins of the graph
var	margin = {top: 50, right: 250, bottom: 30, left: 60},
	width = 800 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;

// parse the date / time
//var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scale.linear()
      .range([0, width]);
 var y = d3.scale.linear()
      .range([height, 0]);

var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(10);
 
var	yAxis = d3.svg.axis().scale(y)
    .orient("left")
    .ticks(10);

// define the 1st line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.totalCases); });

// define the 2nd line
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.recovered); });

var valueline3 = d3.svg.line()
       .x(function(d) { return x(d.date); })
       .y(function(d) { return y(d.deaths); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#weekwise_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('id', 'linechart')
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data.json", function(error, data) {
   let totaldata=data;
   let arr=[];
   let array1=['TotalCases','Recovered','Deaths'];
   var ymax=0;
    const maindata = Object.keys(data[region]['weeks']).map(function(d) {
        let  obj={};
        data[region]['weeks'][d].date =(Number(d));
          arr.push(Number(d));
          if(data[region]['weeks'][d]['totalCases']>ymax)
         {
             ymax=data[region]['weeks'][d]['totalCases'];
         }
          return obj;
         

        });
        
        console.log(Math.min(...arr), Math.max(...arr));
        data=Object.values(data[region]['weeks'])
	// Scale the range of the data
	x.domain([Math.min(...arr), Math.max(...arr)]);
	y.domain([0, ymax]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line1")
      .style("stroke", "orange")
      .style("fill",'none')
      .style("opacity", "0.5")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line2")
      .style("stroke", "green")
      .style("fill",'none')
      .style("opacity", "0.5")
      .attr("d", valueline2);
  svg.append("path")
      .data([data])
      .attr("class", "line3")
      .style("stroke", "red")
      .style("fill",'none')
      .style("opacity", "0.5")
      .attr("d", valueline3);

  // Add the X Axis
  svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
    svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top + height -20)
    .style("text-anchor", "end")
    .text("weeks");
	// Add the Y Axis
	svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .text("Number of Cases")
      		// Add the valueline path.
		svg.selectAll("line1")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 3)
	  .attr("cx", function(d) {
	    return x(d.date)
	  })
	  .attr("cy", function(d) {
	    return y(d.totalCases)
    })
    .style("fill","orange")
    .style("cursor", "pointer")
	  .on("mouseover", function(d,i) {
      console.log('mouse:',d);
   label.style("transform", "translate("+ x(d.date+1) +"px," + (y(d.totalCases-10)) +"px)")
   label.text(d.totalCases)
  
}).on("mouseout",function(d,i) {
  label.text('')
 
});
svg.selectAll("line2")
		.data(data)
		.enter()
    .append("circle")
		.attr("r", 3)
	  .attr("cx", function(d) {
	    return x(d.date)
	  })
	  .attr("cy", function(d) {
	    return y(d.recovered)
    })
    .style("fill","green")
    .style("cursor", "pointer")
	  .on("mouseover", function(d,i) {
  console.log('mouse:',d);
   label.style("transform", "translate("+ x(d.date+1) +"px," + (y(d.recovered)) +"px)")
   label.text(d.recovered)
  
}).on("mouseout",function(d,i) {
   label.text('')
  
})
svg.selectAll("line3")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", 3)
	  .attr("cx", function(d) {
	    return x(d.date)
	  })
	  .attr("cy", function(d) {
	    return y(d.deaths)
    })
    .style("fill","red")
    .style("cursor", "pointer")
	  .on("mouseover", function(d,i) {
  console.log('mouse:',d);
   label.style("transform", "translate("+ x(d.date+1) +"px," + (y(d.deaths)) +"px)")
   label.text(d.deaths)
  
}).on("mouseout",function(d,i) {
  label.text('')
 
});


var legend = svg.selectAll('#weekwise_chart')
      .data(array1)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d,i) {
        console.log('d',d)
        return color[i];
      });

    legend.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d;
      });


var title = "Number of Cases each Week ";

svg.append("g")
  .append("text")
  .text(title)
  .attr("class", "title")
  .attr("x", width / 2)
  .style("text-anchor","middle")
  .style("color","black")
  .attr("y", -margin.top+20);

 requirement(totaldata,region);

});
}
function requirement(data,region){
  var label = d3.select(".circlecolor");
  var label1 = d3.select(".textvalue");
  

var recoveryrate = data[region].recovered['Yes']/data[region].cases;
var deathrate = data[region].death['Yes']/data[region].cases;
var responseRate =  recoveryrate-deathrate ;
console.log('responseRate:',responseRate)
if(responseRate>0.5){
  label1.text("Safe & Good");
  label.style('fill','green');
  label.style('stroke','green');
  label1.style('font-size','16');
  
}
else if (0.5>responseRate>0)
{
  label.style('fill','red');
  label1.text("IN EMERGENCY ");
  label.style('stroke','red');
  label1.style('font-size','12');
  
}
else{
  label1.text("NEED HELP");
  label.style('stroke','red');
}
}
