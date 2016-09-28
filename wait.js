"use strict";
const co = require('co');

const wait = (ms) => (done) => setTimeout(done, ms);

co(function* (){
    console.log('before');
    yield wait(1000);
    console.log('after');
});
