const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
var CryptoJS = require("crypto-js");
const https = require("https");
const fs = require("fs");
const path = require("path");
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
const port = 3333;
server.listen(port, () => {
  //console.log(`listening at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  //console.log("a user connected");
  io.emit("connectat", "connectat");

  socket.on("Acceptada", (id) => {
    //Canviar estat a acceptat
    var sql = `UPDATE Pedido SET Estado = "En Preparacio" WHERE IDPedido = ${id}`;
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });
  socket.on("Rebutjada", (id) => {
    var sql = `UPDATE Pedido SET Estado = "Rebutjades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });
  socket.on("Llesta", (id) => {
    var sql = `UPDATE Pedido SET Estado = "Preparades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });
  socket.on("Entregada", (id) => {
    var sql = `UPDATE Pedido SET Estado = "Entregades" WHERE IDPedido = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("comandaNova");
  });
  socket.on("Habilitada", (id) => {
    var sql = `UPDATE Producto SET Habilitado = 0 WHERE IDProducto = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("ProductoNuevo");
  });
  socket.on("Deshabilitada", (id) => {
    var sql = `UPDATE Producto SET Habilitado = 1 WHERE IDProducto = ${id}`;

    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
    io.emit("ProductoNuevo");
  });
  /*

  socket.on("Completada", (id) => {
    var sql = `UPDATE Pedido SET Estado = "Completada" WHERE IDPedido = ${id}`;
    conn.query(sql, (err, result) => {
      if (err) console.error(err);
      //console.log(result);
    });
  });
*/
  socket.on("disconnect", () => {
    //console.log("user disconnected");
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
  connectionLimit: 20,
  queueLimit: 5,
  waitForConnections: true,
});

conn.getConnection((err, connection) => {
  if (err) {
    console.error(err);
  } else {
    //console.log("Connected to database!");
  }
});

function descargarImagen(url, carpetaDestino, nombreArchivo) {
  try {
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Error al descargar la imagen. Código de estado: ${response.statusCode}`
        );
        return;
      }


      const archivoDestino = `${carpetaDestino}/${nombreArchivo}`;
      const escrituraStream = fs.createWriteStream(archivoDestino);

      response.pipe(escrituraStream);

      escrituraStream.on("finish", () => {
        //console.log(`Imagen descargada y guardada en ${archivoDestino}`);
      });

      escrituraStream.on("error", (error) => {
        console.error(`Error al guardar la imagen: ${error}`);
      });
    });
  } catch (e) {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Error al descargar la imagen. Código de estado: ${response.statusCode}`
        );
        return;
      }

      const archivoDestino = `${carpetaDestino}/${nombreArchivo}`;
      const escrituraStream = fs.createWriteStream(archivoDestino);

      response.pipe(escrituraStream);

      escrituraStream.on("finish", () => {
        //console.log(`Imagen descargada y guardada en ${archivoDestino}`);
      });

      escrituraStream.on("error", (error) => {
        console.error(`Error al guardar la imagen: ${error}`);
      });
    });
  }
}

app.get("/imagen/:nombreArchivo", (req, res) => {
  const nombreArchivo = req.params.nombreArchivo;
  const rutaImagen = path.join(__dirname, "assets", nombreArchivo);
  res.sendFile(rutaImagen);
});

