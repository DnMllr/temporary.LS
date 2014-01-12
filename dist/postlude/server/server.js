(function(){
  var app, server, io, tail, JSONfn, split$ = ''.split;
  app = require('express')();
  server = require('http').createServer(app);
  io = require('socket.io').listen(server);
  tail = require('prelude-ls').tail;
  JSONfn = require('jsonfn').JSONfn;
  server.listen(8080);
  app.get('/*', function(req, res){
    var root, path;
    root = {
      root: '/Users/danielmiller/Desktop/experiment/dist/'
    };
    path = split$.call(req.path, '/');
    if (path[0] === '') {
      path = tail(path);
    }
    if (path[0] === 'lib' || path[0] === 'templates' || path[0] === 'postlude') {
      return res.sendfile(req.path, root);
    } else {
      return res.sendfile("index.html", root);
    }
  });
  io.sockets.on('connection', function(socket){
    socket.on('_ add event', function(data){
      console.log(data = JSONfn.parse(data));
      return socket.on(data.event, function(it){
        return data.abcdak.apply(this, it);
      });
    });
    socket.on('property created', function(data){
      return socket.set(data[0].property, data[0].value);
    });
    return socket.on('property changed', function(data){
      return socket.set(data[0].property, data[0].value);
    });
  });
}).call(this);
