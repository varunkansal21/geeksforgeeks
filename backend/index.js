const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
var router = express.Router()
const app = express();

app.use(cors());
app.use(bodyParser.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "varun",
  database:"gfg"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
});


// ADD EMPLOYEE
app.post('/addEmployee',(req, res) => {
  let id= req.body.id;
  let name=req.body.Name;
  let doj=req.body.doj;
  let dol=req.body.dol;
  dol=null;
 

  let data= {id,name,doj,dol};
  let sql = "INSERT INTO EMPLOYEE SET ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});



// Fetch Employee Details
app.post('/employeeData',(req, res) => {
  let id=req.body.id;
  let query = con.query("SELECT * FROM EMPLOYEE WHERE ID = ?",[id], (err, results) => {
    if(err){
      res.send(JSON.stringify());
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
  let data1= [id];
  let sql1= "UPDATE EMPLOYEE SET DOL = '00-00-0000' WHERE ID = ? ";
  let query1=con.query(sql1,data1,(err,results)=>{

  });
  let data= [name,doj,dol,id];
  let sql = "UPDATE EMPLOYEE SET NAME = ? , DOJ = ? , DOL = ? WHERE ID = ?";
  let query = con.query(sql, data,(err, results) => {
    if(err){
      // res.send(JSON.stringify({"status": 204, "error": null, "response": results}));
      return console.error(error.message);
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});




const port = 5000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`MTS app running on port ${port}`)
})