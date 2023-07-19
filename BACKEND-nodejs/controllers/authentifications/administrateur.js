const Administrateur = require('../../models/authentifications/administrateur')

exports.Connexion = (req,res) => {
    const {nomUtilisateur,motDePasse} = req.body
    Administrateur.Connexion(nomUtilisateur,motDePasse,res)
}

exports.ChoixAnneescolaire = (req,res) => {
    const {idAs} = req.body
    Administrateur.ChoixAnneescolaire(idAs,res)
}