

exports.gives = { suggest: { compose: true, search: true } }

exports.needs = {
  sbot: { names: { getSignifies: 'first' } }
}

exports.create = function (api) {
  function create (map) {
    function lookup (word, cb) {
      api.sbot.names.getSignifies(word.substring(1), function (err, names) {
        if(err) return cb(err)
        cb(null, names.map(map))
      })
    }
    return function (word) {
      if(word[0] == '@' && word.length > 2) return lookup
    }
  }
  return {
    suggest: {
      compose: create(function (e) {
        return {title: e.name, id: e.id, value: '[@'+e.name+']('+e.id+')'}
      }),
      search: create(function (e) {
        return {title: e.name, value: e.id}
      })
    }
  }
}










