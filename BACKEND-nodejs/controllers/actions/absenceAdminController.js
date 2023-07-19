const absence = require('../../models/actions/absenceAdminModel')

//  GET
exports.listeAbsence = (req,res) => {
    const{idAs,dateDebut,dateFin} = req.params
    absence.listeAbsence(idAs,dateDebut,dateFin,res)
}
exports.NombreAbsenceInjustifiees = (req,res) => {
    const{heureEnr,dateDebut,dateFin} = req.params
    absence.NombreAbsenceInjustifie(dateDebut,dateFin,res)
}

exports.NombreRetard = (req,res) => {
    const{heureEnr,idClasseParams,dateDebut,dateFin} = req.params
    absence.NombreRetard(dateDebut,dateFin,res)
} 
exports.NombreAbsencesJustifiees = (req,res) => {
    const{heureEnr,dateDebut,dateFin} = req.params
    absence.NombreAbsenceJustifie(dateDebut,dateFin,res)
}
// POST
exports.listeAbsencePost = (req,res) => {
    const{idAs,dateDebut,dateFin,} = req.body
    absence.listeAbsence(idAs,dateDebut,dateFin,res)
}
exports.NombreAbsenceInjustifieesPost = (req,res) => {
    const{dateDebut,dateFin} = req.body
    absence.NombreAbsenceInjustifie(dateDebut,dateFin,res)
}
exports.NombreRetardPost = (req,res) => {
    const{dateDebut,dateFin} = req.body
    absence.NombreRetard(dateDebut,dateFin,res)
} 
exports.NombreAbsencesJustifieesPost = (req,res) => {
    const{dateDebut,dateFin} = req.body
    absence.NombreAbsenceJustifie(dateDebut,dateFin,res)
}

exports.AbsenceEnfant= (req,res) => {
    const {idAs,numMatriculeParams} = req.params
    absence.AbsenceEnfant(idAs,numMatriculeParams,res)
}

exports.AbsenceInjustifieeEnfant = (req,res) => {
    const {idAs,numMatriculeParams} = req.params
    absence.AbsenceInjustifieeEnfant(idAs,numMatriculeParams,res)
}

exports.AbsenceJustifiee = (req,res) => {
    const {idAs,numMatriculeParams} = req.params
    absence.AbsenceJustifiee(idAs,numMatriculeParams,res)
}

exports.justifierAbsence = (req,res) => {
    const {idAbs,type,motif}=req.body
    absence.justifierAbsence(idAbs,type,motif,res)
}

exports.NombreRetardEleve = (req,res) => {
    const {numMatriculeParams,idAs}=req.params
    absence.NombreRetardEleve(numMatriculeParams,idAs,res)
}