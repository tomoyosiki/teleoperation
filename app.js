const express = require('express')
const socketio = require('socket.io')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.render('index')
})

app.get('/getusermedia', (req, res)=> {
    res.render('getusermedia')
})

const server = app.listen(process.env.PORT || 3002, () => {
    console.log("server is running")
})