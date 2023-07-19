const edt = require('../../models/actions/edtModel')

exports.CreerEdt = (req,res) => {
    const{heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf}=req.body
    edt.Creer(heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf,res)
}

exports.Horaire = (req,res) => {
    const {dateDebut,dateFin,idClasse} = req.params
    edt.Horaire(idClasse,dateDebut,dateFin,res)
}

exports.Edt = (req,res) => {
    const {dateDebut,dateFin,idClasse} = req.params
    edt.Edt(idClasse,dateDebut,dateFin,res)
}

exports.EdtDisponible = (req,res) => {

     edt.EdtDisponible(res)
}

exports.VoirEdt = (req,res) => {
    const {idClasse,idAs} = req.params
    edt.VoirEdt(idClasse,idAs,res)
}

exports.ListeProfClasse = (req,res) => {
    edt.ListeProfClasse(res)
}

exports.ListeProfClassePOST = (req,res) => {
    const {idClasse} = req.body
    edt.ListeProfClassePOST(idClasse,res)
}

exports.EnregistrerdateReel = (req,res) => {
    const {idEns,dateReelDebut,dateReelFin} = req.body
    edt.EnregistrerdateReel(idEns,dateReelDebut,dateReelFin,res)
}

exports.ListeProf = (req,res) => {
    edt.ListeProf(res)
}

exports.Registre = (req,res) => {
    const {idProf,dateDebut,dateFin}=req.body
    edt.Registre(idProf,dateDebut,dateFin,res)
}

exports.archiveHeureTravaille = (req,res) => {
    const {idClasse,idProf,codemat,dateReelDebut,dateReelFin}=req.body
    edt.archiveHeureTravaille(idClasse,idProf,codemat,dateReelDebut,dateReelFin,res)
}

exports.ModifierDateReel=(req,res)=>{
    const {dateReel,idClasse,codemat,idProf,dateReelDebut,dateReelFin}=req.body
    edt.ModifierDateReel(dateReel,idClasse,codemat,idProf,dateReelDebut,dateReelFin,res)
}

exports.SupprimerEdt=(req,res)=>{
    const {idEns} = req.params
    edt.SupprimerEdt(idEns,res)
}

exports.ModifierEdt=(req,res)=>{
    const {idEns,dateHeurePlanDebut,dateHeurePlanFin}=req.body
    edt.ModifierEdt(idEns,dateHeurePlanDebut,dateHeurePlanFin,res)
}

exports.TotalHeureTravaillee=(req,res)=>{
    const {idProf,dateDebut,dateFin}=req.body
    edt.TotalHeureTravaillee(idProf,dateDebut,dateFin,res)
}

exports.effacerProfClasse = (req,res) => {
    const {codemat,idProf,idClasse}=req.params
    edt.effacerProfClasse(codemat,idProf,idClasse,res)
}