import os from "os";


export class Monitor{

//     npm install diskspace
//     var diskspace = require('diskspace');
// diskspace.check('C', function (err, result)
// {
//     Your code here
// });

// On Windows you change C to the drive letter you want to check. On Linux you use the mount path eg /.

// The result of the diskspace check is returned as an object named result.

//     result.total is how much the drive has totally.
//     result.used is how much of the drive is reported as used. On *nix this is straight from the df -k command, on Windows it's calculated from result.total - result.free
//     result.free is how much free space you have.
//     result.status isn't really that useful unless you want to debug.

// npm install os-utils

// Then in your code

// var os 	= require('os-utils');


// os.cpuUsage(function(v){
// 	console.log( 'CPU Usage (%): ' + v );
// });

// os.cpuFree(function(v){
// 	console.log( 'CPU Free:' + v );
// });

//     https://github.com/oscmejia/os-utils



// According to the docs, times is

//     an object containing the number of CPU ticks spent in: user, nice, sys, idle, and irq

// So you should just be able to sum the times and calculate the percentage, like below:

// var cpus = os.cpus();

// for(var i = 0, len = cpus.length; i < len; i++) {
//     console.log("CPU %s:", i);
//     var cpu = cpus[i], total = 0;

//     for(var type in cpu.times) {
//         total += cpu.times[type];
//     }

//     for(type in cpu.times) {
//         console.log("\t", type, Math.round(100 * cpu.times[type] / total));
//     }
// }


}