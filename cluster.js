/*note
 cluster 首先是node原生模块events的实力，其实只是使用了EventEmitter的观察者模式中的
 发射 emit 这个事件 然后循环执行 koa 也是这个实例 利用了继承 express是通过merage这个 来完成实现可以使用他们的emit的这个方法
 const fork = require('child_process').fork; cluster.fork()
 fork只是集成的一种方法 原理是child_process的fork模式
 child_PROCESS 一共有三种模式 分别是fork exec spawn
 *
 *
 * */


var cluster = require("cluster");
var http = require("http");
var numCPUs = require("os").cpus().length;
var port = parseInt(process.argv[2]);

/*cluster.fork().on('listening',(address)=>{
 console.log('addresss',address)
 }).on('disconnect',()=>{
 console.log('arguments',arguments)
 })*/
/*console.log('cluster.workers',cluster.workers)
 console.log('cluster.workers',cluster.workers['id'])*/


if (cluster.isMaster) {
    debugger
    for (var i = 0; i < numCPUs; i++) {//on 为什么可以使用这个 他是EventEmitter的实例
        var worker = cluster.fork()
            .on('listening', (address) => {
            console.log('addresss', address)
        })
            .on('disconnect', () => {
            console.log('worker.process.pid')
        }); // 是子集成的fork模式
        //console.log(worker.process.pid)
    }
    function messageHandler(msg) {
        console.log('meg',msg)
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs += 1;
        }
    }

    //console.log('cluster.workers', cluster.workers)
    Object.keys(cluster.workers).forEach((id) => {
        debugger
        cluster.workers[id].on('message', messageHandler);
    });
    /*    cluster.on("exit", function(worker, code, signal) {
     console.log('xxx')
     console.log(`worker ${worker.process.pid} died`);
     cluster.fork();
     });*/
} else {
    http.createServer(function (request, response) {
        console.log("Request for:  " + request.url);
        response.writeHead(200);
        response.end("hello world\n");
    }).listen(port);
}
