// start slingin' some d3 here.

var rand = function(num) {
  return Math.floor(Math.random()*num);
};

var enemyData = [];

var n=20;

for (var i = 0; i < n; i++) {
  enemyData.push({
    'index': i, 
    'x': rand(width), 
    'y': rand(height)
  });
}

var height = 0.9 * window.innerHeight;
var width = 0.9 * window.innerWidth;


var svgElement = d3.select('.board').selectAll('svg').data([1])  
    .enter().append('svg')
    .style({width: width + 'px', height: height + 'px'});


var fighterData = [{'index': 1, 'x': rand(width), 'y': rand(height)}];


var dragmove = function(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  fighter.attr("transform", "translate(" + x + "," + y + ")");
  fighterData[0]['x'] = x;
  fighterData[0]['y'] = y;
}


var drag = d3.behavior.drag().on("drag", dragmove);

var fighter = svgElement.selectAll('circle')
    .data(fighterData, function(d) {return d.index;})
    .enter()
    .append('circle')
    .attr('r', '25')
    .attr('fill', 'red')
    .call(drag);


var enemies = d3.select('.board').select('svg').selectAll('image').data(enemyData, function(d) {return d.index;})
    .enter()
    .append('image')
    .attr('xlink:href', 'asteroid.png')
    .style({width: 50 + 'px', height: 50 + 'px'})
    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y});


var move = function() {
  for (var i = 0; i < n; i++) {
    enemyData[i]['x'] = rand(width);
    enemyData[i]['y'] = rand(height);
  }

  // IMPROVE TWEEN!
  d3.select('.board').selectAll('svg').selectAll('image').data(enemyData, function(d) {return d.index;})  
  .transition()
  .tween(null, function() {
    var fighterXIndex = fighterData[0]['x'];
    var fighterYIndex = fighterData[0]['y'];

    for(var i = 0; i < enemyData.length; i++) {
      var moverXIndex = enemyData[i]['x'] + 25;
      var moverYIndex = enemyData[i]['y'] + 25;
      if (Math.sqrt(Math.pow((fighterXIndex - moverXIndex),2) + Math.pow((fighterYIndex - moverYIndex),2)) < 50) {
        console.log('Collision!!!');
      }
    }
  })
  .duration(1000)
  .attr('x', function(d){return d.x})
  .attr('y', function(d){return d.y});
};



setInterval(move, 500);




