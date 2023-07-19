const Note_bulletin = require('../../models/actions/note_bulletinModel')

exports.consultationMoyenne = (req,res) => {
     const {idClasse,codemat,idTrimestre,idEvalua,idNiv} = req.params
     Note_bulletin.consultationMoyenne(idClasse,codemat,idTrimestre,idEvalua,idNiv,res)
}

// COMM 
exports.infoEleve = (req,res) => {
    const {idClasse,idTrimestre,idEvalua} = req.params
    Note_bulletin.infoEleve(idClasse,idTrimestre,idEvalua,res)
}

exports.BulletinParClasse = (req,res) => {
    const {idEvalua,idTrimestre,idClasse} = req.params
    Note_bulletin.BulletinParClasse(idEvalua,idTrimestre,idClasse,res)
}

exports.AppreciationEtMoyenneEleve = (req,res) => {
    const {idEvalua,idTrimestre,idClasse} = req.params
    Note_bulletin.AppreciationEtMoyenneEleve(idEvalua,idTrimestre,idClasse,res)
}

exports.ValiderBulletin = (req,res) => {
    const {idClasse,idTrimestre,idEvalua} = req.body
    Note_bulletin.ValiderBulletin(idClasse,idTrimestre,idEvalua,res)
}

exports.EleveListe = (req,res) => {
    const {idClasse,idTrimestre,idEvalua} = req.body
    Note_bulletin.EleveListe(idClasse,idTrimestre,idEvalua,res)
}

exports.MoyenneDuplicate = (req,res) => {
    const {idClasse,idEvalua,idTrimestre} = req.params
    Note_bulletin.MoyenneDuplicate(idClasse,idTrimestre,idEvalua,res)
}

exports.Devalider = (req,res) => {
    const {numMatricule,idTrimestre,idEvalua,idClasse}=req.body
    Note_bulletin.Devalider(numMatricule,idTrimestre,idEvalua,idClasse,res)
}

exports.Valider = (req,res) => {
    const {numMatricule,idTrimestre,idEvalua,idClasse}=req.body
    Note_bulletin.Valider(numMatricule,idTrimestre,idEvalua,idClasse,res)
}

exports.LegendeBulletin = (req,res) => {
     const {idEvalua,idTrimestre} = req.params
     Note_bulletin.LegendeBulletin(idEvalua,idTrimestre,res)
}