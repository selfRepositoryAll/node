const net=require('net')
//console.log(net)
/*
var server = net.createServer((socket) => {
    socket.end('goodbye\n');
}).on('error', (err) => {
    // handle errors here
    throw err;
});

// grab a random port.
server.listen({
    host: 'localhost',
    port: 80,
    exclusive: true
});*/
var server = net.createServer(function(connection) {
    console.log('client connected')
    console.log(arguments.length)
    connection.on('data',function (req,res) {
        console.log('req',req.toString())
        console.log('res',res)
        console.log('xxx')//可写流
    })
    connection.on('end', function() {//
        console.log('客户端关闭连接');
    });
    connection.end('Hello World!\r\n');
    //connection.pipe(connection);
});
server.listen({
    host: 'localhost',
    port: 80,
    exclusive: true
}, function() {
    console.log('server is listening');
});