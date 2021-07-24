const express=require('express');
const app=express();
const http=require('http');
const expressServer= http.createServer(app);
const {Server}= require('socket.io');
const io=new Server(expressServer);
const port = process.env.PORT || 5000; //Line 3

app.get('/express_backend',function (req,res){
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT....' });
});



io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});




expressServer.listen(port,function (){
    console.log("Server Run @ 5000")
})