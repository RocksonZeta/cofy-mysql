cofy-mysql
==========

cofy mysql

**invoke convention: `yield obj.$asyncMethod`**

### Example:
```js
var mysql = require('cofy-mysql');

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'db',
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
co(function*(){
    //query with full return [[result] , [properties]];
    var users = (yield pool.$query("select * from user"))[0];
    //user $q to get results only
    var apps = yield pool.$q("select * from apps where uid=:uid" , {uid:1});
    //user $q1 to get first item in results.
    var count = yield pool.$q1("select count(*) as count from user where name=:name and pwd=:pwd" , {name:'name',pwd:'111'}));
    console.log(users);
    //multi operations
    var con ;
    try{
        con = yield pool.$getConnection();
        yield con.$beginTransaction();
        yield con.$query("select some");
        yield con.$query("insert some");
        yield con.$query("update some");
        yield con.$commit();
    }catch(e){
        yield con.$rollback();
        console.error(e);
        //to do 
    }finally{
        if(con){
            con.release();
        }
    }
})
```