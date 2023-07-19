const Niveau = require('../../models/actions/niveauModel.js')

exports.Ajouter = (req,res) => {
    const {libelleNiv} = req.body
    Niveau.Ajouter(libelleNiv,res)
}

exports.Liste = (req,res) => {
    Niveau.Liste(res)
}

exports.Modifier = (req,res) => {
    const {idNiv,libelle} = req.body
    Niveau.Modifier(idNiv,libelle,res)
}

exports.Supprimer = (req,res) => {
    const {idNiv} = req.body
    Niveau.Supprimer(idNiv,res)
}