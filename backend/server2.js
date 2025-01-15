const express= require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
})

app.get('/register', (req, res) =>{
    const sql = "SELECT * FROM register";
    db.query(sql, (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) =>{
    const sql = "INSERT INTO register (`Name`, `Email`,`Role`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.role
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.put('/status', (req, res) =>{
    const sql = "UPDATE register set `STATUS` = ? where EMAIL = ?";
    const value = [
        req.body.email,
    ]
    db.query(sql, [true, value], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.put('/update/:id', (req, res) =>{
    const sql = "update register set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        req.body.name,
        req.body.email  
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete('/register/:id', (req, res) =>{
    const sql = "DELETE FROM register WHERE ID = ?";
    
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(5000, ()=>{
    console.log("listening");
})
