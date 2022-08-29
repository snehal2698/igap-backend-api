let express = require("express");
let bodyparser = require("body-parser");
const Admin = require("./model/admin");
const Course = require("./model/course");
const Coursetopics = require("./model/Coursetopics");
const Successstories = require("./model/successstories");




let app = express();
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", (req, res) => {
    res.send("Welcome to iGAP Education APIs");
});

app.post("/login", (req, res) => {
    let data = req.body.data;
    let admin = new Admin.Admin();
    admin.email = data.email;
    admin.password = data.password;
    admin.email = data.email.replace(/'/g, "''");
    admin.password = data.password.replace(/'/g, "''");
    
    admin.login().then(
        result => {
            res.send({ status: "success", data: result });
        },
        err => {
            res.send({ status: "fail", data: err });
        }
    )
});

app.post("/savecourse", (req, res)=>{
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    course.name = data.name.replace(/'/g, "''");
    course.imagecode = data.imagecode;
    course.description = data.description.replace(/'/g, "''");
    course.save().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});


app.post("/deletecourse", (req, res) => {
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    course.delete().then(
        result => {
            res.send({ status: "success", data: result });
        },
        err => {
            res.send({ status: "fail", data: err });
        }
    )
});

app.post("/listcourse", (req, res) => {
    let data = req.body.data;
    let course = new Course.Course();
    course.list().then(
        result => {
            res.send({ status: "success", data: result });
        },
        err => {
            res.send({ status: "fail", data: err });
        }
    )
});

app.post("/getcourse", (req, res) => {
    let data = req.body.data;
    let course = new Course.Course();
    course.id = data.id;
    
    course.get().then(
        result => {
            res.send({ status: "success", data: result });
        },
        err => {
            res.send({ status: "fail", data: err });
        }
    )
});

app.post("/savecoursetopics", (req, res) => {
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.coursesid = data.coursesid;
    coursetopics.coursename = data.coursename;
    coursetopics.description = data.description;
    coursetopics.srno = data.srno;
    coursetopics.savecourse().then(
        result => {
            res.send({status:"success", data: result});
        },
        err => {
            res.send({status:"fail", data: err});
        }
    )
});

app.post("/deletecoursetopics", (req, res) => {
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.deletecourse().then(
        result => {
            res.send({ status: "success", data: result });
        },
        err => {
            res.send({ status: "fail", data: err });
        }
    )
});

app.post("/listcoursetopics", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.coursesid = data.coursesid;
    coursetopics.listcourse().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/getcoursetopics", (req, res)=>{
    let data = req.body.data;
    let coursetopics = new Coursetopics.Coursetopics();
    coursetopics.id = data.id;
    coursetopics.getcourse().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/savesuccessstories", (req, res)=>{
    let data = req.body.data;
    let successstories = new Successstories.Successstories();
    successstories.id = data.id;
    successstories.name = data.name;
    successstories.package = data.package;
    successstories.companyname = data.companyname;
    successstories.position = data.position;
    successstories.qualification = data.qualification;
    successstories.imagecode = data.imagecode;
    successstories.placementmonth = data.placementmonth;

    successstories.save().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/getstories", (req, res)=>{
    let data = req.body.data;
    let successstories = new Successstories.Successstories();
    successstories.id = data.id;
    successstories.getstories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/liststories",(req, res)=>{
    let data = req.body.data;
    let successstories = new Successstories.Successstories();
    successstories.liststories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});

app.post("/deletestories", (req, res)=>{
    let data = req.body.data;
    let successstories = new Successstories.Successstories();
    successstories.id = data.id;
    successstories.deletestories().then(
        result=>{
            res.send({status:"success", data:result});
        },
        err=>{
            res.send({status:"fail", data:err});
        }
    )
});



app.listen(8081, () => {
    console.log("APIs are running at http://localhost:8081");
});