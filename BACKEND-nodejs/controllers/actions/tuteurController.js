const Tuteur = require('../../models/actions/tuteurModel')

exports.Enfant = (req,res) => {
    const {idAs} = req.params
    Tuteur.Enfant(idAs,res)
}

exports.Personne = (req,res) => {
    Tuteur.Personne(res)
}

exports.NouveauTuteur= (req,res) => {
    const {numMatricule,idPers} = req.body
    Tuteur.NouveauTuteur(numMatricule,idPers,res)
}

exports.ListeTuteur = (req,res) => {
    Tuteur.ListeTuteur(res)
}

exports.TuteurEleve = (req,res) => {
    const {idPers} = req.params
    Tuteur.TuteurEleve(idPers,res)
}

exports.SupprimerEleve = (req,res) => {
    const {idTuteur} = req.params
    Tuteur.SupprimerEleve(idTuteur,res)
}

exports.SupprimerTuteur = (req,res) => {
    const {idPers} = req.params
    Tuteur.SupprimerTuteur(idPers,res)
}