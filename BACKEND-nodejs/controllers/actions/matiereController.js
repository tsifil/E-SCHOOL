const Matiere = require('../../models/actions/matiereModel')

exports.Ajouter = (req,res) => {
    const {libelle} = req.body
    Matiere.Ajouter(libelle,res)
}

exports.Liste = (req,res) => {
     Matiere.Liste(res)
}

exports.CreationCoefficient = (req,res) => {
    const {codemat,idNiv,coefficient} = req.body
    Matiere.CreationCoefficient(idNiv,codemat,coefficient,res)
}


exports.ListeCoefficientMatiere = (req,res) => {
   
    Matiere.ListeCoefficientMatiere(res)
}

exports.ConsultationCoefficient = (req,res) => {

    const {idNiv} = req.params
    Matiere.ConsultationCoefficient(idNiv,res)
}

exports.Modifier = (req,res) => {
    const {nomMatiere,codemat} = req.body
    Matiere.Modifier(nomMatiere,codemat,res)
}

exports.Supprimer = (req,res) => {
    const {codemat} = req.body
    Matiere.Supprimer(codemat,res)
}

exports.ModifierCoeffMatiere = (req,res) => {
    const {idAssoc,coeff} = req.body
    Matiere.ModifierCoeffMatiere(idAssoc,coeff,res)
}

exports.supprimerMatiereCoeff = (req,res) => {
    const {idAssoc} = req.body
    Matiere.supprimerMatiereCoeff(idAssoc,res)
}