const express=require('express');
const app=express();
const http=require('http');
const expressServer= http.createServer(app);
const {Server}= require('socket.io');
const io=new Server(expressServer);

const port = process.env.PORT || 5000; //Line 3


app.use(express.static('client/build'));
const path = require('path');app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));});


app.get('/express_backend',function (req,res){
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT....' });
});





let UserList=[];


io.on('connection', function(socket) {


    // Accept New User
    socket.on('CreateNewUser',function (user) {
        UserList.push(user);
        io.emit('AnnounceNewJoiner',user['Name']);
        io.emit('UserList',UserList);
        socket.PeerID = user['PeerID'];
    })

    socket.on('disconnect', function() {
        UserList.map((list,i)=>{
            if(socket.PeerID===list['PeerID']){
                let LeftUser= UserList.splice(i, 1);
                io.emit('UserList',UserList);
                io.emit('AnnounceLeftJoiner',list['Name']);
            }
        })
    });

});




expressServer.listen(port,function (){
    console.log("Server Run @ 5000")
})