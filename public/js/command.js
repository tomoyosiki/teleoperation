(function connect(){
    let socket = io.connect('http://35.16.6.35:3000')

    let username = document.querySelector('#username')
    let curUsername = document.querySelector('.card-header')
    
    let message = document.querySelector('#message')
    let messageList = document.querySelector('#message-list')
    
    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ': ' + data.message
        listItem.classList.add('list-group-item')
        messageList.appendChild(listItem)
    })

    let info = document.querySelector('.info')
 
    message.addEventListener('keypress', e => {
        console.log(e)
        socket.emit('typing', {key:e.key})
    })
    
    socket.on('typing', data => {
        info.textContent = "current speed is " + data.speed + ", turn is " + data.turn;
        //setTimeout(() => {info.textContent=''}, 5000)
    })
})()