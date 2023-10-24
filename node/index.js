const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000;

const mysql = require("mysql2");

var conn = mysql.createConnection({
  host: "dam.inspedralbes.cat",
  user: "a22joaguesan_num3",
  password: "G3proyecto1",
  database: "a22joaguesan_tienda",
});

// conn.connect((err) => {
//   if (err) console.error(err);
//   console.log("Connected to database!");
// });

// conn.end((err) => {
//   if (err) console.error(err);
//   console.log("Disconnected from database!");
// });

app.get("/getProducts", async (req, res) => {
  // try {
    await new Promise((resolve, reject) => {
      conn.connect((err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    var sql = "SELECT * FROM Producto";

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      res.send(result);

      conn.end((err) => {
        if (err) console.error(err);
      });
    });
  // } catch (err) {
  //   res.status(500).send("Error connecting the database.");
  // }
});

app.post("/addProduct", async (req, res) => {
  // try {
    await new Promise((resolve, reject) => {
      conn.connect((err) => {
        if(err){
          console.error(err);
          reject(err);
        }else{
          resolve();
        }
      });
    });

    var sql = `INSERT INTO Producto (NombreProducto,Descripcion,PrecioUnitario) VALUES ('${req.body.name}','${req.body.description}','${req.body.price}')`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      console.log(result);
      res.send(result);

      conn.end((err) => {
        if (err) console.error(err);
      });
    });
  // } catch {
  //   res.status(500).send("Error connecting the database.");
  // }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
