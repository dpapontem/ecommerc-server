const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const {API_VERSION} = require("./config");

const userRoutes = require("./src/routes/user.js")
const authRoutes = require("./src/routes/auth");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*  Evitar bloqueo del CORS */
/* nota: la solucion de la siguiente liena no es tan buena practica */
app.use(cors());

/* Creacion de los endpoint del proyecto */
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);

/* Configuracion de los header HTTP */

module.exports = app;