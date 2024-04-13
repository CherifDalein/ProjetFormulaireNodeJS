const mongoose = require('mongoose')

const connect = mongoose.connect("mongodb+srv://mcd2020:GSbJHQIsoDY7V3Hx@cluster0.az1dvqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// Verification de la connexion

connect.then(()=>{
    console.log("Base de données connecté avec succes")
})
.catch(()=>{
    console.log("Echec de la Connection de la base de données")
})


// Creationd d'un schema

const LoginSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

})

// Creation d'un model

const collection = new mongoose.model("users", LoginSchema)

module.exports= collection;