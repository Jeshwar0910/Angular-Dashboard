const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

//Database Connection Creation
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jeshu0910!!",
  database: "dashboardDetails",
});
//Port Connection
app.listen(8080, function check(error) {
  if (error) {
    console.log("Server Connection Error!!");
  } else {
    console.log("Server Connected SuccessFully");
  }
});
//Database Connection
db.connect(function (error) {
  if (error) {
    console.log("DB Connection Error");
  } else {
    console.log(" DataBase Connected Successfully");
  }
});
//Creating New Record
app.post("/api/dashboard/details/add", (req, res) => {
  let details = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    dob: req.body.dob,
    state: req.body.state,
    Userpassword: req.body.Userpassword,
  };

  let sql = "INSERT INTO signinDetails SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Dashboard Insertion Failed" });
    } else {
      res.send({ status: true, message: "Dashboard Insertion Success" });
    }
  });
});

//Searching Record
app.get("/api/dashboard/details/:id", (req, res) => {
  var signInId = req.params.id;
  var sql = "SELECT * FROM signinDetails WHERE id=" + signInId;

  db.query(sql, function (error, result) {
    if (error) {
      res.send({ status: false, message: "Failed to load Data" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Loading all records
app.get("/api/dashboard/details", (req, res) => {
  var sql = "SELECT * FROM signinDetails";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Updating Record

app.put("/api/dashboard/details/update/:id", (req, res) => {
  let sql =
    "UPDATE signinDetails SET username='" +
    req.body.username +
    "',email='" +
    req.body.email +
    "',phone='" +
    req.body.phone +
    "',gender='" +
    req.body.gender +
    "',dob='" +
    req.body.dob +
    "',state='" +
    req.body.state +
    "',Userpassword='" +
    req.body.Userpassword +
    "' WHERE id=" +
    req.params.id;

  let a = db.query(sql, (err, result) => {
    if (err) {
      res.send({ status: false, message: "Updation Failed" });
    } else {
      res.send({ staus: true, message: "Updation Success" });
    }
  });
});

//Deleting Record

app.delete("/api/dashboard/details/delete/:id", (req, res) => {
  let sql = "DELETE FROM signinDetails WHERE id=" + req.params.id + "";

  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "error in deletion" });
    } else {
      res.send({ status: true, message: "record deleted sucessfully" });
    }
  });
});
