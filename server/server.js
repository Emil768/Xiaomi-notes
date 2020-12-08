let express = require("express");

let cors = require("cors");
let bodyParser = require("body-parser");
let mysql = require("mysql");

let app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

let connection = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b5d15f3840b45d",
  password: "c2bbb2e6",
  database: "heroku_2a458442454bd6d",
});

app.get("/notes", (req, res) => {
  connection.query("select* from heroku_2a458442454bd6d.notes", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({
        notes: result,
      });
    }
  });
});

//insert
app.post("/notes/add", (req, res) => {
  let sqlInsert = "insert into heroku_2a458442454bd6d.notes(text) values(?)";
  let text = req.body.text;
  connection.query(sqlInsert, text, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
    }
  });
});

//update

app.put("/notes/update", (req, res) => {
  let id = req.body.id;
  let text = req.body.text;
  let sqlUpdate = "update heroku_2a458442454bd6d.notes set text = ? where id = ?";
  connection.query(sqlUpdate, [text, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

//delete
app.delete("/notes/delete/:id", (req, res) => {
  let sqlDelete = "delete from heroku_2a458442454bd6d.notes where id = ?";
  let id = req.params.id;
  console.log(req.body);
  connection.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is starting from 3001 port...");
});

