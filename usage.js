/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var countUniqStrings = require('count-uniq-strings'), text,
  wordStarts, punctuation,
  eq = require('assert').deepStrictEqual;

text = String(countUniqStrings).toLowerCase().replace(/[\s\\']+/g, ' ');

punctuation = countUniqStrings();
text.replace(/ /g, '_').replace(/\W/g, function (pun) {
  punctuation.add(pun);
});

wordStarts = countUniqStrings(text.match(/\b[a-z]{3}/g));

function listNums(obj) {
  return Object.keys(obj).sort().map(function (key) {
    return (key + ' ' + obj[key]);
  });
}

eq(wordStarts.join(' '),
  'fun cou var acc cnt obj cre nul add bin arg len app ret');
eq(listNums(wordStarts.cnt),
  [ 'acc 6',  'add 3',  'app 1',  'arg 2',  'bin 1',  'cnt 1',  'cou 1',
    'cre 1',  'fun 1',  'len 1',  'nul 2',  'obj 1',  'ret 1',  'var 1' ]);
  //|---------|---------|---------|---------|---------|---------|---------|

eq(punctuation.join(' '), '( ) { = [ ] ; . > , }');
eq(listNums(punctuation.cnt),
  [ '( 5',    ') 5',    ', 1',    '. 8',    '; 5',    '= 3',    '> 1',
    '[ 1',    '] 1',    '{ 2',    '} 2' ]);
  //|---------|---------|---------|---------|---------|---------|---------|















console.log('+OK test passed');
