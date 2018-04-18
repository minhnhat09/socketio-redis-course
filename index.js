const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  /**
   * Khi một thag join, gọi là thag A đi, thì nó sẽ broadcast cho tụi còn lại
   * B C D gì đó là nó join 
   */
   
  socket.broadcast.emit('user.events', 'Someone has joined!');
  socket.on('name', (name) => {
    console.log(name + ' says hello!');
    socket.broadcast.emit('name', name);
  });
});
