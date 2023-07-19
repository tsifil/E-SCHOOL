const professeur = require('../../models/actions/professeurModel')


exports.ajoutAbsence = (req,res) => {
    const {codemat,motif,idTrimestre,date_Abs,im,mat,typeAbsence,HeureEnr} = req.body    
   
    const imFilter = im.filter(element=>element!==null)
    const typeAbsenceFiltrer = typeAbsence.filter(element=>element!==null)
   
    professeur.ajoutAbsence(res,codemat,imFilter,motif,idTrimestre,date_Abs,typeAbsenceFiltrer,HeureEnr)
}

exports.listeProfs = (req,res) => {
    professeur.listeProfs(res)
}

exports.Ajouter = (req,res) => {
    const {nomPrenom,sexe,adresse,contact,cin,classification} = req.body
    professeur.Ajouter(nomPrenom,sexe,adresse,contact,cin,classification,res)
}

exports.Classe = (req,res) => {
    professeur.Classe(res)
}

exports.EleveInd = (req,res) => {
    const {idAs,idClasse} = req.body
    professeur.EleveInd(idAs,idClasse,res)
}

exports.Trimestre = (req,res) => {
    const {idAs} = req.params
    professeur.Trimestre(idAs,res)
}

exports.Evaluation = (req,res) => {
    professeur.Evaluation(res)
}

exports.AjouterNoteIndividuelle = (req,res) => {

    const {numMatricule,idClasse,codemat,idTrimestre,idEvalua,note,date} = req.body
    professeur.AjouterNoteIndividuelle(numMatricule,idClasse,codemat,idTrimestre,idEvalua,note,date,res)
}

exports.EleveGrp = (req,res) => {
    const {idAs,idClasse} = req.body
    professeur.EleveGrp(idAs,idClasse,res)
}
// ADMIN
exports.MatiereTrimestre= (req,res) => {
    const {idAs} = req.params
    professeur.MatiereTrimestre(idAs,res)
}
// PROFS
exports.MatiereTrimestreProf = (req,res) => {
    const {idProf,idAs} = req.params
    professeur.MatiereTrimestreProf(idProf,idAs,res)
}
// ADMIN
exports.VoirNote= (req,res) => {
    const {idTrimestre,codemat} = req.params
    professeur.VoirNote(idTrimestre,codemat,res)
}
// PROFS
exports.VoirNoteProf = (req,res) => {
    const {idProf,idTrimestre,codemat} = req.params
    professeur.VoirNoteProf(idProf,idTrimestre,codemat,res)
}

exports.NoteDuplicate = (req,res) => {
    const {idTrimestre,codemat,idClasse,idEvalua} = req.params
    professeur.NoteDuplicate(idClasse,idEvalua,idTrimestre,codemat,res)
}

exports.AfficherNote= (req,res) => {
    const {coefficient,idTrimestre,codemat,idClasse,idEvalua,idAs} = req.params
    professeur.AfficherNote(coefficient,idTrimestre,codemat,idClasse,idEvalua,idAs,res)
}

exports.getCoefficient= (req,res) => {
    const {idClasse,codemat} = req.params
    professeur.getCoefficient(idClasse,codemat,res)
}

exports.pointageEleve = (req,res) => {
    const {idAs,idClasse,numMatricule} = /*req.params*/req.body
    professeur.pointageEleve(numMatricule,idAs,idClasse,res)
}

exports.nouveauAbsent = (req,res) => {
    const {dateAbs,heureDebut,heureFin,motif,numMatricule,codemat,idTrimestre} = req.body
    professeur.nouveauAbsent(dateAbs,heureDebut,heureFin,motif,numMatricule,codemat,idTrimestre,res)
}

exports.detailAbsence = (req,res) => {

}

exports.nombreHeureAbsence = (req,res) => {
    const {idClasse,codemat,idTrimestre,idAs} = req.body
    professeur.nombreHeureAbsence(idClasse,codemat,idTrimestre,idAs,res)
}

exports.noteGroupee = (req,res) => {
    const {mat,notes,idTrimestre,idClasse,codemat,idEvalua,date,commentaire,public} = req.body
    professeur.AjouterNoteGrp(mat,notes,idTrimestre,idClasse,codemat,idEvalua,date,commentaire,public,res)
    
}
exports.Modifier = (req,res) => {
    const {idPass,notes,commentaire}=req.body
    for(let i=0;i<idPass.length;i++){
        professeur.Modifier(idPass[i],notes[i],commentaire[i],res)
    }
}


exports.Niveau = (req,res) => {
    professeur.Niveau(res)
}

exports.Matiere = (req,res) => {
    professeur.Matiere(res)
}

exports.NouveauDevoir = (req,res) => {
      const {datePub,objet,idProf,idClasse} = req.body
      const myFile = req.files.file
            myFile.mv(`${__dirname}/upload/fichier_devoir/${myFile.name}`,function(err){
                  if(err){
                  console.log(err)
                  res.sendStatus(400);
                  res.json({msg:"Error"})
                  }
                        var fichier = 'http://127.0.0.1:2002//fichier_devoir/' + myFile.name
                        professeur.NouveauDevoir(datePub,objet,fichier,idProf,idClasse)
            })
}
/// com

