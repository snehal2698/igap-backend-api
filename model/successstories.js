let Database = require("./Database");
let fs = require("fs");
class Successstories{
    id = 0;
    name = "";
    package = "";
    companyname = "";
    position = "";
    qualification = "";
    imagecode = "";
    imgpath = "";
    placementmonth = "";

    db = new Database.Database();
    query = "";

    constructor(){
        this.id = 0;
        this.name = "";
        this.package = "";
        this.companyname = "";
        this.position = "";
        this.qualification = "";
        this.imgpath = "";
        this.placementmonth = "";
    }

    save = () => {

        if(this.imagecode != "")
        {
            let base64image = this.imagecode.replace(/^data:image\/jpeg;base64,/, "");
            base64image = base64image.replace(/^data:image\/png;base64,/, "");
            this.imgpath = "stories/" + Math.random().toString(36).substring(2, 7) + ".png";
            fs.writeFile("public/" + this.imgpath, base64image, 'base64', function (err) {
                console.log("Error image saving-" + err);
            });

            
        }


        if (this.id == 0) {
            this.query = "INSERT INTO successstories(name,package,companyname,position,qualification,imgpath,placementmonth) ";
            this.query += "VALUES('" + this.name + "','" + this.package + "', '" + this.companyname + "', '" + this.position + "','"+this.qualification+"','"+this.imgpath+"','"+this.placementmonth+"')";
            console.log(this.query);
        }
        else {
            this.query = "UPDATE successstories SET name = '" + this.name + "', ";
            this.query += "package = '" + this.package + "', ";
            this.query += "companyname = '" + this.companyname + "', ";
            this.query += "position = '" + this.position + "', ";
            this.query += "qualification = '" + this.qualification + "', ";
            this.query += "imgpath = '" + this.imgpath + "', ";
            this.query += "placementmonth = '" + this.placementmonth + "' WHERE id = " + this.id;

        }
        console.log(this.query);
        return new Promise((resolve, reject) => {
            this.db.query(this.query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            })
        });
    }

    getstories = ()=>{
        this.query = "SELECT * FROM successstories WHERE id = " + this.id;
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

    liststories = ()=>{
        this.query = "SELECT * FROM successstories ";
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

    deletestories = ()=>{
        this.query = "DELETE FROM successstories WHERE id = " + this.id;
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



}

module.exports = {
    Successstories: Successstories
}