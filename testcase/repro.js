const npm = require('../../npm/lib/npm');
const path = require('path');
const rimraf = require('rimraf');

function run() {
    return new Promise((resolve, reject) => {
        rimraf.sync(path.resolve('./node_modules'));
        npm.load({
            loglevel: 'verbose',
            noSave: true
        }, function (err) {
            if (err) {
                reject(err);
                return;
            }
        
            npm.commands['install']([], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });        
    });
}

let chain = Promise.resolve();
for (let i = 0; i <= 20; i++) {
    chain = chain
        .then(run, err => {
            if (err.code === 'EBADPLATFORM') {
                console.log('just the expected error');
                return Promise.resolve();
            } else {
                Promise.reject(err);
            }
        });
}

chain.catch(err => console.error('UNEXPECTED!', err));

