const ParentTuteur = require('../../models/authentifications/parent_tuteur')

exports.CreerCompte = (req,res) => {
    const {id,nomPrenom,email,motDepasse} = req.body
    ParentTuteur.creerCompte(id,nomPrenom,email,motDepasse,res)
}

exports.Connecter = (req,res) => {
    const {utilisateur,motDePasse} = req.body
    ParentTuteur.Connexion(utilisateur,motDePasse,res)
}

exports.ChoixAnneescolaire= (req,res) => {
    const {idAs} = req.body
    ParentTuteur.ChoixAnneescolaire(idAs,res)
}