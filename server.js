//Imports
const { generateDatabase } = require("./database");

//Libraries
const express = require("express");
const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();
const multer = require('multer');
const mysql = require('mysql2');

//Vars
const conf = JSON.parse(fs.readFileSync('conf.json'));
conf.ssl = {
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const database = generateDatabase(conf, mysql);

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));

//Aggiunta Immagini
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        console.log(req.file.filename);
        let dict = { 
            url: "./files/" + req.file.filename
        }
        res.json(dict);
        database.insert(dict);
    });
});

//Cancellare Immagini
app.post('/delete/:id', async (req, res) => {
    let hold = await database.select();
    let id = Number(req.params.id);

    hold.forEach(async (element) => {
        if (element.id == id) {
            await database.delete(element.id);
            res.json({status : "OK"});
        }
    });
});

//Ottenere lista URLs Immagini
app.get('/get', async (req, res) => {
    let hold = await database.select();
    res.json(hold)
});

const server = http.createServer(app);
server.listen(5700, () => {
  console.log("5700- server running");
});
