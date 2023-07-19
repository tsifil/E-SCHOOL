const parent = require('../../models/actions/parent')
exports.listeEnfant= (req,res) => {
    const {idAs,idPers} = req.params
    parent.listeEnfant(idAs,idPers,res)
}

exports.AfficherAbs = (req,res) => {
    const {idAs,numMatricule} = req.body
    parent.AfficherAbs(idAs,numMatricule,res)
}

exports.eleveNotes = (req,res) => {
    const {numMatricule,idClasse,idEvalua,idTrimestre} = req.body
    parent.eleveNotes(numMatricule,idClasse,idEvalua,idTrimestre,res)
}

exports.matiereEleve = (req,res) => {
    const {numMatricule,idAs} = req.body
    parent.matiereEleve(numMatricule,idAs,res)
}

exports.eleveProfesseur = (req,res) => {
    const {numMatricule,idAs} = req.body
    parent.eleveProfesseur(numMatricule,idAs,res)
}

exports.NombreRetard = (req,res) => {
    const {numMatricule,idAs} = req.body
    parent.NombreRetard(numMatricule,idAs,res)
}

exports.AbsenceInjustifiee = (req,res) => {
    const {numMatricule,idAs} = req.body
    parent.NombreAbsenceNonJustifiee(numMatricule,idAs,res)
}

exports.AbsenceJustifiee = (req,res) => {
    const {numMatricule,idAs} = req.body
    parent.NombreAbsenceJustifiee(numMatricule,idAs,res)
}

exports.UnEnfant = (req,res) => {
    const {idAs,idPers}=req.params
    parent.UnEnfant(idAs,idPers,res)
}

// BULETTIN

exports.infoEleve = (req,res) => {
    const {numMatricule,idClasse,idTrimestre,idEvalua} = req.params
    parent.infoEleve(numMatricule,idClasse,idTrimestre,idEvalua,res)
}

exports.BulletinEleve = (req,res) => {
   const {idClasse,idTrimestre,idEvalua} = req.params
   parent.BulletinEleve(idClasse,idTrimestre,idEvalua,res)   
}

exports.Appreciation = (req,res) => {
    const {numMatricule,idClasse,idTrimestre,idEvalua} = req.params
    parent.Appreciation(numMatricule,idClasse,idTrimestre,idEvalua,res)
}

exports.Rang = (req,res) => {
    const {idClasse,idTrimestre,idEvalua} = req.params
    parent.Rang(idClasse,idEvalua,idTrimestre,res)
}

exports.MoyenneDuplicate = (req,res) => {
    const {idClasse,idTrimestre,idEvalua} = req.params
    parent.MoyenneDuplicate(idClasse,idTrimestre,idEvalua,res)
}

exports.ParentHoraire = (req,res) => {
    const {numMatricule,idAs} = req.params
    parent.ParentHoraire(numMatricule,idAs,res)
}

exports.CorpsEdt = (req,res) => {
    const {numMatricule,idAs} = req.params
    parent.CorpsEdt(numMatricule,idAs,res)
}

exports.VerfierBulletin = (req,res) => {
    const {numMatricule,idClasse,idTrimestre,idEvalua} = req.body
    parent.VerfierBulletin(numMatricule,idClasse,idTrimestre,idEvalua,res)
}