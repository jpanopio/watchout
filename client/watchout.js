// start slingin' some d3 here.
  var enemyData = [];
  for (var i = 0; i < 10; i++) {
    enemyData.push({'index': i,'x':10, 'y':50});
  }
var makeEnemies = function() {
  var svgElement = d3.select('.board').selectAll('svg').data([1])  
    .enter().append('svg')
    .style({width: 700 + 'px', height: 500 + 'px'});

  var enemies = d3.select('.board').select('svg').selectAll('image').data(enemyData)
    .enter()
    .append('image')
    .attr('xlink:href', 'asteroid.png')
    .style({width: 50 + 'px', height: 50 + 'px'});
};

makeEnemies(10);

// d3.select('.board').eappend(enemies);
var move = function() {
  d3.select('.board').selectAll('svg').selectAll('image').data(enemyData)  
  .transition().duration(1000).attr('transform', 'translate(100, 500)');
}

