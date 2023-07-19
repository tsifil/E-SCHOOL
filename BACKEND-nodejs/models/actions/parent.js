const db = require('../../util/baseDeDonnees');
module.exports = class Parent{
        static matiereEleve(numMatricule,idAs,res){
            const requete="SELECT classe.idClasse,classe.libelleClasse FROM"
            +" inscription,classe WHERE(classe.idClasse=inscription.idClasse) AND "
            +" inscription.numMatricule='"+numMatricule+"' AND inscription.idAs='"+idAs+"'"
            return db.query(requete,(err,result)=>{
                if(err){console.log(err)}
                else{
                    if(result==""){
                        res.send("")
                    }else{
                            const requete="SELECT matiere.nomMatiere,association.coefficient"
                            +" FROM association,niveau,matiere,classe WHERE"
                            +" (association.idNiv=niveau.idNiv)AND(association.codemat"
                            +" =matiere.codemat)AND(classe.idNiv=niveau.idNiv)AND(classe.idClasse)='"+result[0].idClasse+"'"
                            return db.query(requete,(err,result2)=>{
                                if(err){console.log(err)}
                                else{res.json({result2:result2,classe:result[0].libelleClasse})}
                            })
                    }
                }
            })
        }

        static eleveProfesseur(numMatricule,idAs,res){
            const requete="SELECT classe.idClasse,classe.libelleClasse FROM"
            +" inscription,classe WHERE(classe.idClasse=inscription.idClasse) AND "
            +" inscription.numMatricule='"+numMatricule+"' AND inscription.idAs='"+idAs+"'"
            return db.query(requete,(err,result)=>{
                if(err){console.log(err)}
                else{
                    if(result==""){
                        res.send("")
                    }else{
                        const req="SELECT professeur.sexe,professeur.idProf,professeur.nomPrenom FROM matiere,enseigne,classe,professeur WHERE (matiere.codemat=enseigne.codemat) AND (classe.idClasse=enseigne.idClasse) AND (professeur.idProf=enseigne.idProf) AND enseigne.idClasse='"+result[0].idClasse+"' GROUP BY enseigne.codemat ORDER BY enseigne.idEns DESC"
                        return db.query(req,(err,result2)=>{
                                if(err){console.log(err)}
                                else{
                                   res.json({result2:result2,classe:result[0].libelleClasse})
                                }
                        })
                    }
                }
            })
        }

        static UnEnfant(idAs,idPers,res){
            const requete="SELECT DISTINCT eleve.numMatricule as id"
            +" FROM eleve,personne WHERE (eleve.idPers_etre_pere='"+idPers+"'"
            +" OR eleve.idPers_etre_mere='"+idPers+"') OR eleve.numMatricule IN"
            +" (SELECT eleve.numMatricule FROM tuteur WHERE(tuteur.idPers=personne.idPers)"
            +" AND(eleve.numMatricule=tuteur.numMatricule) AND tuteur.idPers='"+idPers+"')"
            +" LIMIT 1"
            db.query(requete,(err,result)=>{
                if(err){console.log(err)}else{
                if(result==""){res.send("")}else{
                      res.json({id:result[0].id})
                  }
                }
            })
        }

        static listeEnfant(idAs,idPers,res){
            const requete = "SELECT DISTINCT eleve.numMatricule as id,CONCAT(eleve.nom,' ',eleve.prenom) as text"
            +" FROM eleve,personne WHERE"
            +" (eleve.idPers_etre_pere='"+idPers+"' OR eleve.idPers_etre_mere='"+idPers+"') OR"
            +" eleve.numMatricule IN (SELECT eleve.numMatricule FROM tuteur WHERE(tuteur.idPers=personne.idPers)"
            +" AND(eleve.numMatricule=tuteur.numMatricule) AND tuteur.idPers='"+idPers+"')"
            
            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result==""){

                    }else{
                        res.json({result:result,numMatricule:result[0].id})
                    }
                    //console.log(result)
                }
            })
        }

        static AfficherAbs(idAs,numMatricule,res){
           
const requete = "SELECT matiere.nomMatiere,absence.idAbsence,absence.dateAbs,"
            +" absence.typeAbsence,absence.motif,trimestre.libelle FROM absence,"
            +" trimestre,anneescolaire,matiere WHERE (matiere.codemat=absence.codemat)"
            +" AND (absence.idTrimestre=trimestre.idTrimestre)"
            +" AND (anneescolaire.idAs=trimestre.idAs) AND"
            +" anneescolaire.idAs='"+idAs+"'"
            +" AND (absence.numMatricule='"+numMatricule+"')"

            return db.query(requete,(err,result)=>{
                if(err){console.log(err)}
                else{
                    if(result==""){
                        res.json({msg404:"Aucun enregistrement trouve"})
                    }else{
                        res.json({msg200:result})
                    }
                }
            })
        }

        static NombreAbsence(idAs,numMatricule,res){
            const requete="SELECT COUNT(absence.idAbsence) as  FROM"
            +" absence,trimestre,anneescolaire WHERE (absence.idTrimestre"
            +" =trimestre.idTrimestre) AND (anneescolaire.idAs=trimestre.idAs)"
            +" AND anneescolaire.idAs='"+idAs+"' AND (absence.numMatricule='"+numMatricule+"')"

            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
        }

        /*static NombreAbsenceJustifiee(){
            const requete="SELECT COUNT(absence.idAbsence) as  FROM"
            +" absence,trimestre,anneescolaire WHERE (absence.idTrimestre"
            +" =trimestre.idTrimestre) AND (anneescolaire.idAs=trimestre.idAs)"
            +" AND anneescolaire.idAs='"+idAs+"' AND (absence.numMatricule='"+numMatricule+"') AND (absence.motif='')" 

            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
        }*/

