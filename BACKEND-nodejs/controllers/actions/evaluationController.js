const evaluation = require('../../models/actions/evaluationModel')

exports.Ajouter = (req,res) => {
    const {libelle} = req.body
    evaluation.Ajouter(libelle,res)
}

exports.Liste = (req,res) => {
    evaluation.Liste(res)
}

exports.Modifier = (req,res) => {
    const {idEvalua,libelleEvalua}=req.body
    evaluation.Modifier(idEvalua,libelleEvalua,res)
}

exports.Supprimer = (req,res) => {
    const {idEvalua} = req.body
    evaluation.Supprimer(idEvalua,res)
}