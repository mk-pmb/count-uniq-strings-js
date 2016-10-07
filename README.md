
<!--#echo json="package.json" key="name" underline="=" -->
count-uniq-strings
==================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Count occurrences of strings, and record the order of their first occurrence.
<!--/#echo -->


API
---

### countUniqStrings([thing1[, thing2[, …]]])

The module exports this function.
It creates and returns a new accumulator `accum`.
If things are passed, they're `.add()`ed to it.

An accumulator is an array that records the order of first encounters of
each string, by appending it then. Future encounters of the same string
will just increase the counter (see below).


### accum.add([thing1[, thing2[, …]]])

Adds all things to `accum`, by one of these ways:
  * ignore check:
    If the thing is `null` or `undefined`, it will be ignored.
  * object check:
    If the thing is an object (including arrays), maybe its content is added.
    * array encounter: If an object's `length` property is a finite,
      positive number, its array-like content is `.add()`ed.
  * string encounter:
    If the thing is not an object, its string value is encountered.

Always returns the accumulator.


### accum.cnt

An object with no prototype (thus no inherited properties) that maps
the strings to the number of encounters. The numbers will start with
`1` on the first encounter, so unknown strings (keys) will be `undefined`.

Since there are no inherited properties, you can just test the truthiness
of any key to check whether that string was encountered yet.


### accum.prepare

If set, `.add()` uses it as a function to convert any value that it won't
ignore, before the object check.
After conversion, a 2nd ignore check is done, but no 2nd `prepare()`.


### accum.lower

If truthy, to-be-encountered string will be `.toLowerCase()`d first.



Usage
-----
see [usage.js](usage.js)



<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
