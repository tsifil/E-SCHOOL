const classe = require('../../models/actions/classeModel')

exports.CreerClasse = (req,res) => {
    
    const libelleClasse = req.body.libelleClasse
    const idNiv= req.body.idNiv

    classe.Creer(libelleClasse,idNiv,res)
}

exports.ListeClasse = (req,res) => {

    classe.Liste(res)
}

exports.ListeGarderie = (req,res) =>{
    
    classe.ListeGarderie(res)
}

exports.ModifierClasse = (req,res) => {
    const {idNiv,idClasse,libelleClasse}=req.body
    classe.ModifierClasse(idNiv,idClasse,libelleClasse,res)
}

exports.SupprimerClasse = (req,res) => {
    const {idClasse} = req.params
    classe.SupprimerClasse(idClasse,res)
}