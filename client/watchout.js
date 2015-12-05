// start slingin' some d3 here.

var rand = function(num) {
  return Math.floor(Math.random()*num);
};

var enemyData = [];
var score = 0;
var collisionCount = 0;
var highScore = 0;
var n=2;

var height = 700;
var width = 500;
// var height = 0.9 * window.innerHeight;
// var width = 0.9 * window.innerWidth;
for (var i = 0; i < n; i++) {
  enemyData.push({
    'index': i, 
    'x': rand(width), 
    'y': rand(height)
  });
}



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

var incrementCollision = function() {
  collisionCount++;
  d3.select('.collisions').text('Collisions: ' + collisionCount);
  if (collisionCount >= 5) {
    if (score > highScore) {
      d3.select('.highscore').text('High score: ' + score);
      highScore = score;
    }
    score = 0;
    collisionCount = 0;
    d3.select('.collisions').text('Collisions: ' + score);
  } 
}

var throttledFunction = _.throttle(incrementCollision, 500, {trailing: false});

var detectCollisions = function() {
  var fighterXIndex = fighterData[0]['x'];//('cx');
  var fighterYIndex = fighterData[0]['y'];//('cy');
  var moverXIndex = d3.select('.board').select('svg').selectAll('image').attr('x');
  
  var moverYIndex = d3.select('.board').select('svg').selectAll('image').attr('y');
  if (Math.sqrt(Math.pow((fighterXIndex - moverXIndex),2) + Math.pow((fighterYIndex - moverYIndex),2)) < 50) {
    //console.log('Collision!!!', fighterXIndex, fighterYIndex, 'enemy', moverXIndex, moverYIndex);
    throttledFunction();
  }
}



var enemies = d3.select('.board').select('svg').selectAll('image').data(enemyData, function(d) {return d.index;})
    .enter()
    .append('image')
    .attr('xlink:href', 'asteroid.png')
    .style({width: 50 + 'px', height: 50 + 'px'});
    // .attr('x', function(d){return d.x})
    // .attr('y', function(d){return d.y});


var move = function() {
  for (var i = 0; i < n; i++) {
    enemyData[i]['x'] = rand(width);
    enemyData[i]['y'] = rand(height);
  }

  d3.select('.board').selectAll('svg').selectAll('image').data(enemyData, function(d) {return d.index;})  
  .transition().duration(1000)
  .tween(null, function() {
    return function() {
      detectCollisions();
    }
    
  })
  .attr('x', function(d){return d.x})
  .attr('y', function(d){return d.y})
  };



var incrementScore = function() {
  score++;
  d3.select('.current').text('Current score: ' + score);
}

setInterval(move, 1000);
setInterval(detectCollisions, 50);
setInterval(incrementScore, 100);




