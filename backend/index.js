const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "student.veleri.hr",
  user: "dkurtic",
  password: "11",
  database: "dkurtic",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Kreiranje tablice za prehrambene proizvode
app.get("/api/create_PrehrambeniProizvodi", (request, response) => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS PrehrambeniProizvodi (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            Naziv VARCHAR(100) NOT NULL,
            Opis TEXT,
            Cijena DECIMAL(10, 2) NOT NULL,
            DatumProizvodnje DATE,
            DatumIsteka DATE,
            TežinaGrami INT,
            EnergetskaVrijednostKcal INT,
            Kategorija VARCHAR(50),
            Dostupno BOOLEAN DEFAULT TRUE
            Kolicina INT
        );
    `;
  connection.query(createTableQuery, (error) => {
    if (error) {
      console.error("Greška pri kreiranju tablice:", error);
      return response.status(500).send("Greška na serveru.");
    }
    response.send("Tablica PrehrambeniProizvodi je uspješno kreirana.");
  });
});

// Dodavanje novog proizvoda
app.post("/api/unos_PrehrambeniProizvodi", (request, response) => {
  const {
    Naziv,
    Opis,
    Cijena,
    DatumProizvodnje,
    DatumIsteka,
    TežinaGrami,
    EnergetskaVrijednostKcal,
    Kategorija,
    Dostupno,
  } = request.body;

  if (!Naziv || !Cijena) {
    return response.status(400).send("Naziv i cijena moraju biti popunjeni.");
  }

  const checkQuery = "SELECT * FROM PrehrambeniProizvodi WHERE Naziv = ?;";
  connection.query(checkQuery, [Naziv], (error, results) => {
    if (error) {
      console.error("Greška pri provjeri proizvoda:", error);
      return response.status(500).send("Greška na serveru.");
    }

    if (results.length > 0) {
      const updateQuery = `
        UPDATE PrehrambeniProizvodi
        SET Kolicina = Kolicina + 1
        WHERE Naziv = ?;
      `;
      connection.query(updateQuery, [Naziv], (error) => {
        if (error) {
          console.error("Greška pri ažuriranju količine:", error);
          return response.status(500).send("Greška na serveru.");
        }
        response.send("Količina proizvoda je uspješno povećana.");
      });
    } else {
      const insertQuery = `
        INSERT INTO PrehrambeniProizvodi (
            Naziv, Opis, Cijena, DatumProizvodnje, DatumIsteka, TežinaGrami, 
            EnergetskaVrijednostKcal, Kategorija, Dostupno, Kolicina
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1);
      `;
      connection.query(
        insertQuery,
        [
          Naziv,
          Opis || null,
          parseFloat(Cijena),
          DatumProizvodnje || null,
          DatumIsteka || null,
          TežinaGrami || null,
          EnergetskaVrijednostKcal || null,
          Kategorija || null,
          Dostupno !== undefined ? Dostupno : true,
        ],
        (error, results) => {
          if (error) {
            console.error("Greška pri unosu proizvoda:", error);
            return response.status(500).send("Greška na serveru.");
          }
          response.send("Proizvod je uspješno dodan.");
        }
      );
    }
  });
});

// Dohvaćanje svih proizvoda
app.get("/api/PrehrambeniProizvodi", (request, response) => {
  const selectQuery = "SELECT * FROM PrehrambeniProizvodi;";
  connection.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju proizvoda:", error);
      return response.status(500).send("Greška na serveru.");
    }
    response.send(results);
  });
});

// Brisanje proizvoda po ID-u
app.delete("/api/obrisi_proizvod/:id", (request, response) => {
  const { id } = request.params;

  connection.query(
    "DELETE FROM PrehrambeniProizvodi WHERE ID = ?;",
    [id],
    (error, results) => {
      if (error) {
        console.error("Greška pri brisanju proizvoda:", error);
        return response.status(500).send("Greška na serveru.");
      }
      if (results.affectedRows === 0) {
        return response.status(404).send("Proizvod nije pronađen.");
      }
      response.send("Proizvod je uspješno obrisan.");
    }
  );
});

// Smanjivanje količine proizvoda po ID-u
app.post("/api/smanji_kolicinu/:id", (request, response) => {
  const { id } = request.params;

  const selectQuery = "SELECT Kolicina FROM PrehrambeniProizvodi WHERE ID = ?;";
  connection.query(selectQuery, [id], (error, results) => {
    if (error) {
      console.error("Greška pri dohvaćanju proizvoda:", error);
      return response.status(500).send("Greška na serveru.");
    }

    if (results.length === 0) {
      return response.status(404).send("Proizvod nije pronađen.");
    }

    const currentKolicina = results[0].Kolicina;

    if (currentKolicina > 1) {
      const updateQuery = `
          UPDATE PrehrambeniProizvodi
          SET Kolicina = Kolicina - 1
          WHERE ID = ?;
        `;
      connection.query(updateQuery, [id], (error) => {
        if (error) {
          console.error("Greška pri ažuriranju količine:", error);
          return response.status(500).send("Greška na serveru.");
        }
        response.send("Količina proizvoda je uspješno smanjena.");
      });
    } else {
      const deleteQuery = "DELETE FROM PrehrambeniProizvodi WHERE ID = ?;";
      connection.query(deleteQuery, [id], (error) => {
        if (error) {
          console.error("Greška pri brisanju proizvoda:", error);
          return response.status(500).send("Greška na serveru.");
        }
        response.send("Proizvod je uspješno obrisan.");
      });
    }
  });
});

// Pokretanje servera
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
