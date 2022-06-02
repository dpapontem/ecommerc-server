//const { hash } = require("bcrypt-nodejs");

const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user.model.js");
const jwt = require("../services/jwt.js")

function singUp(req, res){
    const user = new User();
    const {name_user, lastname,email, password, repeatPassword} = req.body;
    user.name_user= name_user;
    user.lastname = lastname;
    user.email =email;
    /*  Por default almnacenamos el rol y su es un usuario activo o no */
    user.role = "admin";
    user.active = true;

    /* si no existe una de las dos password */

    if(!password || !repeatPassword){
        res.status(404).send({message: "Las constraseñas son obligatorias"})
    }else{
        if(password !== repeatPassword){
            res.status(404).send({message: "Las contraseñas no coinsiden"});
        }else{
            bcrypt.hash(password, null, null, (err, hash) =>{
                /* No funcino la encriptacion */
                if(err){
                    res
                    .status(500)
                    .send({message: "Error al encriptar la contraseña"});
                }else{

                    user.password = hash;
                    user.save((err,userStored) => {
                        if(err){
                            res.status(500).send({ message: "El usuario ya existe"})
                        }else{
                            if(!userStored){
                                res.status(404).send({ message: "Erro al crear el usuario"});
                            }else{
                                res.status(200).send({user: userStored});
                            }
                        }
                    })
                }
            })
        }
    }
}


/*  funcion de autentificacion: valida que si el usuario ingreso como parametros el email y la contraseña
    y es un usuario que existe en la base de datos, de los contrario, muestra los errores 500
    y 404
*/

const signIn = (req, res) => {

    console.log("Login Correcto");
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;
    User.findOne({email}, (err, userStored) => {

        if ( err ){
            res.status(500).send({ message: "Error del servidor."});
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Usuario no encontrado."});
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {

                    if (err) {
                        res.status(500).send({ message: " Error del servidor. "});
                    } else if (!check){
                        res.status(404).send({ message: "La contraseña es incorrecta"})
                    } else {

                        if ( !userStored.actived) {
                            res
                                .status(200)
                                .send({ code: 200, message: "El usuario no se ha activado."})
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessWithToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored),
                            });
                        }
                    }
                });
            }
        }
    });
};

module.exports = {singUp, signIn};