"use strict";

const co = require('co').default;
const _ = require('lodash');

// do request which resolves between 1 and 2 seconds after
const request = (path) => new Promise((resolve) => {
    console.log('start ' + path);
    setTimeout(
        () => {
            console.log('finish ' + path);
            resolve({path, content: 'content for path ' + path })
        },
        (1 + Math.random()) * 1000
    );
});

co(function* (){

    const paths = _.range(0, 10).map((n) => 'path/to/file' + n);
    const contents = [];

    let pathIndex = 0;

    function* consumer(consumerIndex) {
        const pathIndexCopy = pathIndex++; // increment so that next consumer takes the next one
        contents[pathIndexCopy] = yield request(paths[pathIndexCopy]);
        if (pathIndex < paths.length) yield consumer(consumerIndex);
    }
    
    yield _.range(0, 2).map(consumer);

    return contents;

}).then(console.log, console.error);
