var noop = function () {}

module.exports = function (next) {
  var stream
  return function (abort, cb) {
    if(abort) {
      if(stream) stream(abort, cb)
      else       cb(abort)
    }
    else
      more()

    function more () {
      if(!stream) {
        try { stream = next() }
        catch(err) { return cb(err) }
        if(!stream) return cb(true)
      }
      stream(null, function (err, data) {
        if(err) {
          console.log('end', err, data)
          stream = null
          if(err === true) setTimeout(more, 100)
          else             cb(err)
        }
        else
          cb(null, data)
      })
    }
  }
}

















