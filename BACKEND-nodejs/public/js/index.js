let socket = io()

socket.on('connect', function(){
    console.log('Connected to server !!!')
})

//
socket.on('disconnect', function(){
    console.log('disconnected from server !')
})

//

socket.emit('createMessage', {
    from: "WDJ",
    text: "moi c'est Anna"
})

//

socket.on('newMessage', function(message){
    console.log("newMessage",message)
})