var cron = require('node-cron');
const shell = require('shelljs');

// cron.schedule('30 6 * * *', function(){
//     console.log('wifi: turn on');
//     shell.exec('node wifi-setup.js 1');
// });
// cron.schedule('0 0 * * *', function(){
//     console.log('wifi: turn off');
//     shell.exec('node wifi-setup.js 0');
// });

// for test
cron.schedule('22 7 * * *', function(){
    console.log('wifi: turn on');
    shell.exec('node wifi-setup.js 1');
});
cron.schedule('23 7 * * *', function(){
    console.log('wifi: turn off');
    shell.exec('node wifi-setup.js 0');
});