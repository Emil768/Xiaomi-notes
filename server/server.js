let express = require("express");

let cors = require("cors");
let bodyParser = require("body-parser");
let mysql = require("mysql");

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "emil22878",
  database: "notesjs",
});

app.get("/notes", (req, res) => {
  connection.query("select* from notes", (err, result) => {
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
  let sqlInsert = "insert into notes(text) values(?)";
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
  let sqlUpdate = "update notes set text = ? where id = ?";
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
  let sqlDelete = "delete from notes where id = ?";
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

app.listen(3001, () => {
  console.log("Server is starting from 3001 port...");
});
