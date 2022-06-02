/*  creacion de tres funciones las cuales nos permitiran la creacion y actualizacion
    de tokens cuando se inicie session.    
*/

const jwt = require("jwt-simple");
const moment = require("moment");
const SECRET_KEY = "pon-tu-propia-clave-2022";

/*  Funcion para crear el token de acceso */

exports.createAccessWithToken = (user) =>{
    /* 
        En esta parte se trabaj de forma segura, la identidad de un determinado usuario con una serie
        de claims o privilegios.
        Estos privilegios estan codificados en objeros de tipo JSON,
        que se inscrustan dentro del payload o cuerpo de un mensjae
        firmado digitalemnte.
    */
   const payload = {
       id: user._id,
       name: user.name,
       lastname: user.lastname,
       email: user.email,
       role: user.role,
       createToken: moment().unix(),
       /*  La fecha de expiracion del token sera de 12 horas despues */
       expiration_date: moment().add(12, "hours").unix(),
   };
   return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = (user) =>{
    const payload = {
        id: user._id,
        expiration_date: moment().add(30, "days").unix(),
    };
    return jwt.encode(payload, SECRET_KEY)
}

/*  Funcion que descodifica cualquera de los dos tokens */

exports.decodedToken =(token) =>{
    return jwt.decode(token, SECRET_KEY, true)
}