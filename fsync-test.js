const crypto = require('crypto');
const path = require('path');
const writeFileAtomic = require('write-file-atomic');

const ITERS = 10000;
let c = 0;
function next() {
    c++;
    if (c % 100 === 0) {
        console.log(c);
    }

    if (c === ITERS) {
        process.exit(1);
    }

    crypto.randomBytes(2048, function (buf) {
        writeFileAtomic(path.resolve('tmp', `test-${c}.txt`), buf, { fsync: true }, next);
    });
}

next();