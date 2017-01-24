const plateForm=process.platform
console.log(plateForm)
// 进程会监听两个事件 为什么 流也监听两个事件
/*const child=require('child_process')
console.log(child)*/
//frok exec  spawn 三种模式
const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});