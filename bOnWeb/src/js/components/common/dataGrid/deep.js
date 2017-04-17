const forEach = require('lodash/forEach');
const isObject = require('lodash/isObject');
const isArray = require('lodash/isArray');
const isFunction = require('lodash/isFunction');

// Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
// and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
function keysFromPath(path) {
  /**
   * Repeatedly capture either:
   * - a bracketed expression, discarding optional matching quotes inside, or
   * - an unbracketed expression, delimited by a dot or a bracket.
   */
  const re = /\[("|')(.+)\1\]|([^.\[\]]+)/g;

  const elements = [];
  var result;
  while ((result = re.exec(path)) !== null) {
    elements.push(result[2] || result[3]);
  }
  return elements;
}

// Gets the value at any depth in a nested object based on the
// path described by the keys given. Keys may be given as an array
// or as a dot-separated string.
function getPath (obj, ks) {
  if (typeof ks == "string") {
    if(obj[ks] !== undefined) {
      return obj[ks];
    }
    ks = keysFromPath(ks);
  }

  var i = -1, length = ks.length;

  // If the obj is null or undefined we have to break as
  // a TypeError will result trying to access any property
  // Otherwise keep incrementally access the next property in
  // ks until complete
  while (++i < length && obj != null) {
    obj = obj[ks[i]];
  }
  return i === length ? obj : void 0;
}

// Based on the origin underscore _.pick function
// Credit: https://github.com/jashkenas/underscore/blob/master/underscore.js
function powerPick (object, keys) {
  const result = {};
  let obj = object;
  let iteratee;
  iteratee = function(key, obj) { return key in obj; };

  obj = Object(obj);

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    if (iteratee(key, obj)) result[key] = getPath(obj, key);
  }

  return result;
}

// Gets all the keys for a flattened object structure.
// Doesn't flatten arrays.
// Input:
// {
//  a: {
//    x: 1,
//    y: 2
//  },
//  b: [3, 4],
//  c: 5
// }
// Output:
// [
//  "a.x",
//  "a.y",
//  "b",
//  "c"
// ]
function getKeys (obj, prefix) {
  var keys = [];

  forEach( obj, function(value, key) {
    var fullKey = prefix ? prefix + "." + key : key;
    if(isObject(value) && !isArray(value) && !isFunction(value)) {
      keys = keys.concat( getKeys(value, fullKey) );
    } else {
      keys.push(fullKey);
    }
  });

  return keys;
}

module.exports = {
  pick: powerPick,
  getAt: getPath,
  keys: getKeys
};
