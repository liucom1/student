const express = require("express");
const app = express();
const mysql = require("mysql");
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "school"
});
con.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
})
app.get("/student", (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let start = (page - 1) * limit;
    con.query("SELECT * FROM student LIMIT ?,?", [start, limit * 1], (err, result) => {
        res.json(result);
    })
});
app.get("/count", (req, res) => {
    con.query("SELECT COUNT(*) as total FROM student", (err, result) => {
        res.json(result);
    })
});
app.post("/student", (req, res) => {
    con.query("INSERT INTO student (name,age) VALUES(?,?)", [req.body.name, req.body.age], (err, result) => {
        res.json(result);
    })
});
app.delete("/student/:id", (req, res) => {
    let id = req.params.id;
    con.query("DELETE FROM student WHERE id=?", id, (err, result) => {
        res.json(result);
    })
});
app.put("/student/:id", (req, res) => {
    let id = req.params.id;
    let body = req.body;
    con.query("UPDATE student SET name=?,age=? WHERE id=?", [body.name, body.age, id], (err, result) => {
        res.json(result);
    })
})

app.listen(6868);