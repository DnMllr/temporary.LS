app = (require \express)!
server = require \http .createServer app
io = require \socket.io .listen server
{tail} = require \prelude-ls
{JSONfn} = require \jsonfn

server.listen 8080

app.get '/*' (req, res) ->
  root = {root: '/Users/danielmiller/Desktop/experiment/dist/' }
  path = req.path / '/'
  path = tail path if path[0] is ''
  if path[0] is \lib or path[0] is \templates or path[0] is \postlude
    res.sendfile req.path, root
  else
    res.sendfile "index.html" root

# TODO, figure out a way to bounce path request to the client

io.sockets.on \connection (socket) ->

  socket.on '_ add event' (data) -> 
    console.log data = JSONfn.parse data
    socket.on data.event, -> data.abcdak.apply @, it

  socket.on 'property created' (data) -> socket.set data[0]property, data[0]value

  socket.on 'property changed' (data) -> socket.set data[0]property, data[0]value