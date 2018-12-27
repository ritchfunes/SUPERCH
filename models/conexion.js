/**
 * Created by Walter Suazo on 09/07/2015.
 */

var mysql = require('mysql');
 pool = mysql.createPool({
            host:'honduras.ca6zya7z3wxn.us-west-2.rds.amazonaws.com',
            user:'chsa',
            password:'Chs4us3r',
            database:'Gateway1',
            dateStrings:'date',
            waitForConnections:true,
            connectionLimit:10,
            timeout: 60*60*1000

        });
exports.pool=pool;
