"use strict";
const co = require('co');

const wait = (ms) => {
  /* implement wait body */
};

co(function* (){
    console.log('before');
    yield wait(1000);
    console.log('after');
});
