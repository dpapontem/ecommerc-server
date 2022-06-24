const express = require('express')
const client = require('twilio')('AC3f08ceed951d484a9dc2b85b4eacfb06','fcd89f77b04f279762842af87f818df6');
const  sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

// enviar the mensaje de texto

const enviarMsM = (numero) =>{
    console.log("Esta entrando a la funcion")
    client.messages
    .create({
        to:numero,
        from:'+18638857514',
        body: 'Bienvenid@ a nuestra aplicacion frond'
    }).then(message => console.log(message.sid));   

}

const enviarMail =(mail) => {
    console.log("Entro a mail");
    
    sgMail.send({
        to: mail,
        from: 'xhyumiii@gmail.com',
        subject: 'ProgIII',
        text: 'Este mensaje es de pruebas para la aplicacion.'
    }
    ).then(()=>{
        console.log('Email enviado');
    })
    .catch((error)=>{
        console.error(error)
    })

}

module.exports={ enviarMsM, enviarMail };

