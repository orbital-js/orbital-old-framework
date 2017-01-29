"use strict";
var mongodb_1 = require("mongodb");
var Connect = (function () {
    function Connect() {
    }
    Connect.prototype._connect = function (config) {
        mongodb_1.MongoClient.connect(new Url(config).url, function (error, db) {
            var prom = new Promise(function (resolve, reject) {
                if (error) {
                    reject(error);
                }
                else {
                    return resolve(db);
                }
            });
            return prom;
        });
    };
    return Connect;
}());
exports.Connect = Connect;
var Url = (function () {
    function Url(config) {
        this.config = config;
        config.port = config.port ? config.port : 27101;
        if (config.username && config.password) {
            this.url = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.database;
        }
        else if ((config.username && !config.password) || (!config.username && config.password)) {
            throw new Error('You must have a username and password for an authenticated database. Authentication is optional, but highly recommended.');
        }
        else {
            console.warn('Using an authenticated database is highly recommended.');
            this.url = 'mongodb://' + config.host + ':' + config.port + '/' + config.database;
        }
    }
    return Url;
}());
//# sourceMappingURL=connect.js.map