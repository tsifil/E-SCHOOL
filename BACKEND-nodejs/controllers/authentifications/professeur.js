const professeur = require('../../models/authentifications/professeur')

exports.Creer = (req,res) => {
    const {id,nomPrenom,email,motDepasse} = req.body
    professeur.Creer(id,nomPrenom,email,motDepasse,res)
}

exports.Connexion = (req,res) => {
    const {utilisateur,motDePasse} = req.body
    professeur.Connexion(utilisateur,motDePasse,res)
}

exports.Annee = (req,res) => {
    const {idAs} = req.body
    professeur.ChoixAnneescolaire(idAs,res)
}