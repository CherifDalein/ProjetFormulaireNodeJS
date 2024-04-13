const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')

const app = express()

app.set('view engine', 'ejs')

// Inclure le CSS
app.use(express.static("public"))

// Partie des Get || REDIRECTION
app.get("/", (req, res)=>{
    res.render('login')
})
app.get("/login", (req, res)=>{
    res.render('login')
})
app.get("/register", (req, res)=>{
    res.render('register')
})


// Register User
app.post("/register", async, (req, res)=>{
    const data={
        name: req.user.username,
        email: req.user.email,
        password: req.user.password
    }
})


port = 5000
app.listen(port, ()=>{
    console.log(`Serveur demarré sur le port: ${port}`)
})