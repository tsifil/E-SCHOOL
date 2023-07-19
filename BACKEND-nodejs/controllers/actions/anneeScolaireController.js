const Annee = require('../../models/actions/anneeScolaireModel')

exports.NouveauAnnee = (req,res) => {
    const {dateDebut,dateFin,libelle} = req.body
    Annee.NouveauAnnee(null,libelle,dateDebut,dateFin,res)
} 

exports.ListeAnnee = (req,res) => {
    
    Annee.ListeAnnee(res)
}

exports.ChoixAnnee= (req,res) => {
    Annee.ChoixAnnee(res)
}

exports.Editer = (req,res) => {

    const {idAs} = req.params
    Annee.Editer(idAs,res)
}

exports.Modifier= (req,res) => {
    const {libelle,dateDebut,dateFin,idAs} = req.body
    Annee.Modifier(libelle,dateDebut,dateFin,idAs,res)
}

exports.SupprimerAs = (req,res) => {
    const {idAs} = req.params
    Annee.SupprimerAs(idAs,res)
}