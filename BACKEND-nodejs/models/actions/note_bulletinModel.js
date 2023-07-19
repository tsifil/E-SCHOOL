const db = require('../../util/baseDeDonnees');
module.exports = class Note_bulletin{
    
static consultationMoyenne(idClasse,codemat,idTrimestre,idEvalua,idNiv,res){
    const requete = "SELECT CONCAT(eleve.nom,' ',eleve.prenom)"
    +" as np,eleve.numMatricule,eleve.sexe,passer_evaluation.note"
    +" as total,association.coefficient as diviserPar FROM eleve,"
    +" passer_evaluation,association WHERE (eleve.numMatricule="
    +" passer_evaluation.numMatricule) AND (association.codemat="
    +" passer_evaluation.codemat) AND passer_evaluation.idClasse='"+idClasse+"'"
    +" AND passer_evaluation.codemat='"+codemat+"' AND passer_evaluation.idTrimestre="
    +" '"+idTrimestre+"' AND passer_evaluation.idEvalua='"+idEvalua+"' AND"
    +" association.idNiv='"+idNiv+"'" 
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{res.send(result)}
    })
}


// com
static MoyenneDuplicate(idClasse,idTrimestre,idEvalua,res){
    const req="SELECT ((SUM(passer_evaluation.note))/(SUM(association.coefficient))) as moyenneTri FROM" 
    +" passer_evaluation,evaluation,classe,eleve,association WHERE (classe.idNiv=association.idNiv) AND"
    +" (association.codemat=passer_evaluation.codemat) AND (passer_evaluation.idClasse=classe.idClasse)"
    +" AND(eleve.numMatricule=passer_evaluation.numMatricule)AND(evaluation.idEvalua=passer_evaluation.idEvalua)"
    +" AND(passer_evaluation.idTrimestre='"+idTrimestre+"' AND passer_evaluation.idClasse='"+idClasse+"')" 
    +"AND passer_evaluation.idEvalua='"+idEvalua+"' GROUP BY passer_evaluation.numMatricule"
    +" ORDER BY moyenneTri DESC"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
                    let arr=[]
                    for(let i=0;i<result.length;i++){
                            arr[i]=[result[i].moyenneTri]
                    }
                    const findDuplicate = arr=>(arr.flat()).filter((item,index)=>(arr.flat()).indexOf(item) !==index)
                    const duplicates=findDuplicate(arr)
                    let duplicatesJSON=[]
                    for(let j=0;j<duplicates.length;j++){
                        duplicatesJSON[j]={moyenneEX:duplicates[j]}
                    }
                    res.send(duplicatesJSON)
        }
    })
}

static infoEleve(idClasse,idTrimestre,idEvalua,res){
    const req="SELECT eleve.numMatricule,eleve.nom,eleve.prenom,eleve."
    +" dateNaissance,classe.libelleClasse,((SUM(passer_evaluation.note))/(SUM"
    +" (association.coefficient))) as moyenneTri,SUM(passer_evaluation.note)"
    +" as totalMoyenneEleve,SUM(association.coefficient) as totalCoeff FROM" 
    +" passer_evaluation,evaluation,classe,eleve,association WHERE (classe."
    +"idNiv=association.idNiv) AND (association.codemat=passer_evaluation."
    +"codemat) AND (passer_evaluation.idClasse=classe.idClasse)AND(eleve.numMatricule"
    +"= passer_evaluation.numMatricule)AND(evaluation.idEvalua=passer_evaluation.idEvalua)"
    +" AND(passer_evaluation.idTrimestre='"+idTrimestre+"' AND passer_evaluation.idClasse='"+idClasse+"')" 
    +"AND passer_evaluation.idEvalua='"+idEvalua+"' GROUP BY passer_evaluation.numMatricule"
    +" ORDER BY moyenneTri DESC"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            var donnee=[]
                      for(let i=0;i<result.length;i++){
                            if(i != 0 && result[i].moyenneTri == result[i-1].moyenneTri){
                                result[i].classement = result[i-1].classement
                                donnee[i]={
                                    numMatricule:result[i].numMatricule,
                                    nom:result[i].nom,
                                    prenom:result[i].prenom,
                                    dateNaissance:result[i].dateNaissance,
                                    libelleClasse:result[i].libelleClasse,
                                    moyenneTri:result[i].moyenneTri,
                                    totalMoyenneEleve:result[i].totalMoyenneEleve,
                                    totalCoeff:result[i].totalCoeff,
                                    rang:result[i].classement
                                }
                            }else{
                                result[i].classement=i+1
                                donnee[i]={
                                    numMatricule:result[i].numMatricule,
                                    nom:result[i].nom,
                                    prenom:result[i].prenom,
                                    dateNaissance:result[i].dateNaissance,
                                    libelleClasse:result[i].libelleClasse,
                                    moyenneTri:result[i].moyenneTri,
                                    totalMoyenneEleve:result[i].totalMoyenneEleve,
                                    totalCoeff:result[i].totalCoeff,
                                    rang:result[i].classement
                                }
                            }
                      }
                res.send(donnee) 
        }
    })
}

