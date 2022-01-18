const express = require('express')
const socketio = require('socket.io')
const cors = require('cors');
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res)=> {
    res.render('index')
})

const server = app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("server is running")
})

const io = socketio(server);

speed = 0.5
turn  = 1.0

io.on('connection', socket => {
    console.log("New user connected")
 
    socket.username = "operator XXX"

    //handle the new message event
    socket.on('new_message', data => {
        console.log("new message")
        io.sockets.emit('receive_message', {message: data.message, username: socket.username})
    })

    socket.on('typing', data => {
        console.log('typing', data.key)
        switch(data.key){
            case 'q':
                speed = speed * 1.1;
                turn  = turn * 1.1;
                break
            case 'z':
                speed = speed * 0.9;
                turn  = turn * 0.9;
                break
            case 'w':
                speed = speed * 1.1;
                break
            case 'x':
                speed = speed * 0.9;
                break
            case 'e':
                turn  = turn * 1.1;
                break
            case 'c':
                turn  = turn * 0.9;
                break

        }
        socket.emit('typing', {username: socket.username, speed:speed, turn:turn})
    })
 
})