var app = require('express').createServer(handler).listen(5023)
	, io = require('socket.io').listen(app)
  , fs = require('fs')
 , nicklist = {};


function handler(req, res){
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(data);
  });
}
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// 기존 소스에 이부분 추가
io.sockets.on('connection', function (socket) {
  console.log('log : in');

  socket.on('disconnect', function () {
    console.log('log : out')
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('join', function(nick){
      nicklist[nick] = socket.nickname = nick;

      socket.broadcast.emit('joinok', nick);
      io.sockets.emit('nicknames', nicklist);
  });

  socket.on('disconnect', function(){
      delete nicklist[socket.nickname];
      socket.broadcast.emit('nicknames',nicklist);
  });
});