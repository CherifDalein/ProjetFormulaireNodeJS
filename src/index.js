const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')

const app = express()

// On va convertir les données sous format json
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

// Inclure le CSS
app.use(express.static("public"))

// Partie des Get || REDIRECTION
app.get("/", (req, res)=>{
    res.render('accueil')
})

app.get("/login", (req, res)=>{
    res.render('login')
})
app.get("/register", (req, res)=>{
    res.render('register')
})



// Register User
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await collection.findOne({ nom: username });
        if (existingUser) {
            return res.send("Utilisateur déjà existant");
        }
        else{
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const nouvelUtilisateur = await collection.create({
            nom: username,
            email: email,
            password: hashedPassword // Enregistrer le mot de passe hashé
        });

        console.log('Utilisateur créé :', nouvelUtilisateur);
        res.redirect('/login'); // Rediriger vers la page de connexion après l'inscription
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de l\'inscription de l\'utilisateur');
    }

})

// Login User
app.post("/login", async (req, res)=>{
    try{
        const check = await collection.findOne({nom: req.body.username})
        if(!check){
            res.send("Utilisateur inexistant")
        }

        // Comparaison des mdp 
        const testmdp = await bcrypt.compare(req.body.password, check.password)
        if(testmdp){
            res.render('accueil')
        }
        else{
            res.send("Mot de pass incorrect")
        }
    }
    catch{
        res.send("Connexion impossible")
    }

})





port = 5000
app.listen(port, ()=>{
    console.log(`Serveur demarré sur le port: ${port}`)
})