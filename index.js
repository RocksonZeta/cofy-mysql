'use strict';
var cofy = require('cofy');
var mysql = require('mysql');
module.exports =mysql;
var Connection = require('mysql/lib/Connection.js');
var PoolConnection = require('mysql/lib/PoolConnection.js');
var Pool = require('mysql/lib/Pool.js');
cofy.class(PoolConnection);
cofy.class(Pool);
cofy.class(require('mysql/lib/PoolCluster.js'));

Connection.prototype.$q = function(sql,opt){
	var _this = this;
	return function(done){
		_this.query(sql ,opt , function(e,r){
			done(e,r);
		});
	};
};
Connection.prototype.$q1 = function(sql,opt){
	var _this = this;
	return function(done){
		_this.query(sql ,opt , function(e,r){
			if(e)done(e);
			if(r instanceof Array){
				done(e,r[0]);
			}else{
				done(e,r);
			}
		});
	};
};
Pool.prototype.$q = function(sql,opt){
	var _this = this;
	return function(done){
		_this.query(sql ,opt , function(e,r){
			done(e,r);
		});
	};
};
Pool.prototype.$q1 = function(sql,opt){
	var _this = this;
	return function(done){
		_this.query(sql ,opt , function(e,r){
			if(e)done(e);
			if(r instanceof Array){
				done(e,r[0]);
			}else{
				done(e,r);
			}
		});
	};
};