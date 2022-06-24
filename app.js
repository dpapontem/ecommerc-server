const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./src/routes/");
const {API_VERSION} = require("./config");

const userRoutes = require("./src/routes/user.js")
const authRoutes = require("./src/routes/auth");
const subjectRoutes = require("./src/routes/subject");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*  Evitar bloqueo del CORS */
/* nota: la solucion de la siguiente liena no es tan buena practica */
app.use(cors());

// Para quienes sigue presentando molestias el CORS:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


/* Creacion de los endpoint del proyecto */
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,subjectRoutes);


/* Configuracion de los header HTTP */

module.exports = app;