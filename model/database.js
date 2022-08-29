let mysql = require("mysql");

class Database{
    con = null;
    constructor(){
        this.con = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"igapeducation"
        });
}
    query = (sql,args)=>{
        return new Promise((resolve, reject)=>{
            this.con.query(sql, args, (err, result)=>{
                if(err)
                    return reject(err);
                else
                    return resolve(result);
            });
        });

   
}
}
module.exports = {
    Database:Database
}