const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
    host: 'student.veleri.hr',
    user: 'idragojevic',
    password: '11',
    database: 'idragojevic'
});
 
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/api/diskografija", (request, response) => {
    connection.query("SELECT * FROM diskografija", (error, results) => {
      if (error) throw error;
      response.send(results);
    });
});


app.get("/api/diskografija/:id", (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM diskografija WHERE id = ?", [id], (error, results) => {
        if (error) throw error;
        response.send(results);
      });
});


app.post("/api/diskgraf_prodaja", (request, response) => {
    const data = request.body;
    console.log(data);  

    if (!data.id || !data.datum_prodaje || !data.kupac) {
        return response.status(400).send("Svi podaci moraju biti popunjeni.");
    }

    const prodaja = [[data.id, data.datum_prodaje, data.kupac]];

    connection.query("INSERT INTO diskgraf_prodaja (id, datum_prodaje, kupac) VALUES ?", [prodaja], (error, results) => {
        if (error) throw error;
        response.send(results);
  
    });
});


app.post("/api/unos_diskografije", (request, response) => {
    const data = request.body;
    console.log("HEADERS: ", request.headers);
    console.log(data);  

    if (!data.naziv || !data.izvodac || !data.god_izdanja || !data.medij || !data.id) {
        return response.status(400).send("Svi podaci moraju biti popunjeni.");
    }

    const diskografija = [
      [data.naziv, data.izvodac, data.god_izdanja, data.medij, data.id]
    ];

    connection.query(
      "INSERT INTO diskografija (naziv, izvodac, god_izdanja, medij, id) VALUES ?",
      [diskografija],
      (error, results) => {
        if (error) throw error;
        response.send(results);
      }
    );
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
});