exports.VerificationNote = (req,res) => {
    const {idClasse,codemat,idTrimestre,idEvalua} = req.body
    professeur.verificationNote(idClasse,codemat,idTrimestre,idEvalua,res)
}

exports.StructureEnregistrementNote = (req,res) => {
    const {idEvalua,idClasse,idTrimestre,idNiv,codemat} = req.params
    professeur.StructureEnregistrementNote(idEvalua,idClasse,idTrimestre,idNiv,codemat,res)
}

exports.listeEleve = (req,res) => {
    const {idClasse,idNiv,idAs} = req.params
    professeur.listeEleve(idClasse,idNiv,idAs,res)
}

exports.SommeMoyenneMatiere = (req,res) => {
    const {coef,idClasse,idEvalua,idTrimestre,codemat,idAs} = req.params
    professeur.SommeMoyenneMatiere(coef,idClasse,idEvalua,idTrimestre,codemat,idAs,res)
}

exports.NotePlusHaut = (req,res) => {
    const {idClasse,idEvalua,idTrimestre,codemat} = req.params
    professeur.NotePlusHaut(idClasse,idEvalua,idTrimestre,codemat,res)
}

exports.NotePlusBasse = (req,res) => {
    const {idClasse,idEvalua,idTrimestre,codemat} = req.params
    professeur.NotePlusBas(idClasse,idEvalua,idTrimestre,codemat,res)
}

exports.TableauMoyenne = (req,res) => {
    const {idClasse} = req.body
    professeur.TableauMoyenne(idClasse,res)
}

exports.MoyenneDuplicate = (req,res) => {
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.MoyenneDuplicate(idClasse,idTrimestre,idEvalua,idNiv,res)
}

exports.TableauMoyenneEleve = (req,res) => {
    //const {idClasse,idAs} = req.body
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.TableauMoyenneEleve(idClasse,idTrimestre,idEvalua,idNiv,res)
}

exports.Contenus = (req,res) => {
    const {idTrimestre,idNiv,idEvalua,idClasse,idAs} = req.params
    professeur.Contenus(idTrimestre,idNiv,idEvalua,idClasse,idAs,res)
}

exports.fichePresence = (req,res) => {
    const {idClasse,idAs} = req.body
    professeur.fichePresence(idClasse,idAs,res)
}

exports.ProfClasse = (req,res) => {
    const {idProf} = req.params
    professeur.ProfClasse(idProf,res)
}

exports.ProfMatiere = (req,res) => {
    const {idProf} = req.params
    professeur.ProfMatiere(idProf,res)
}

exports.MatiereClasse = (req,res) => {
    const {idClasse} = req.params
    professeur.MatiereClasse(idClasse,res)
}

exports.ProfMatiereClasse = (req,res) => {
    const {idClasse,idProf} = req.params
    professeur.ProfMatiereClasse(idClasse,idProf,res)
}

exports.contenusConsultationMoyenne = (req,res) => {
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.contenusConsultationMoyenne(idClasse,idTrimestre,idEvalua,idNiv,res)
}

exports.MoyenneGeneraleClasse = (req,res) => {
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.MoyenneGeneraleClasse(idNiv,idTrimestre,idClasse,idEvalua,res)
}

exports.MoyenneGeneralHaut = (req,res) => {
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.MoyenneGeneralHaut(idNiv,idTrimestre,idClasse,idEvalua,res)
}

exports.MoyenneGeneralBas = (req,res) => {
    const {idClasse,idTrimestre,idEvalua,idNiv} = req.body
    professeur.MoyenneGeneralBas(idNiv,idTrimestre,idClasse,idEvalua,res)
}

exports.EditerNoteEleve = (req,res) => {
    const {idTrimestre,codemat,idClasse,idEvalua,idAs} = req.params
    professeur.EditerNoteEleve(idTrimestre,codemat,idClasse,idEvalua,idAs,res)
}

exports.PlusInfosDetailNote = (req,res) => {
    const {idTrimestre,codemat,idClasse,idEvalua,idAs} = req.params
    professeur.PlusInfosDetailNote(idTrimestre,codemat,idClasse,idEvalua,idAs,res)
}

exports.SupprimerEvaluation = (req,res) => {
    const {idEvalua,idTrimestre,idClasse} = req.params
    professeur.SupprimerEvaluation(idEvalua,idTrimestre,idClasse,res)
}

//
exports.ListeProfesseur = (req,res) => {
    professeur.ListeProfesseur(res)
}
exports.RechercheProf = (req,res) => {
    const {recherche} = req.body
    professeur.RechercheProf(recherche,res)
}
exports.ModifierProfesseur = (req,res) => {
    const {idProf,nomPrenom,adresse,contact,cin,classification,sexe}=req.body
    professeur.ModifierProfesseur(idProf,nomPrenom,adresse,contact,cin,classification,sexe,res)
}
exports.SupprimerProfesseur = (req,res) => {
    const {idProf}=req.params
    professeur.SupprimerProfesseur(idProf,res)
}