static BulletinParClasse(idEvalua,idTrimestre,idClasse,res){
    const req="SELECT matiere.codemat,matiere.nomMatiere,association."
    +"coefficient,SUM(note) as MoyenneClasse,MAX(note) as noteHaut,MIN(note)" 
    +"as noteBas FROM passer_evaluation,association,classe,matiere,evaluation"
    +" WHERE (classe.idNiv=association.idNiv) AND (matiere.codemat=association"
    +" .codemat) AND (association.codemat=passer_evaluation.codemat) AND"
    +" (passer_evaluation.idClasse=classe.idClasse) AND (evaluation.idEvalua"
    +"= passer_evaluation.idEvalua) AND (passer_evaluation.idTrimestre='"+idTrimestre+"'"
    +" AND passer_evaluation.idClasse='"+idClasse+"')AND passer_evaluation.idEvalua='"+idEvalua+"'"
    +" GROUP BY passer_evaluation.codemat,passer_evaluation.idTrimestre,"
    +" passer_evaluation.idEvalua,passer_evaluation.idClasse"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result==""){

            }else{
                    let sumNoteBas=0
                    let sumNoteHaut=0
                    let sumMoyenneClasse=0
                    for(let i = 0;i<result.length;i++){
                        sumNoteBas += result[i].noteBas
                        sumNoteHaut += result[i].noteHaut
                        sumMoyenneClasse += result[i].MoyenneClasse
                    }
                    res.json({result:result,sumNoteBas:sumNoteBas,sumNoteHaut:sumNoteHaut,sumMoyenneClasse:sumMoyenneClasse})
                }
            }
    })
}

static AppreciationEtMoyenneEleve(idEvalua,idTrimestre,idClasse,res){
    const req="SELECT passer_evaluation.idPass,matiere.codemat,eleve.numMatricule,passer_evaluation."
    +"note as moyEleve,passer_evaluation.commentaire FROM matiere,association"
    +",passer_evaluation,evaluation,classe,eleve WHERE (classe.idNiv=association"
    +".idNiv) AND (association.codemat=passer_evaluation.codemat)AND(eleve."
    +"numMatricule = passer_evaluation.numMatricule)AND(passer_evaluation."
    +"codemat=matiere.codemat)AND(passer_evaluation.idClasse=classe.idClasse)"
    +"AND(evaluation.idEvalua=passer_evaluation.idEvalua)AND(association."
    +"codemat = passer_evaluation.codemat)AND(passer_evaluation.idClasse='"+idClasse+"')"
    +"AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

static NombreAbsence(){
    const req="SELECT eleve.numMatricule,COUNT(idAbsence) as nbrAbs"
    +" FROM absence,eleve,inscription WHERE (absence.numMatricule=eleve."
    +" numMatricule)  AND (inscription.numMatricule=eleve.numMatricule)"
    +" AND (inscription.idAs='"+idAs+"')AND(absence.idTrimestre='"+idTrimestre+"')"
    +" AND(inscription.idClasse='"+idClasse+"')AND absence.typeAbsence='Absence'"
    +" GROUP BY eleve.numMatricule"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

static ValiderBulletin(idClasse,idTrimestre,idEvalua,res){
    const req="UPDATE passer_evaluation SET public=1,valider=1 WHERE idClasse='"+idClasse+"'"
    +" AND idTrimestre='"+idTrimestre+"' AND idEvalua='"+idEvalua+"'"    
    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg:"validation a reuissi"})
        }
    })
}


static RangNote(idClasse,idEvalua,idTrimestre,codemat,res){
    const requete = "SELECT eleve.numMatricule,passer_evaluation.note"
    +" as note FROM passer_evaluation,eleve WHERE (eleve.numMatricule ="
    +" passer_evaluation.numMatricule) AND (passer_evaluation.idClasse='"+idClasse+"')"
    +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND"
    +" (passer_evaluation.idTrimestre='"+idTrimestre+"') AND (passer_evaluation.codemat='"+codemat+"')"
    +" ORDER BY passer_evaluation.note DESC"
    
    return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                  
                  var donnee=[]
                  for(let i=0;i<result.length;i++){
                        if(i != 0 && result[i].note == result[i-1].note){
                            result[i].classement = result[i-1].classement
                            donnee[i]={rang:result[i].classement,numMatricule:result[i].numMatricule,note:result[i].note}
                        }else{
                            result[i].classement=i+1
                            donnee[i]={rang:result[i].classement,numMatricule:result[i].numMatricule,note:result[i].note}
                        }
                  }
                  //console.log(donnee)
            }
        })
}

static EleveListe(idClasse,idTrimestre,idEvalua,res){
    const req="SELECT CONCAT(eleve.nom,' ',eleve.prenom) as nom,eleve.sexe,"
    +"eleve.numMatricule,passer_evaluation.valider FROM eleve,passer_evaluation"
    +" WHERE (eleve.numMatricule=passer_evaluation.numMatricule) AND"
    +"(passer_evaluation.idTrimestre='"+idTrimestre+"')AND(passer_evaluation.idClasse='"+idClasse+"')"
    +" AND (passer_evaluation.idEvalua='"+idEvalua+"') GROUP BY numMatricule"

    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

static Devalider(numMatricule,idTrimestre,idEvalua,idClasse,res){
    const req="UPDATE passer_evaluation SET valider=0 WHERE numMatricule='"+numMatricule+"'"
    +" AND idTrimestre='"+idTrimestre+"' AND idEvalua='"+idEvalua+"' AND idClasse='"+idClasse+"'"
     db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
        }
     })
}

static Valider(numMatricule,idTrimestre,idEvalua,idClasse,res){
    const req="UPDATE passer_evaluation SET valider=1 WHERE numMatricule='"+numMatricule+"'"
    +" AND idTrimestre='"+idTrimestre+"' AND idEvalua='"+idEvalua+"' AND idClasse='"+idClasse+"'"
     db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            
        }
     })
}

static LegendeBulletin(idEvalua,idTrimestre,res){
    const req="SELECT trimestre.libelle,evaluation.libelleEvalua"
    +" FROM trimestre,evaluation WHERE trimestre.idTrimestre='"+idTrimestre+"'"
    +" AND evaluation.idEvalua='"+idEvalua+"'"
    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

}
