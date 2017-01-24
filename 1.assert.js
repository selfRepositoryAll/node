var http = require("http");
var port = parseInt(process.argv[2]);
var Koa=require('koa')
var app=new Koa()

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3001,function () {
    console.log('3001 has created')
});
app.listen(3000,function () {
    console.log('3000 has created')
});
app.listen(3003,function () {
    console.log('3003 has created')
});




/*
var server=http.createServer(function(request, response) {
    console.log("Request for:  " + request.url);
    response.writeHead(200);
    response.end("hello world\n");
});
server.listen(3000,function () {
    console.log('3000 has created')
})
server.listen(3001,function () {
    console.log('3001 has created')
})
server.listen(9000,function () {
    console.log('9000 has created')
})*/
