const db = require('../../util/baseDeDonnees');
module.exports = class Eleve{

static As(res){
    const req="SELECT idAs as id, libelle as text FROM anneescolaire"
    db.query(req,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

static SupprimerEleveInscrit(idInscri,res){
    /*const requete="DELETE FROM inscription WHERE idInscri='"+idInscri+"'"
    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg200:"La suppression a effectuée avec succès."})
        }
    })*/
    
    const requete="UPDATE inscription SET idClasse=56,idAs=22 WHERE idInscri='"+idInscri+"'"
    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg200:"La suppression a effectuée avec succès."})
        }
    })

}

static SupprimerEleve(id,res) {
    const requete="DELETE FROM eleve WHERE numMatricule='"+id+"'"
    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({msg200:"La suppression a effectuée avec succès."})
        }
    })
}

static Inscription(nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,
                    idPers_etre_pere,idPers_etre_mere,photo,porteur,mesureUrgence,
                    autorisationCamera,dateInscription,idPers,idClasse,idAs,res){
    const ajout_eleve = "INSERT INTO eleve VALUES(?,?,?,?,?,?,?,?,?,?,?)"
    const ajout_inscription = "INSERT INTO inscription VALUES(?,?,?,?,?,?,?,?,?,?)"
    const recupere_matricule = "SELECT * FROM eleve ORDER BY numMatricule DESC LIMIT 1"
return db.query(ajout_eleve,[null,nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere]
    ,(err,resultat)=>{
        if(err){console.log(err)}
        else{
            return db.query(recupere_matricule,(error,resultat2)=>{
                if(error){
                    console.log(error)
                }else{
                        if(resultat2==""){

                            res.send("resultat null")

                        }else{
                                    const matriculation = resultat2[0].numMatricule
                                    return db.query(ajout_inscription,[null,photo,porteur,
                                        mesureUrgence,autorisationCamera,dateInscription,idPers,idClasse,idAs,matriculation],(err,result)=>{
                                                if(err){
                                                    console.log(err)
                                                }else{

                                                    res.json({msg202:"La nouvelle inscription est enregistrée avec succès"})
                                                }
                                    })
                        }
                  }
            })
                
        }
    })
 }

static ListeEleve(idAs,res){
    return db.query("SELECT eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,eleve.dateNaissance"
                   +" ,inscription.idAs as idParams,eleve.sexe,inscription.dateInscription,SUM(inscription.idAs = ?) as idAs"
                   +" FROM eleve,inscription,anneescolaire WHERE (eleve.numMatricule = inscription.numMatricule)"
                   +" AND (inscription.idAs = anneescolaire.idAs) GROUP BY numMatricule ORDER BY numMatricule DESC",[idAs],(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                            res.send(result)                   
                    }
    })
}

static DetailEleve(numMatricule,res){
    const requete = "SELECT * FROM eleve WHERE numMatricule='"+numMatricule+"'"
    return db.query(requete,(err,result)=>{
       if(err){
           console.log(err)
       }else{
           res.send(result)
       }
    })
}

static ModifierEleve(numMatricule,nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,
                    allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere,res){
    
        const requete = "UPDATE eleve SET nom=?,prenom=?,sexe=?,dateNaissance=?,lieuNaissance=?,nationalite=?,"
                        +" allergie=?,ancienEcole=?,idPers_etre_pere=?,idPers_etre_mere=? WHERE numMatricule=?"

        return db.query(requete,[nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,
            allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere,numMatricule],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Génial ! La modification a effectué avec succès"})
            }
        })
}

static RechercheEleve(idAs,rech,res){
const requete = "SELECT eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,eleve.prenom,eleve.dateNaissance"
                +" ,eleve.sexe,SUM(inscription.idAs = ?) as idAs"
                +"  FROM eleve,inscription,anneescolaire WHERE (eleve.numMatricule = inscription.numMatricule)"
                +" AND (inscription.idAs = anneescolaire.idAs) AND "
                +" (eleve.numMatricule LIKE ? OR CONCAT(eleve.nom,' ',eleve.prenom) LIKE ?  OR eleve.sexe LIKE ? OR eleve.dateNaissance LIKE ? OR"
                +" eleve.lieuNaissance LIKE ? OR eleve.nationalite LIKE ? OR"
                +" eleve.allergie LIKE ? OR eleve.ancienEcole LIKE ? OR eleve.idPers_etre_pere LIKE ? OR eleve.idPers_etre_mere LIKE ?)"
                +" GROUP BY numMatricule"
                +" ORDER BY numMatricule DESC"

                return db.query(requete,[idAs,"%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%",
                "%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%"],(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.send(result)
                    }
                })
}

