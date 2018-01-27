'use strict'

module.exports = function () {
  let Promise = require('bluebird')
  let mongoose = Promise.promisifyAll(require('mongoose'))
  var chalk = require('chalk')

  return {
    manageConnection: function manageConnection (config) {
      mongoose.connectAsync(config.dbhost + config.database, { useMongoClient: true }).then(res => {
        console.log(chalk.blue('Connected to mongodb: ' + config.database))
      }).then(() => {
        mongoose.setAsync('debug', true, function (coll, method, query, doc) {
            console.log('query executed:', coll, method, query, doc)
        })
      }).catch(err => {
        console.error('Error creating connection: ' + err)
      })
    },
    manageDBError: function manageDBError (err, res) {
      if (err) {
        var error = {}
        error.message = err.message
        if (!err.code) {
          error.code = 500
        } else {
          error.code = err.code
        }

        res.status(error.code).jsonp(error)
      }
    }

  }
}
