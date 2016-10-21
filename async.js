var noop = function () {}

module.exports = function (next) {
  var stream
  return function (abort, cb) {
    if(!cb) throw new Error('callback required!')
    if(abort) {
      if(stream) stream(abort, cb)
      else       cb(abort)
    }
    else more()

    function more () {
      if(stream) send()
      else {
        next(function (error, nextStream) {
          if(error) return cb(error)
          if(!nextStream) return cb(true)
          stream = nextStream
          send()
        })
      }
    }

    function send () {
      stream(null, function (err, data) {
        if(err) {
          stream = null
          if(err === true) setTimeout(more, 100)
          else             cb(err)
        }
        else cb(null, data)
      })
    }
  }
}
