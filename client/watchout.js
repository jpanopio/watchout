// start slingin' some d3 here.
var enemyData = [];
n=10;

var makeEnemies = function() {
  for (var i = 0; i < n; i++) {
    enemyData.push({'index': i, 'x': Math.floor(Math.random()*600) + 50, 'y': Math.floor(Math.random()*400) + 50});
  }

  var svgElement = d3.select('.board').selectAll('svg').data([1])  
    .enter().append('svg')
    .style({width: 700 + 'px', height: 500 + 'px'});

  var enemies = d3.select('.board').select('svg').selectAll('image').data(enemyData, function(d) {return d.index;})
    .enter()
    .append('image')
    .attr('xlink:href', 'asteroid.png')
    .style({width: 50 + 'px', height: 50 + 'px'})
    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y});
    // .style({top: function(d){return d.x+ 'px'}, left: function(d){return d.y + 'px'}});
    /*.style(function(d) {{width: d.x + 'px', height: d.y + 'px'}});*/
};

makeEnemies(10);

// d3.select('.board').eappend(enemies);
var move = function() {
  for (var i = 0; i < n; i++) {
    var tempObj = enemyData[i];
    console.log(enemyData[i]);
    tempObj['x'] = Math.floor(Math.random()*600) + 50;
    tempObj['y'] = Math.floor(Math.random()*400) + 50;
  }

  d3.select('.board').selectAll('svg').selectAll('image').data(enemyData, function(d) {return d.index;})  
  .transition().duration(1000)
  .attr('x', function(d){return d.x})
  .attr('y', function(d){return d.y});

  //.attr('transform', 'translate(100, 500)');
}

setInterval(move, 500);