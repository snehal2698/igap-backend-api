let Database = require("./Database");
class Coursetopics{
    id = 0;
    coursesid = "";
    coursename = "";
    description = "";
    srno ="";

    db = new Database.Database();
    query = "";

    constructor(){
        this.id = 0;
        this.coursesid= "";
        this.coursename = "";
        this.description = "";
        this.srno ="";
    }

savecourse = ()=>{
    if(this.id == 0)
    {
        this.query = "INSERT INTO coursestopics(coursesid, coursename, description, srno)";
        this.query += "VALUES('" + this.coursesid + "', '" + this.coursename + "', '" + this.description + "','"+ this.srno +"')";
    }
    else{
        this.query = "UPDATE coursestopics SET coursesid = '" + this.coursesid + "', ";
        this.query += "coursename = '" + this.coursename + "', ";
        this.query += "description = '" + this.description + "',";
        this.query += "srno = '" + this.srno + "' WHERE id = " + this.id;
    }
    return new Promise((resolve, reject)=>{
        this.db.query(this.query, (err, result)=>{
            if(err)
            {
                return reject(err);
            }
            else{
                return resolve(result);
            }
        })
    });
}

deletecourse = ()=>{
    this.query = "DELETE FROM coursestopics WHERE id = " + this.id;
    return new Promise((resolve, reject)=>{
        this.db.query(this.query, (err, result)=>{
            if(err)
            {
                return reject(err);
            }
            else{
                return resolve(result);
            }
        })
    });
}

listcourse = ()=>{
    this.query = "SELECT * FROM coursestopics WHERE coursesid = " + this.coursesid + " " + "ORDER BY srno";
     return new Promise((resolve, reject)=>{
        this.db.query(this.query, (err, result)=>{
            if(err)
            {
                return reject(err);
            }
            else{
                return resolve(result);
            }
        })
    });
}

getcourse = ()=>{
    this.query = "SELECT * FROM coursestopics WHERE id = " + this.id;
    return new Promise((resolve, reject)=>{
        this.db.query(this.query, (err, result)=>{
            if(err)
            {
                return reject(err);
            }
            else
            {
                return resolve(result);
            }
        })
    });
}

}
module.exports = {
Coursetopics : Coursetopics
} 




