/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX = function countUniqStrings() {
    var accum = [];
    accum.cnt = Object.create(null);
    accum.add = EX.addTo.bind(accum);
    if (arguments.length > 0) { accum.add.apply(null, arguments); }
    return accum;
  };

  EX.addTo = function addTo(thing) {
    var accum = (this || EX()), cnt = accum.cnt, argi;
    if (arguments.length < 1) { return accum; }
    if (arguments.length > 1) {
      for (argi = 0; argi < arguments.length; argi += 1) {
        addTo.call(accum, arguments[argi]);
      }
      return accum;
    }
    if (thing === undefined) { return accum; }
    if (thing === null) { return accum; }
    if (accum.prepare) {
      thing = accum.prepare(thing);
      if (thing === undefined) { return accum; }
      if (thing === null) { return accum; }
    }
    if ((typeof thing) === 'object') {
      if (Number.isFinite(thing.length) && (thing.length > 0)) {
        return addTo.apply(accum, thing);
      }
      return accum;
    }
    thing = String(thing);
    if (accum.lower) { thing = thing.toLowerCase(); }
    if (cnt[thing]) {
      cnt[thing] += 1;
      return accum;
    }
    cnt[thing] = 1;
    accum[accum.length] = thing;
    return accum;
  };

  EX.mapWithCounts = function (accum, iter) {
    var cnt = (accum.cnt || false);
    return accum.map(function (key, idx) {
      return iter(key, (+cnt[key] || 0), idx, accum);
    });
  };













  return EX;
}());
