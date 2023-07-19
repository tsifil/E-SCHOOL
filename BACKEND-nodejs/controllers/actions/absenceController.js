const absence = require('../../models/actions/absenceModel')

exports.supprimerAbs = (req,res) => {
    const {idAbsence}=req.params
    absence.supprimerAbs(idAbsence,res)
}

exports.testAbs = (req,res) => {
    const {type,mat} =req.body
    let donnee=[]
    for(let i=0;i<mat.length;i++){
        //console.log(mat[i])
        //console.log(mat[i],type[i])
        donnee[i] = {numMatricule:mat[i],type:type[i]}
            /*if(Object.keys(donnee).length != null){
              res.json({resultat:donnee})
            //console.log(donnee)
        }*/
    }

    res.send({resultat:donnee})

}

exports.consultation = (req,res) => {
    const {idAs,idClasse,idTrimestre} = req.body
    absence.consultation(idAs,idClasse,idTrimestre,res)
}

exports.verfication = (req,res) => {
    const {idClasse,codemat,date_Abs,idAs} = req.body
    absence.verfication(idClasse,codemat,date_Abs,idAs,res)
}

exports.eleveAbsent= (req,res) => {
    const {idClasse,codemat,dateAbs} = req.params
    absence.eleveAbsent(idClasse,codemat,dateAbs,res)
}

exports.justifierAbsence = (req,res) => {
    const {motifAbs,idAbs} = req.body
    absence.justifierAbsence(motifAbs,idAbs,res)
}

exports.verficationAppel = (req,res) => {
    const {idAs,idProf} = req.params
    absence.verficationAppel(idAs,idProf,res)
}

//  GET
exports.listeAbsence = (req,res) => {
    const{heureEnr,idClasseParams,idAs,dateDebut,dateFin,idProf} = req.params
    if(idClasseParams=='undefined'){
        absence.listeAbsence(idAs,dateDebut,dateFin,idProf,res)
    }else{
        absence.listeAbsenceClasse(heureEnr,idProf,dateDebut,idClasseParams,idAs,res)
    }
}
exports.NombreAbsenceInjustifiees = (req,res) => {
    const{idProf,heureEnr,idClasseParams,dateDebut,dateFin} = req.params
    if(idClasseParams=='undefined'){
        absence.NombreAbsenceInjustifie(idProf,dateDebut,dateFin,res)
    }else{
        absence.NombreAbsenceInjustifieClasse(dateDebut,heureEnr,idClasseParams,res)
    }
}
exports.NombreRetard = (req,res) => {
    const{idProf,heureEnr,idClasseParams,dateDebut,dateFin} = req.params
    if(idClasseParams=='undefined'){
        absence.NombreRetard(idProf,dateDebut,dateFin,res)
    }else{

    }
} 
exports.NombreAbsencesJustifiees = (req,res) => {
    const{idProf,heureEnr,idClasseParams,dateDebut,dateFin} = req.params
    if(idClasseParams=='undefined'){
        absence.NombreAbsenceJustifie(idProf,dateDebut,dateFin,res)
    }else{
        absence.NombreAbsenceJustifieClasse(dateDebut,heureEnr,idClasseParams,res)
    }
}
// POST
exports.listeAbsencePost = (req,res) => {
    const{idAs,dateDebut,dateFin,idProf} = req.body
    absence.listeAbsence(idAs,dateDebut,dateFin,idProf,res)
}
exports.NombreAbsenceInjustifieesPost = (req,res) => {
    const{idProf,dateDebut,dateFin} = req.body
    absence.NombreAbsenceInjustifie(idProf,dateDebut,dateFin,res)
}
exports.NombreRetardPost = (req,res) => {
    const{idProf,dateDebut,dateFin} = req.body
    absence.NombreRetard(idProf,dateDebut,dateFin,res)
} 
exports.NombreAbsencesJustifieesPost = (req,res) => {
    const{idProf,dateDebut,dateFin} = req.body
    absence.NombreAbsenceJustifie(idProf,dateDebut,dateFin,res)
}

