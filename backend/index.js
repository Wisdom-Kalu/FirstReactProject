import express, { json } from "express";
//import mysql from "mysql"
import mysql2 from "mysql2";
import cors from 'cors';

const app = express(); //allows data to be sent to the express server

//db connection
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Hello123$",
    database: "test"

})

app.use(express.json())
app.use(cors())

//SELECT ALL FROM DATABASE
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//INSERT INTO DATABASE
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`) VALUES (?)";
    //add the values
    //const values = ["Gabriela", "This is my second nodejs app"];
    const values = [
        req.body.id,
        req.body.title,
        req.body.desc
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("book added successfully")
    })
})

//DELETE FROM DATABASE
app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("book deleted successfully")
    })
})


app.listen(8080, () => {
    console.log("Connected...")
})