app.post("/imagen", (req, res) => {
  var url = req.body.url;
  descargarImagen(url, "./assets", req.body.nombre + ".jpg");
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
  var imagen = "http://damtr1g3.dam.inspedralbes.cat:3333/imagen/" + req.body.Imatge.replace(/ /g, "_") + ".jpg";
  var sql = `INSERT INTO Producto (NombreProducto,Descripcion,PrecioUnitario, Imatge) VALUES ('${req.body.name}','${req.body.description}','${req.body.price}','${imagen}')`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
    io.emit("ProductoNuevo")
  });
});
app.delete("/deleteProduct/:id", async (req, res) => {
  var sql = `DELETE FROM Producto WHERE IDProducto = ${req.params.id}`;
  conn.query(`SELECT NombreProducto FROM Producto WHERE IDProducto = ${req.params.id}`, function (err, result, fields) {
    if (err) throw err;
    try {
      fs.unlinkSync('./assets/' + "producto" + result[0].NombreProducto + '.jpg');
      //console.log("Delete File successfully.");
    } catch (error) {
      //console.log(error);
    }
    io.emit("ProductoNuevo");
  });


  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.put("/updateProduct/:id", async (req, res) => {
  var imagen = "http://damtr1g3.dam.inspedralbes.cat:3333/imagen/" + req.body.Imatge.replace(/ /g, "_") + ".jpg";
  var sql = `UPDATE Producto SET NombreProducto = '${req.body.name}', Descripcion = '${req.body.description}', PrecioUnitario = '${req.body.price}', Imatge = '${imagen}' WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
  io.emit("ProductoNuevo");

});

app.put("/productStatus/:id", async (req, res) => {
  var sql = `UPDATE Producto SET Habilitado = ${req.body.status} WHERE IDProducto = ${req.params.id}`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/getOrders", async (req, res) => {
  var sql = `SELECT * FROM Pedido`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/getOrdersClient/:id", async (req, res) => {
  var sql = `SELECT * FROM Pedido WHERE IDCliente = '${req.params.id}' ORDER BY Estado`;

  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
})

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
    //console.log(result);
    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(500).send("Order not found");
    }
  });
});

app.post("/createOrder", async (req, res) => {
  // console.log(req.body.pedido.total);
  // console.log(req.body.productos[0].IDProducto)
  var sql = `INSERT INTO Pedido (IDCliente,Total,Comentario) VALUES ('${req.body.pedido.idClient}','${req.body.pedido.total}','${req.body.pedido.comentario}')`;
  
  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    var sqlSelectLastOrder = 'SELECT `IDPedido` FROM Pedido ORDER BY `FechaPedido` DESC LIMIT 1'

    conn.query(sqlSelectLastOrder, (err, result) => {
      if (err) console.error(err);
      var lastOrderId = result[0].IDPedido;

      for(const producto of req.body.productos){
        var sqlInsertOrderProducts = `INSERT INTO DetallePedido (IDPedido,IDProducto,Cantidad) VALUES ('${lastOrderId}','${producto.IDProducto}','${producto.cantidad}')`;

        conn.query(sqlInsertOrderProducts, (err, result) => {
          if (err) console.error(err);
          console.log(result);
        });
      };

      io.emit("comandaNova")
    });
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
//         //console.log(result);
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

app.get("/renovarGrafico", (req, res) => {
  selectPedidos();
});

app.get("/mostrarGraficoHoras", (req, res) => {
  selectPedidos()
    .then(() => mostrarGraficaHoras())
    .then(() => {
      res.sendFile(__dirname + "/estadisticas.jpeg");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al generar la gráfica.");
    });
});

function selectPedidos() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Pedido";
    conn.query(sql, (err, result) => {
      if (err) {
        console.error("Error al cargar pregunta: ", err);
        cerrarServidor();
        reject(err);
      } else {
        const resultJson = JSON.stringify(result, null, 2);

        fs.writeFile("log.json", resultJson, (err) => {
          if (err) {
            console.error("error al escribir los resultados");
            reject(err);
          } else {
            //console.log("escrito con éxito");
            resolve();
          }
        });
      }
    });
  });
}

function mostrarGraficaHoras() {
  return new Promise((resolve, reject) => {
    var { spawn } = require("child_process");
    var proceso = spawn("python3", ["./graficos.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(`El script de Python ha finalizado con código de salida ${code}.`);
      }
    });
  });
}
app.get("/mostrarGraficoEstados", async (req, res) => {
  try {
    await selectPedidos();
    await mostrarGraficaEstado();
    res.sendFile(__dirname + "/grafico2.jpeg");
  } catch (error) {
    console.error("Error al mostrar el gráfico de estados:", error);
    // Manejar el error, posiblemente enviar una respuesta de error al cliente
    res.status(500).send("Error al mostrar el gráfico de estados");
  }
});

function mostrarGraficaEstado() {
  return new Promise((resolve, reject) => {
    var { spawn } = require('child_process');
    var proceso = spawn("python3", ["./grafico2.py"]);

    proceso.on("close", (code) => {
      if (code === 0) {
        //console.log("El script de Python se ha ejecutado correctamente.");
        resolve();
      } else {
        console.error(
          `El script de Python ha finalizado con código de salida ${code}.`
        );
        reject(`El script de Python ha finalizado con código de salida ${code}.`);
      }
    });
  });
}

app.get("/getClients", async (req, res) => {
  var sql = `SELECT * FROM Cliente`;
  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    //console.log(result);
    res.send(result);
  });
});

app.get("/getTemps/:id", async (req, res) => {
  var sql = `SELECT * FROM Cliente`;
  conn.query(sql, (err, result) => {
    if (err) console.error(err);
    console.log(result);
    res.send(result);
  });
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
