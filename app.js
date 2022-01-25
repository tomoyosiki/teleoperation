const express = require('express')
const socketio = require('socket.io')
const cors = require('cors');
const app = express()
const request = require('request')

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
        ifRe = false;
        re_spd = 0.0;
        re_turn = 0.0;
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
            case 'u':
                re_spd = speed;
                re_turn = turn;
                ifRe = true;
                break;
            case 'i':
                re_spd = speed;
                re_turn = 0.0;
                ifRe = true;
                break;
            case 'o':
                re_spd = speed;
                re_turn = turn * -1;
                ifRe = true;
                break;
            case 'm':
                re_spd = speed * -1;
                re_turn = turn;
                ifRe = true;
                break;
            case ',':
                re_spd = speed * -1;
                re_turn = 0.0;
                ifRe = true;
                break;
            case '.':
                re_spd = speed * -1;
                re_turn = turn * -1;
                ifRe = true;
                break;
            case 'k':
                re_spd = 0.0;
                re_turn = 0.0;
                ifRe = true;
                break;

        }
        socket.emit('typing', {username: socket.username, speed:speed, turn:turn})


        if(ifRe){
            const options = {
                method: 'POST',
                url: 'http://35.16.126.98:5000/control/',
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    "linear":{"x":re_spd,"y":2.0,"z":3.0},
                    "angular":{"x":4.0,"y":5.0,"z":re_turn}
                },
                json: true
            }

            //console.log(options)

            request(options, (error, response, body) => {
                if (error) throw new Error(error)
                
                console.log(body)
                //console.log(response)
            })
        }
    })
 
})