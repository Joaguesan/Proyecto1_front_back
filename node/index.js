const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
var CryptoJS = require("crypto-js");
// const cookieParser = require("cook0ie-parser");
var history = require("connect-history-api-fallback");

const staticFieldMiddleware = express.static("public");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

const http = require("node:http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});
const port = 3000;

server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("connectat", "connectat");

  socket.on("Acceptada", (id) => {
    //Canviar estat a acceptat
    var sql = `UPDATE Pedido SET Estado = "Acceptades" WHERE IDPedido = ${id}`;
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      console.log(result);
    });
    io.emit("comandaNova");

  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
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
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(500).send("Product not found");
    }
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

app.delete("/deleteProduct/:id", async (req, res) => {
  var sql = `DELETE FROM Producto WHERE IDProducto = ${req.params.id}`;

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

app.put("/productStatus/:id", async (req, res) => {
  var sql = `UPDATE Producto SET Habilitado = ${req.body.status} WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/getOrders", async (req, res) => {
  var sql = `SELECT * FROM Pedido`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/detailOrder/:id", async (req, res) => {
  var sql = `SELECT
  Pedido.IDPedido,
  Pedido.IDCliente,
  Producto.NombreProducto,
  Pedido.Comentario,
  Producto.PrecioUnitario,
  DetallePedido.Cantidad
FROM
  Producto
JOIN
  DetallePedido ON Producto.IDProducto = DetallePedido.IDProducto
JOIN
  Pedido ON DetallePedido.IDPedido = Pedido.IDPedido
  WHERE Pedido.IDPedido = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(500).send("Order not found");
    }
  });
});

app.post("/createOrder", async (req, res) => {
  var sql = `INSERT INTO Pedido (IDCliente,TotalComentario) VALUES ('${req.body.idClient}','${req.body.total}','${req.body.comentario}')`;

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
      var ciphertext = CryptoJS.MD5(req.body.password).toString();
      if (result == 0 || result[0].Contrasena != ciphertext) {
        res.status(500).send("Wrong email or password");
      } else {
        req.session.user = result[0].CorreoElectronico;
        // res.cookie("user", req.session.user, { signed: true });
        res.send({ cookie: req.session, userData: result[0] });
      }
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(staticFieldMiddleware);
app.use(
  history({
    disableDotRules: true,
    verbose: true,
  })
);
app.use(staticFieldMiddleware);
