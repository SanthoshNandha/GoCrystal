
/**
 * Module dependencies.
 * 
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('port', 5500);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/game1', routes.game1);
app.get('/game2', routes.game2);
app.get('/game3', routes.game3);
app.get('/instructorView', routes.instructorView);
app.get('/scratchMode', routes.scratchMode);
app.get('/getLevelConfig/:level', routes.getLevelConfig);
app.post('/updateConfig', routes.updateLevelConfig);
app.post('/addStats', routes.addStats);
app.get('/getScratchMode',routes.scratchModePage);
app.get('/demoMode',routes.demoMode);
app.get('/getDemoMode',routes.demoModePage);
app.get('/testPage',routes.testPage);
app.get('/prototype',routes.prototype);
app.get('/getPlayerLevel',routes.checkAddPlayer);
app.post('/addPlayerDetails',routes.addPlayerDetails);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});