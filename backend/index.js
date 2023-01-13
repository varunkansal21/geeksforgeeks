const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
var router = express.Router()
const app = express();



app.use(cors());
app.use(bodyParser.json());

var mysql = require('mysql2');

// const firebaseConfig = {
//   apiKey: "AIzaSyDBsHXhOQAb7aaCzKlrJcA2RGcQWv8I-PQ",
//   authDomain: "mts-report.firebaseapp.com",
//   databaseURL: "https://mts-report-default-rtdb.firebaseio.com",
//   projectId: "mts-report",
//   storageBucket: "mts-report.appspot.com",
//   messagingSenderId: "204672163497",
//   appId: "1:204672163497:web:2d40d90fa98baf203c93b8"
// };

// firebase.initializeApp(firebaseConfig);

// const db= firebase.firestore();


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "varun",
//   database:"gfg"
// });

var con = mysql.createConnection({
  host: "database-1.cbgxy45ubppf.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "geeksforgeeks",
  database:"mts",
  port:3306,
});

con.connect(function(err) {
    if (err){
      console.log("Not connected");
    }
    console.log("Connected!");
    
});


// ADD EMPLOYEE
app.post('/addEmployee',(req, res) => {
  let id= req.body.id;
  let name=req.body.Name;
  let doj=req.body.doj;
  let dol=req.body.dol;
  dol=null;
 console.log(doj);

  let data= {id,name,doj,dol};
  let sql = "INSERT INTO EMPLOYEE SET ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


// Add Task Name
app.post('/addTask',(req, res) => {
  let name= req.body.task;
  dol=null;

  let data= {name};
  let sql = "INSERT INTO TASK SET ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


// Fetch Employee Details
app.post('/employeeData',(req, res) => {
  let id=req.body.id;
  let query = con.query("SELECT * FROM EMPLOYEE WHERE ID = ?",[id], (err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    console.log(results);
    res.send(JSON.stringify(results));
  });
});


// Update Employee
app.post('/updateEmployee',(req, res) => {
  let id= req.body.id;
  let name=req.body.Name;
  let doj=req.body.doj;
  let dol=req.body.dol;
  console.log(id);
  console.log(name);
  console.log(doj);
  console.log(dol);
  
  if(dol===""){
    let data= [name,doj,id];
    let sql = "UPDATE EMPLOYEE SET NAME = ? , DOJ = ?  WHERE ID = ?";
    let query = con.query(sql, data,(err, results) => {
      if(err){
        res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
      }
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
    return;
  }
  let data= [name,doj,dol,id];
  let sql = "UPDATE EMPLOYEE SET NAME = ? , DOJ = ? , DOL = ? WHERE ID = ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


// show Employees Name
app.get('/showEmployees',(req, res) => {
  let sql = "SELECT NAME FROM EMPLOYEE ORDER BY ASC";
  let query = con.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify(results));
  });
}); 


// show Employees Task
app.get('/showTasks',(req, res) => {
  let sql = "SELECT NAME FROM TASK ORDER BY NAME ASC";
  let query = con.query(sql, (err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify(results));
  });
}); 

// Add report
app.post('/addReport',(req, res) => {
  let entryid= req.body.id;

  let nametask=req.body.task;
  let successful=req.body.success;
  let unsuccessful=req.body.unsuccess;
  let total=req.body.total;
  let others=req.body.others;
  let date_ob= new Date();
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let added=year+"-"+month+"-"+date;
 

  let data= {entryid,nametask,successful,unsuccessful,added,total,others};
  console.log(data);
  let sql = "INSERT INTO ENTRIES SET ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// View particular employee report
app.post('/showParticularReport',(req, res) => {
  let entryid= req.body.id;
  let name=req.body.Name;
  let nametask=req.body.task;
  let from = req.body.from;
  let to=req.body.to;
  let query = con.query("SELECT NAMETASK,SUM(SUCCESSFUL) AS SUCCESSFUL, SUM(UNSUCCESSFUL) AS UNSUCCESSFUL, SUM(TOTAL) AS TOTAL FROM ENTRIES WHERE NAMETASK = ? AND ADDED>= ? AND ADDED<= ? GROUP BY ?",[nametask,from,to,entryid], (err, results) => {

    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify(results));
  });
}); 

// View particular employee all report
app.post('/showAllReport',(req, res) => {
  let entryid= req.body.id;
  let name=req.body.Name;
  let nametask=req.body.task;
  let from = req.body.from;
  let to=req.body.to;
  let query = con.query("SELECT NAMETASK,SUM(SUCCESSFUL) AS SUCCESSFUL, SUM(UNSUCCESSFUL) AS UNSUCCESSFUL, SUM(TOTAL) AS TOTAL FROM ENTRIES WHERE ADDED>= ? AND ADDED<= ? GROUP BY ?,NAMETASK",[from,to,entryid], (err, results) => {

    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify(results));
  });
}); 



// View All employees particular task report
app.post('/showParticularEmployeeReport',(req, res) => {
  let nametask=req.body.task;
  let from = req.body.from;
  let to=req.body.to;
  let query = con.query("SELECT (SELECT NAME FROM EMPLOYEE WHERE ID=ENTRYID) AS NAME,NAMETASK, SUM(SUCCESSFUL) AS SUCCESSFUL, SUM(UNSUCCESSFUL) AS UNSUCCESSFUL,SUM(TOTAL) AS TOTAL FROM  ENTRIES WHERE NAMETASK = ? AND  ADDED>= ? AND ADDED<= ? GROUP BY ENTRYID ORDER BY NAME ASC",[nametask,from,to], (err, results) => {

    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    res.send(JSON.stringify(results));
  });
});

// View All employee all report
app.post('/showAllEmployeeReport',(req, res) => {
  let from = req.body.from;
  let to=req.body.to;
  let query = con.query("SELECT (SELECT NAME FROM EMPLOYEE WHERE ID=ENTRYID) AS NAME,NAMETASK , SUM(SUCCESSFUL) AS SUCCESSFUL, SUM(UNSUCCESSFUL) AS UNSUCCESSFUL,SUM(TOTAL) AS TOTAL FROM  ENTRIES WHERE ADDED>= ? AND ADDED<= ? GROUP BY ENTRYID, NAMETASK ORDER BY NAME ASC",[from,to], (err, results) => {

    if(err){
      res.send(JSON.stringify({"status":100}));
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return
    }
    console.log(results);
    res.send(JSON.stringify(results));
  });
}); 


const port = 5000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`MTS app running on port ${port}`)
})