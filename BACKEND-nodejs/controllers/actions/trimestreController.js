const Trimestre = require('../../models/actions/trimestreModel')

exports.NouveauTrimestre = (req,res) => {
    const { libelle,dateDebut,dateFin,idAs } = req.body
    Trimestre.NouveauTrimestre(libelle,dateDebut,dateFin,idAs,res)
}

exports.Liste = (req,res) => {
    const { idAs } = req.params
    Trimestre.ListeNonEncours(idAs,res) 
}

exports.Editer = (req,res) => {
    const {idTrimestre} = req.params
    Trimestre.Editer(idTrimestre,res)
}

exports.Modifier= (req,res) => {
    const {libelle,dateDebut,dateFin,idTrimestre} = req.body
    Trimestre.Modifier(libelle,dateDebut,dateFin,idTrimestre,res)
}

exports.SupprimerTri = (req,res) => {
    const {idTrimestre} = req.params
    Trimestre.SupprimerTri(idTrimestre,res)
}