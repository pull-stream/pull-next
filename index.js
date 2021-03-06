var noop = function () {}

function isSource (fn) {
  return 'function' === typeof fn && fn.length === 2
}

module.exports = function (next) {
  var stream
  return function (abort, cb) {
    if(!cb) throw new Error('callback required!')
    if(abort) {
      if(stream) stream(abort, cb)
      else       cb(abort)
    }
    else (function more () {
      if(!stream) {
        try { stream = next() }
        catch(err) { return cb(err) }
        if(!isSource(stream)) return cb(true)
      }

      stream(null, function (err, data) {
        if(err) {
          stream = null
          if(err === true) (global.setImmediate || global.setTimeout)(more)
          else             cb(err)
        }
        else
          cb(null, data)
      })
    })()
  }
}


