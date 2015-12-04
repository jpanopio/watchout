// start slingin' some d3 here.
var enemyData = [];
for (var i = 0; i < 10; i++) {
  enemyData.push({'index': i,'x':'x', 'y':'y'});
}


var enemies = d3.select('.board').selectAll('svg').data(enemyData)  
  .enter().append('svg')
  .style({width: 50 + 'px', height: 50 + 'px'})
  .append('image')
  .attr('xlink:href', 'asteroid.png')
  .style({width: 50 + 'px', height: 50 + 'px'});






// makeEnemies(10);

// d3.select('.board').eappend(enemies);