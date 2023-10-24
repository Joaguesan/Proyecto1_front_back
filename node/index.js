const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());

const sessionsSecret = "2hCTcL2p5QMSny6DbZtUFjVtVXZqFa";
const sessionConfig = {
  secret: sessionsSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 600000,
  },
};

// app.use(cookieParser({}));
app.use(session(sessionConfig));

const port = 3000;

const mysql = require("mysql2");

var conn = mysql.createPool({
  host: "dam.inspedralbes.cat",
  user: "a22joaguesan_num3",
  password: "G3proyecto1",
  database: "a22joaguesan_tienda",
  connectionLimit: 10,
  queueLimit: 2,
  waitForConnections: true,
});

conn.getConnection((err, connection) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to database!");
  }
});

app.get("/getProducts", async (req, res) => {
  var sql = "SELECT * FROM Producto";

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    res.send(result);
  });
});

app.get("/getOneProduct/:id", async (req, res) => {
  var sql = `SELECT * FROM Producto WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    res.send(result);
  });
});

app.post("/addProduct", async (req, res) => {
  var sql = `INSERT INTO Producto (NombreProducto,Descripcion,PrecioUnitario) VALUES ('${req.body.name}','${req.body.description}','${req.body.price}')`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

app.delete("/deleteProduct", async (req, res) => {
  var sql = `DELETE FROM Producto WHERE IDProducto = ${req.body.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

app.put("/updateProduct/:id", async (req, res) => {
  var sql = `UPDATE Producto SET NombreProducto = '${req.body.name}', Descripcion = '${req.body.description}', PrecioUnitario = '${req.body.price}' WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

// app.post("/register", async (req, res) => {
//   var sql = `SELECT * FROM Cliente WHERE CorreoElectronico = '${req.body.email}'`;

//   conn.query(sql, (err, result) => {
//     if (err) console.error(err);
//     if (result.length > 0) {
//       res.status(500).send("User already exists");
//     } else {
//       var sql = `INSERT INTO Cliente (CorreoElectronico,Contrasena) VALUES ('${req.body.email}','${req.body.password}')`;

//       conn.query(sql, (err, result) => {
//         if (err) console.error(err);
//         console.log(result);
//         res.send(result);
//       });
//     }
//   });
// });

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(500).send("Both email and password are required");
  } else {
    var sql = `SELECT * FROM Cliente WHERE CorreoElectronico = '${req.body.email}'`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      if (result == 0 || result[0].Contrasena != req.body.password) {
        res.status(500).send("Wrong email or password");
      } else {
        req.session.user = result[0].CorreoElectronico;
        // res.cookie("user", req.session.user, { signed: true });
        res.send(result);
      }
    });

    console.log(req.session);
}});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
