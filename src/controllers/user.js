//const { hash } = require("bcrypt-nodejs");

const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user.model.js");

function singUp(req, res){
    const user = new User();
    const {name, lastname,email, password, repeatPassword} = req.body;
    user.name= name;
    user.lastname = lastname;
    user.email =email;
    /*  Por default almnacenamos el rol y su es un usuario activo o no */
    user.role = "admin";
    user.active = true;

    /* si no esciste una de las dos password */

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

module.exports = {singUp}