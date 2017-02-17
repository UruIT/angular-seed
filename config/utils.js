var path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

var ROOT = path.resolve(__dirname, '..');
var resolve = path.join.bind(path, ROOT);

var hasNpmFlag = (flag) => EVENT.includes(flag);

var ifElse = (condition) => {
    return function ifElseResolver(then, or){
        return condition ? ((typeof then === 'function') ? then() : then) : (or);
    }
}

var notEmpty = (array) => array.filter(elem => elem && elem !== null);

exports.hasNpmFlag = hasNpmFlag;
exports.ifElse = ifElse;
exports.notEmpty = notEmpty;
exports.resolve = resolve;
