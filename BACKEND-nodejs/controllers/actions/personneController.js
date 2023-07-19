const personne = require('../../models/actions/personneModel')

exports.Ajouter = (req,res) => {

    const {nomPrenom,sexe,profession,situationMatrimoniale,adresse,contact,statut/*,email*/} = req.body
    personne.Ajouter(nomPrenom,sexe,profession,situationMatrimoniale,adresse,contact,statut/*,email*/,res)
}

exports.Liste = (req,res) => {
    personne.Liste(res)
}

exports.ListeContacter = (req,res) => {
    personne.ListeContacter(res)
}

exports.PersonnePere = (req,res) => {
    personne.PersonnePere(res)
}

exports.PersonneMere = (req,res) => {
    personne.PersonneMere(res)
}

exports.Editer = (req,res) => {
     const {idPers} = req.params
     personne.Editer(idPers,res)
}

exports.Modifier = (req,res) => {
    const {statut,contact,nomPrenom,sexe,profession,situationMatrimoniale,adresse,email/*,nomUtilisateur*/,motDePasse,idPers} = req.body
    personne.Modifier(statut,contact,nomPrenom,sexe,profession,situationMatrimoniale,adresse,email,/*nomUtilisateur,*/motDePasse,idPers,res)
}

exports.TabPersonne= (req,res) => {
    personne.TabPersonne(res)
}

exports.recherche = (req,res) => {
    const {recherche} = req.body
    personne.Recherche(recherche,res)
}

exports.AnneeScolaire = (req,res) => {
    personne.AnneeScolaire(res)
}

exports.PersonneContacter = (req,res) => {
    const {idAs,numMatricule} = req.params
    personne.PersonneContacter(idAs,numMatricule,res)
}

exports.EffacerPersonne = (req,res) => {
    const {idPers} = req.params
    personne.EffacerPersonne(idPers,res)
}