'use strict';
var mysql = require('../');
require('should');
var co = require('co');

var pool = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'test',
    queryFormat: function(query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function(txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    }
});

describe("Connection",function(){
	it('#$q' , function(){
		co(function*(){
			var con = yield pool.$getConnection();
			var r = yield con.$q('select 1+1 as result');
			r[0].result.should.equal(2);
			con.release();
		});
	});
    it('#$q1' , function(){
        co(function*(){
            var con = yield pool.$getConnection();
            var r = yield con.$q1('select 1+1 as result');
            r.result.should.equal(2);
            con.release();
        });
    });
});


describe("Pool",function(){
    it('#$q' , function(){
        co(function*(){
            var r = yield pool.$q('select 1+1 as result');
            r[0].result.should.equal(2);
        });
    });
    it('#$q1' , function(){
        co(function*(){
            var r = yield pool.$q1('select 1+1 as result');
            r.result.should.equal(2);
        });
    });
});
