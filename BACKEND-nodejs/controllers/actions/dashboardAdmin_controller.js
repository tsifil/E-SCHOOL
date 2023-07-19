const dashboard = require('../../models/actions/dashboard_admin_model')

exports.getEleveData = (req,res) => {
    const {idAs} = req.params
    dashboard.getEleveData(idAs,res)
}

exports.nombreMatiere = (req,res) => {
    dashboard.nombreMatiere(res)
}

exports.nombreProfesseur = (req,res) => {
    dashboard.nombreProfesseur(res)
}

exports.nombreClasse= (req,res) => {
    dashboard.nombreClasse(res)
}

exports.nombreEleveInscrit= (req,res) => {
    const {idAs} = req.params
    dashboard.nombreEleveInscrit(idAs,res)
}

exports.nombreEleveFille= (req,res) => {
    const {idAs} = req.params
    dashboard.nombreEleveFille(idAs,res)
}

exports.nombreEleveGarcon= (req,res) => {
    const {idAs} = req.params
    dashboard.nombreEleveGarcon(idAs,res)
}

exports.NombreEleveClasse = (req,res) => {
    const {idAs} = req.params
    dashboard.NombreEleveClasse(idAs,res)
} 

exports.NombreEleve = (req,res) => {
    dashboard.NombreEleve(res)
}