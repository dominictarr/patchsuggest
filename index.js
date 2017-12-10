

exports.gives = { suggest: true }

exports.needs = {
  sbot: { names: { getSignifies: 'first' } }
}

exports.create = function (api) {
  function lookup (word, cb) {
    api.sbot.names.getSignifies(word.substring(1), function (err, names) {
      if(err) return cb(err)
      cb(null, names.map(function (e) {
        return {title: e.name, value: '[@'+e.name+']('+e.id+')'}
      }))
    })
  }

  return {
    suggest: function (word) {
      if(word[0] === '@' && word.length > 2)
        return lookup
    }
  }
}