static NombreRetard(numMatricule,idAs,res){

    const requete="SELECT COUNT(idAbsence) as ret FROM absence,eleve,"
        +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
        +" typeAbsence='En retard' AND (eleve.numMatricule='"+numMatricule+"')"
        +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
        +".idAs='"+idAs+"')"
            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
}
        
static NombreAbsenceNonJustifiee(numMatricule,idAs,res){
        const requete="SELECT COUNT(idAbsence) as absInj FROM absence,eleve,"
        +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
        +" typeAbsence='Absence' AND motif=''  AND (eleve.numMatricule='"+numMatricule+"')"
        +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
        +".idAs='"+idAs+"')"
            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
        }
static NombreAbsenceJustifiee(numMatricule,idAs,res){
    const requete="SELECT COUNT(idAbsence) as absJus FROM absence,eleve,"
    +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
    +" typeAbsence='Absence' AND motif!='' AND (eleve.numMatricule='"+numMatricule+"')"
    +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
    +".idAs='"+idAs+"')"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
}
        
        static eleveNotes(numMatricule,idClasse,idEvalua,idTrimestre,res){
            const req="SELECT evaluation.libelleEvalua,matiere.nomMatiere,association.coefficient"
            +" ,passer_evaluation.public,passer_evaluation.idPass,"
            +" passer_evaluation.date,passer_evaluation.note,"
            +" passer_evaluation.commentaire FROM matiere,passer_evaluation"
            +" ,trimestre,association,classe,niveau,evaluation WHERE (passer_evaluation.codemat"
            +" =matiere.codemat) AND (association.codemat=passer_evaluation.codemat)"
            +" AND (passer_evaluation.idTrimestre=trimestre.idTrimestre)"
            +" AND (classe.idNiv=niveau.idNiv) AND (association.idNiv=classe.idNiv)"
            +" AND (passer_evaluation.idClasse=classe.idClasse) AND"
            +" (evaluation.idEvalua=passer_evaluation.idEvalua) AND"
            +" (passer_evaluation.numMatricule='"+numMatricule+"') AND (passer_evaluation.idEvalua='"+idEvalua+"')"
            +" AND (passer_evaluation.idTrimestre='"+idTrimestre+"') AND passer_evaluation.idClasse='"+idClasse+"'"

            return db.query(req,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
        }

        // BULLETIN

        static infoEleve(numMatricule,idClasse,idTrimestre,idEvalua,res){
            
            const req="SELECT eleve.numMatricule,eleve.nom,eleve.prenom,eleve."
            +" dateNaissance,classe.libelleClasse,((SUM(passer_evaluation.note))/(SUM"
            +" (association.coefficient))) as  moyenneTri,SUM(passer_evaluation.note)"
            +" as totalMoyenneEleve,SUM(association.coefficient) as totalCoeff FROM" 
            +" passer_evaluation,evaluation,classe,eleve,association WHERE (classe."
            +"idNiv=association.idNiv) AND (association.codemat=passer_evaluation."
            +"codemat) AND (passer_evaluation.idClasse=classe.idClasse)AND(eleve.numMatricule"
            +"= passer_evaluation.numMatricule)AND(evaluation.idEvalua=passer_evaluation.idEvalua)"
            +" AND(passer_evaluation.idTrimestre='"+idTrimestre+"' AND passer_evaluation.idClasse='"+idClasse+"')"
            +" AND passer_evaluation.numMatricule='"+numMatricule+"' AND passer_evaluation.valider=1" 
            +" AND passer_evaluation.idEvalua='"+idEvalua+"' GROUP BY passer_evaluation.numMatricule"
        
            db.query(req,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
    }

    static BulletinEleve(idClasse,idTrimestre,idEvalua,res){
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

    static Appreciation(numMatricule,idClasse,idTrimestre,idEvalua,res){
        const req="SELECT passer_evaluation.idPass,matiere.codemat,eleve.numMatricule,passer_evaluation."
        +"note as moyEleve,passer_evaluation.commentaire FROM matiere,association"
        +",passer_evaluation,evaluation,classe,eleve WHERE (classe.idNiv=association"
        +".idNiv) AND (association.codemat=passer_evaluation.codemat)AND(eleve."
        +"numMatricule = passer_evaluation.numMatricule)AND(passer_evaluation."
        +"codemat=matiere.codemat)AND(passer_evaluation.idClasse=classe.idClasse)"
        +"AND(evaluation.idEvalua=passer_evaluation.idEvalua)AND(association."
        +"codemat = passer_evaluation.codemat)AND(passer_evaluation.idClasse='"+idClasse+"')"
        +"AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" AND (eleve.numMatricule='"+numMatricule+"')"
    
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static MoyenneDuplicate(idClasse,idTrimestre,idEvalua,res){
        
        const req="SELECT idNiv FROM classe WHERE idClasse='"+idClasse+"'"
        db.query(req,(err,resultat)=>{
            if(err){
                console.log(err)
            }else{

        const requete="SELECT eleve.numMatricule,"
        +" ((SUM(passer_evaluation.note))/(SUM(association.coefficient))) as moyenneEleve"
        +" FROM eleve,passer_evaluation,association WHERE(eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat) AND passer_evaluation.idClasse='"+idClasse+"'"
        +" AND passer_evaluation.idTrimestre='"+idTrimestre+"' AND passer_evaluation.idEvalua='"+idEvalua+"'"
        +" AND association.idNiv='"+resultat[0].idNiv+"' GROUP BY numMatricule"
        
         db.query(requete,(err,result)=>{
                if(err){console.log(err)}
                else{
                    let arr=[]
                    for(let i=0;i<result.length;i++){
                        arr[i]=[result[i].moyenneEleve]
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
        }})
    }


    static Rang(idClasse,idEvalua,idTrimestre,res){
        
        const req="SELECT idNiv FROM classe WHERE idClasse='"+idClasse+"'"
        db.query(req,(err,resultat)=>{
            if(err){
                console.log(err)
            }else{
            
        const requete="SELECT eleve.numMatricule,((SUM(passer_evaluation.note))/(SUM"
        +" (association.coefficient))) as moyenneEleve FROM eleve,passer_evaluation"
        +" ,association WHERE (eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat) AND"
        +" passer_evaluation.idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"'"
        +" AND passer_evaluation.idEvalua='"+idEvalua+"' AND association.idNiv='"+resultat[0].idNiv+"'"
        +" GROUP BY numMatricule ORDER BY moyenneEleve DESC"

        return db.query(requete,(err,result)=>{
                if(err){console.log(err)
                }else{
              var donnee=[]
                for(let i=0;i<result.length;i++){
                      if(i != 0 && result[i].moyenneEleve == result[i-1].moyenneEleve){
                          result[i].classement = result[i-1].classement
                          donnee[i]={
                              numMatricule:result[i].numMatricule,
                              rang:result[i].classement
                          }
                      }else{
                          result[i].classement=i+1
                          donnee[i]={
                            numMatricule:result[i].numMatricule,
                            rang:result[i].classement
                          }
                      }
                }
                    res.send(donnee)
                    //console.log(donnee)
                }
            })

                
        }
    })
  }
  static ParentHoraire(numMatricule,idAs,res){
    const requete="SELECT classe.idClasse FROM inscription,classe WHERE"
    +"(classe.idClasse=inscription.idClasse) AND inscription.numMatricule"
    +"='"+numMatricule+"' AND inscription.idAs='"+idAs+"'"
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{
            if(result==""){ 
                res.send("")
            }else{
                const requete="SELECT DISTINCT DATE_FORMAT(dateHeurePlanDebut,'%H:%i')as"
                +" heureMinuteD,DATE_FORMAT(dateHeurePlanFin,'%H:%i') as heureMinuteF"
                +" FROM enseigne WHERE idClasse='"+result[0].idClasse+"'"
                +" AND dateHeurePlanDebut NOT IN('0000-00-00 00:00:00')"
                +" ORDER BY heureMinuteD,heureMinuteF ASC"

                return db.query(requete,(err,result2)=>{
                        if(err){console.log(err)}
                        else{
                           res.json(result2)
                        }
                })
            }
        }
    })
  }

  static CorpsEdt(numMatricule,idAs,res){
    const requete="SELECT classe.idClasse FROM inscription,classe WHERE"
    +"(classe.idClasse=inscription.idClasse) AND inscription.numMatricule"
    +"='"+numMatricule+"' AND inscription.idAs='"+idAs+"'"
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{
            if(result==""){ 
                res.send("")
            }else{

        const requete="SELECT DAYOFWEEK(enseigne.dateHeurePlanDebut) as jour,enseigne.dateHeurePlanDebut,enseigne.idEns,DATE_FORMAT(enseigne.dateHeurePlanDebut,'%H:%i')" 
        +" as heureDebut,DATE_FORMAT(enseigne.dateHeurePlanFin,'%H:%i') as heureFin,"
        +" matiere.nomMatiere FROM enseigne,matiere WHERE (matiere.codemat=enseigne.codemat)"
        +" AND enseigne.idClasse='"+result[0].idClasse+"'"
        +" AND dateHeurePlanDebut NOT IN('0000-00-00 00:00:00')"

                return db.query(requete,(err,result2)=>{
                        if(err){console.log(err)}
                        else{
                           res.json(result2)
                        }
                })
            }

            
        }
    })
  }

  static VerfierBulletin(numMatricule,idClasse,idTrimestre,idEvalua,res){
        const req="SELECT*FROM passer_evaluation WHERE numMatricule='"+numMatricule+"'"
        +" AND idClasse='"+idClasse+"' AND idTrimestre='"+idTrimestre+"' AND idEvalua='"+idEvalua+"'"
        +" AND valider=1"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.json({msg404:'nOk'})
                }else{
                    res.json({msg200:'ok'})
                }
            }
        })
  }

}