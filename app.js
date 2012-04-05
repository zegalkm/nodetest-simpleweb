
/**
 * Module dependencies.
 */

var express = require('express')   //확장모듈 express를 변수에 할당
  , routes = require('./routes')	//rotes디렉토리 할당. require()로 디렉토리를 지정했으므로 routes디렉토리에서 자동으로 index.js를 불러옴.
  									//라우팅 설정을 추가하려면, index.js에 추가하거나 용도별로 새로운 js를 만들어 require()해야 한다.
  , fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views'); // __dirname은 현재파일의 절대 경로 나타내는 전역변수.
  // app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index); //라우팅은 app.get(), app.post(), app.put() 등의 함수 이용.
app.get('/', __dirname + '/views/index.html');
app.get('/join', routes.form);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
