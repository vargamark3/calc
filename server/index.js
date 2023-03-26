const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());



app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.post("/api/number", (req, res) => {
    const number = req.body.number.toString();
    fs.writeFile("number.txt", number, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send("error: " + error.message);
        } else {
            res.send("number stored succesfully");
        }
    });
});

app.get("/api/number", (req, res) => {
    fs.readFile("number.txt", (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).send("error: " + error.message);
        } else {
            const number = parseFloat(data);
            res.json({ number });
        }
    });
});

module.exports = app;