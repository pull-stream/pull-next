# pull-next

read from one pull-stream, then the next, then the next...

when one stream end (unless it errored) call a function to get the next
stream.  there is also a function that takes an asynchronous function.

much like [pull-cat](https://github.com/pull-stream/pull-cat)
except creates streams by calling a function instead of takeing them out of an array.

in particular, this is useful for making a read stream that reconnects
to a source.

## example

create a stream that reads from a leveldb 100 items at a time.

``` js
var next = require('pull-next')
var pl = require('pull-level')
var db = require('level')(path_to_level)

function resume () {
  var last = null
  return Next(function () {
    return pull(
      pl.read(db, {gt: last && last.key, limit: 100}),
      pull.through(function (data) { last = data })
    )
  })
}

```

hint: this might be even more useful over [multilevel](https://github.com/level/multilevel)

## License

MIT