static ListeEleveInscrits(idAs,res){

    const requete = "SELECT inscription.idInscri,inscription.photo,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,eleve.sexe,"
    +" classe.libelleClasse,classe.idClasse,inscription.idAs,inscription.dateInscription"
    +" FROM eleve,classe,inscription,personne WHERE (eleve.numMatricule = inscription.numMatricule)"
    +" AND (classe.idClasse = inscription.idClasse) AND (personne.idPers = inscription.idPers) AND inscription.idAs=?"
    +" ORDER BY inscription.idInscri DESC"

    return db.query(requete,[idAs,],
            (err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
}

static RechercheEleveInscrits(idAs,rech,res){
    const requete = "SELECT inscription.photo,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,eleve.sexe,classe.libelleClasse,inscription.dateInscription FROM"
    +" eleve,classe,inscription WHERE (eleve.numMatricule = inscription.numMatricule) AND (classe.idClasse = inscription.idClasse)"
    +" AND (inscription.idAs=?) AND (eleve.numMatricule LIKE ? OR CONCAT(eleve.nom,' ',eleve.prenom) LIKE ?  OR eleve.sexe LIKE ? OR classe.libelleClasse"
    +" LIKE ?) ORDER BY inscription.idInscri DESC"

    return db.query(requete,[idAs,"%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%"],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
    })
}

static DetailEleveInscrit(numMatricule,idAs,res){
const requete = "SELECT CONCAT(eleve.nom,' ',eleve.prenom) as nom,inscription.idInscri"
            +",inscription.photo,personne.idPers,inscription.dateInscription,inscription.porteur,"
            +"inscription.idAs as id,inscription.mesureUrgence,inscription.autorisationCamera,classe.idClasse"
            +" FROM eleve,inscription,anneescolaire,classe,personne WHERE (eleve.numMatricule = inscription.numMatricule) AND"
            +" (inscription.idAs = anneescolaire.idAs) AND (classe.idClasse = inscription.idClasse) AND (personne.idPers = inscription.idpers)"
            +" AND inscription.numMatricule = ? AND inscription.idAs = ?"

            return db.query(requete,[numMatricule,idAs],(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                res.send(result)
                            }
            })
}

static ListeEnfantProfesseur(res){

      const req="SELECT eleve.numMatricule as numMatricule,eleve.sexe"
       +",CONCAT(eleve.nom,' ',eleve.prenom) as nom,GROUP_CONCAT(personne"
       +".nomPrenom SEPARATOR ',') as nomParent FROM eleve,personne WHERE"
       +" personne.statut=1 AND (eleve.idPers_etre_pere=personne.idPers"
       +" OR eleve.idPers_etre_mere=personne.idPers ) OR eleve.numMatricule"
       +" IN (SELECT eleve.numMatricule FROM tuteur WHERE(tuteur.idPers="
       +"personne.idPers) AND (eleve.numMatricule=tuteur.numMatricule) AND"
       +"(personne.statut=1)) GROUP BY eleve.numMatricule"
       
       db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
       })
    }

static ListeParClasse(idAs,idClasse,res){

const requete = "SELECT eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,inscription.idInscri"
                +",inscription.photo,personne.idPers,inscription.dateInscription,inscription.porteur,"
                +"inscription.mesureUrgence,inscription.autorisationCamera,classe.idClasse,classe.libelleClasse"
                +" FROM eleve,inscription,anneescolaire,classe,personne WHERE (eleve.numMatricule = inscription.numMatricule) AND"
                +" (inscription.idAs = anneescolaire.idAs) AND (classe.idClasse = inscription.idClasse) AND (personne.idPers = inscription.idpers)"
                +" AND inscription.idAs = ? AND inscription.idClasse = ? ORDER BY inscription.idInscri ASC"

        return db.query(requete,[idAs,idClasse],(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result == ""){
                                    res.json({msg:'Aucun enregistrement correspondant'})
                                }else{
                                      res.send(result)
                                }
                            }
                       })
    }

  
static ModifierEleveInscrit(idInscri,photo,porteur,mesureUrgence,autorisationCamera,dateInscription,
                            idPers,idClasse,idAs,numMatricule,res){

    const requete = "UPDATE inscription SET photo=?,porteur=?,mesureUrgence=?,autorisationCamera=?,dateInscription=?,"
                    +" 	idPers=?,idClasse=?,idAs=?,numMatricule=? WHERE idInscri=?"
    return db.query(requete,[photo,porteur,mesureUrgence,autorisationCamera,dateInscription,idPers,idClasse,
                    idAs,numMatricule,idInscri],(err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.json({msg200:"Génial ! La modification a effectuée avec succès."})
                        }
    })
  }

  static TuteurEleve(numMatricule,res){

        return db.query("SELECT GROUP_CONCAT(personne.nomPrenom SEPARATOR ',') as 'tuteur'"
        +" FROM eleve,personne,tuteur WHERE (eleve.numMatricule = tuteur.numMatricule) AND"
        +"  (personne.idPers = tuteur.idPers) AND tuteur.numMatricule = '"+numMatricule+"' GROUP BY tuteur.numMatricule",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static FicheReinscrire(numMatricule,idAs,res){
        const requete = "SELECT eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,inscription.porteur,"
                    +" eleve.sexe,inscription.mesureUrgence,inscription.autorisationCamera,inscription.idPers"
                    +" FROM eleve,inscription,anneescolaire WHERE (eleve.numMatricule = inscription.numMatricule) AND"
                    +" (inscription.idAs = anneescolaire.idAs)"
                    +" AND inscription.numMatricule = ? AND"
                    +" inscription.idAs = ? ORDER BY idInscri DESC LIMIT 1"

            return db.query(requete,[numMatricule,idAs],(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        if(result == ""){
                            res.send("")
                        }else{
                            console.log(numMatricule,idAs)
                            res.json({result:result,nom:result[0].nom})
                        }
                    }
            })
    }

    static Reinscription(photo,porteur,mesureUrgence,autorisationCamera,dateInscription,personneContacter,idClasse,idAs,numMatricule,res){
        const requete = "INSERT INTO inscription VALUES(?,?,?,?,?,?,?,?,?,?)"
            return db.query(requete,[null,photo,porteur,mesureUrgence,autorisationCamera,dateInscription,personneContacter,idClasse,idAs,numMatricule],
            (err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json({msg200:'Ce dossier est enregistré avec succès.'})
                }
            })
    }
}
