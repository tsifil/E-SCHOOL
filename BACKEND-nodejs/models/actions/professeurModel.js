const db = require('../../util/baseDeDonnees');
const mysql = require('mysql')
module.exports = class Professeur{

    static ajoutAbsence(res,codemat,mat,motif,idTrimestre,date_Abs,typeAbsence,HeureEnr){
        let query='INSERT INTO absence VALUES ?;';
        let params=[]
    for(let i=0;i<mat.length;i++){
            params[i]=[
                null,date_Abs,motif,typeAbsence[i],HeureEnr,mat[i],codemat,
                idTrimestre];
    }
    db.query(query,[params],(err,result)=>{
        if(err){
            res.json({error:"Erreur ! Aucun absence trouvé"})
        }else{
            res.json({valid:"OK"})
        }
    }) 
}
    static listeProfs(res){
        return db.query("SELECT idProf as id,nomPrenom as text FROM professeur"
        ,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){

                }else{
                    res.json({result:result,idProf:result[0].id})
                }
            }
        })
    }

    static Ajouter(nomPrenom,sexe,adresse,contact,cin,classification,res){
        const requete = "INSERT INTO professeur VALUES(null,'"+nomPrenom+"','"+cin+"','"+adresse+"',"
        +" '"+contact+"','"+classification+"','"+sexe+"','','')"

        return db.query(requete,(err,result)=>{
            if(err){
                if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msgDup404:"Erreur! Le cin que vous avez entré est déjà saisi."})
                }else{
                        console.log(err)
                }                   
            }else{
                res.json({msg200:"Cette information est enregistrée avec succès."})
            }
        })
    }

    static Classe(res){
        const requete = "SELECT idClasse as id,libelleClasse as text FROM classe WHERE idClasse<>56"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){

                }else{
                    res.json({result:result,idClasse:result[0].id})
                }
            }
        })
    }

    static Niveau(res){
        return db.query("SELECT idNiv as id,libelleNiv as text FROM niveau WHERE idNiv <> 19 ORDER BY idNiv DESC",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                   res.send("")
                }else{
                    res.json({result:result,idNiv:result[0].id})
                }
            }
        })
    }
    
    static EleveInd(idAs,idClasse,res){
        const requete = "SELECT eleve.nom,eleve.prenom,eleve.sexe,eleve.dateNaissance,"
        +" eleve.numMatricule,classe.libelleClasse,classe.idClasse FROM eleve,inscription,classe WHERE"
        +" (eleve.numMatricule = inscription.numMatricule) AND (classe.idClasse = inscription.idClasse)"
        +" AND inscription.idAs = ? AND classe.idClasse = ? ORDER BY inscription.idInscri ASC"

        return db.query(requete,[idAs,idClasse],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("aucun resultat")
                }else{
                    res.json({result:result,classe:result[0].libelleClasse})
                }
            }
        })
    }

    static Trimestre(idAs,res){
        const requete = "SELECT * FROM trimestre WHERE idAs = '"+idAs+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json(result)
            }
        })
    }

    static Matiere(res){
        return db.query("SELECT codemat as id,nomMatiere as text FROM matiere ORDER BY codemat DESC",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({result:result,codemat:result[0].id})
                }
               
            }
        })
       
    }

    static Evaluation(res){
        const requete = "SELECT * FROM evaluation"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json(result)
            }
        })
    }

    static AjouterNoteIndividuelle(numMatricule,idClasse,codemat,idTrimestre,idEvalua,note,date,res){
        const verification = "SELECT * FROM passer_evaluation WHERE numMatricule='"+numMatricule+"'"
        +" AND codemat='"+codemat+"' AND idEvalua='"+idEvalua+"' AND idTrimestre='"+idTrimestre+"' AND idClasse='"+idClasse+"'"
        return db.query(verification,(err,result)=>{
            if(err){console.log(err)}else{
            if(result==""){
                            const requete = "INSERT INTO passer_evaluation VALUES(null,'"+numMatricule+"',"
                            +" '"+idClasse+"','"+codemat+"','"+idTrimestre+"','"+idEvalua+"','"+note+"','"+date+"')"
                            return db.query(requete,(err,result2)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    res.json({msg200:'Note ajouté avec succès.'})
                                }
                            })
                }else{
                    res.json({msg400:"Erreur ! Cet élève a déjà une note pour cette matière."})
                }
            }
        })        
    }

//static Modifier(idPass,mat,idClasse,codemat,idTrimestre,idEvalua,notes,date,commentaire,etre_public,res){
static Modifier(idPass,notes,commentaire,res){  
    /*const requete = "UPDATE passer_evaluation SET numMatricule='"+mat+"',idClasse='"+idClasse+"'"
    +" ,codemat='"+codemat+"',idTrimestre='"+idTrimestre+"',idEvalua='"+idEvalua+"',note='"+notes+"'"
    +" ,date='"+date+"',commentaire='"+commentaire+"',public='"+etre_public+"' WHERE idPass='"+idPass+"'"*/
/** db.query(`INSERT INTO users(id,username,password,registered) VALUES ('${uuid.v4()}',${db.escape(
                    req.body.username)},${db.escape(hash)},now())` */
    const requete=`UPDATE passer_evaluation SET note=${db.escape(notes)},commentaire=${db.escape(commentaire)} WHERE idPass=${db.escape(idPass)}`
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{
              //console.log("result")
        }
    })
}

static verificationNote(idClasse,codemat,idTrimestre,idEvalua,res){
    const verification = "SELECT*FROM passer_evaluation WHERE"
        +" codemat='"+codemat+"' AND idEvalua='"+idEvalua+"' AND"
        +" idTrimestre='"+idTrimestre+"' AND idClasse='"+idClasse+"'"
        return db.query(verification,(err,result)=>{
            if(err){console.log(err)}
            else{
                if(result==""){
                    return db.query("SELECT idNiv FROM classe WHERE idClasse='"+idClasse+"'",(err,res2)=>{
                        if(err){console.log(err)}
                        else{res.json({msgOk:"ok",idNiv:res2[0].idNiv})}
                    })
                }else{
                    res.json({msgNok:"Erreur ! Cette classe a déjà une note pour cette matière. "})
                }
            }
    })
}


static AjouterNoteGrp(mat,notes,idTrimestre,idClasse,codemat,idEvalua,dateE,commentaire,et_public,res){
    
    let query='INSERT INTO passer_evaluation VALUES ?;';
    let params=[]
    for(let i=0;i<mat.length;i++){
        params[i]=[
            null,mat[i],idClasse,codemat,idTrimestre,idEvalua,
            notes[i],dateE,commentaire[i],et_public,0];
    }
    db.query(query,[params],(err,result)=>{
        if(err){res.json({erreur:"Erreur !"})}
    })
      
}

    static EleveGrp(idAs,idClasse,res){
        
        const requete = "SELECT inscription.photo,CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +" eleve.sexe,eleve.dateNaissance,"
        +" eleve.numMatricule,classe.libelleClasse,classe.idClasse"
        +" FROM eleve,inscription,classe WHERE"
        +" (eleve.numMatricule = inscription.numMatricule) AND (classe.idClasse = inscription.idClasse)"
        +" AND inscription.idAs = ? AND classe.idClasse = ? ORDER BY inscription.idInscri ASC"

        return db.query(requete,[idAs,idClasse],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("aucun resultat")
                }else{
                    res.json({result:result})
                }
            }
        })
    }

    // ADMIN
    static MatiereTrimestre(idAs,res){
        const requete = "SELECT matiere.nomMatiere,trimestre.libelle,passer_evaluation.idTrimestre"
        +" ,passer_evaluation.codemat FROM matiere,trimestre,passer_evaluation WHERE"
        +" (passer_evaluation.codemat= matiere.codemat) AND (passer_evaluation.idTrimestre = trimestre.idTrimestre)"
        +" AND trimestre.idAs = '"+idAs+"' GROUP BY passer_evaluation.idTrimestre,passer_evaluation.codemat ORDER BY idTrimestre ASC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    // PROFS
    static MatiereTrimestreProf(idProf,idAs,res){
        const requete = "SELECT matiere.nomMatiere,trimestre.libelle,passer_evaluation.idTrimestre,passer_evaluation.codemat FROM matiere,trimestre,passer_evaluation,professeur,enseigne WHERE (passer_evaluation.codemat= matiere.codemat)"
        +"AND (passer_evaluation.idTrimestre = trimestre.idTrimestre) AND trimestre.idAs='"+idAs+"' AND (professeur.idProf=enseigne.idProf) AND (enseigne.idClasse=passer_evaluation.idClasse) AND (passer_evaluation.codemat=enseigne.codemat)"
        +"AND (professeur.idProf='"+idProf+"') GROUP BY passer_evaluation.idTrimestre,passer_evaluation.codemat ORDER BY idTrimestre ASC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static VoirNote(idTrimestre,codemat,res){
        /*const requete = "SELECT passer_evaluation.public,classe.libelleClasse,classe.idClasse,passer_evaluation.date"
        +" ,evaluation.libelleEvalua,evaluation.idEvalua FROM classe,passer_evaluation,matiere"
        +" ,evaluation WHERE (passer_evaluation.idClasse = classe.idClasse) AND"
        +" (passer_evaluation.idEvalua = evaluation.idEvalua) AND (passer_evaluation.codemat = matiere.codemat)"
        +" AND (passer_evaluation.codemat='"+codemat+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" GROUP BY passer_evaluation.idEvalua,passer_evaluation.idClasse"*/

const requete = "SELECT professeur.nomPrenom,matiere.nomMatiere,trimestre.libelle,passer_evaluation.public,classe.libelleClasse,"
+"classe.idClasse,passer_evaluation.date,evaluation.libelleEvalua,"
+"evaluation.idEvalua,association.coefficient FROM classe,passer_evaluation,"
+"matiere,association,niveau,evaluation,trimestre,professeur,enseigne WHERE (trimestre.idTrimestre=passer_evaluation.idTrimestre) AND"
+"(association.idNiv=niveau.idNiv) AND (professeur.idProf=enseigne.idProf)"
+"AND(classe.idNiv=niveau.idNiv) AND (association.codemat=matiere.codemat)"
+"AND(passer_evaluation.idClasse=classe.idClasse) AND"
+"(enseigne.idClasse=passer_evaluation.idClasse) AND"
+ "(enseigne.codemat=passer_evaluation.codemat) AND"
+"(passer_evaluation.idEvalua = evaluation.idEvalua) AND"
+"(passer_evaluation.codemat = matiere.codemat) AND"
+"(passer_evaluation.codemat='"+codemat+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
+"GROUP BY passer_evaluation.idEvalua,passer_evaluation.idClasse"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })

    }

    static VoirNoteProf(idProf,idTrimestre,codemat,res){
        const requete="SELECT matiere.nomMatiere,trimestre.libelle,passer_evaluation.public,classe.libelleClasse,classe.idClasse,passer_evaluation.date"
        +" ,evaluation.libelleEvalua,evaluation.idEvalua,association.coefficient FROM trimestre,classe,passer_evaluation,matiere"
        +" ,association,niveau,evaluation,enseigne,professeur WHERE(association.idNiv=niveau.idNiv)AND(classe.idNiv="
        +" niveau.idNiv) AND (trimestre.idTrimestre=passer_evaluation.idTrimestre) AND (association.codemat=matiere.codemat)AND(passer_evaluation.idClasse=classe.idClasse)AND"
        +" (passer_evaluation.idEvalua = evaluation.idEvalua) AND (passer_evaluation.codemat = matiere.codemat)AND"
        +" (passer_evaluation.codemat='"+codemat+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')AND(professeur.idProf=enseigne.idProf)"
        +" AND (enseigne.idClasse=passer_evaluation.idClasse) AND (passer_evaluation.codemat=enseigne.codemat) AND (professeur.idProf='"+idProf+"')"
        +"GROUP BY passer_evaluation.idEvalua,passer_evaluation.idClasse"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
                //console.log(result)
            }
        })
    }

    static NoteDuplicate(idClasse,idEvalua,idTrimestre,codemat,res){

            const requete = "SELECT note FROM passer_evaluation WHERE"
            +" (idClasse='"+idClasse+"')AND(passer_evaluation.idEvalua"
            +"='"+idEvalua+"')AND(passer_evaluation.idTrimestre="
            +"'"+idTrimestre+"')AND(passer_evaluation.codemat='"+codemat+"')"
            
             db.query(requete,(err,result)=>{
                    if(err){console.log(err)}
                    else{
                        let arr=[]
                        for(let i=0;i<result.length;i++){
                            arr[i]=[result[i].note]
                        }
                        const findDuplicate = arr=>(arr.flat()).filter((item,index)=>(arr.flat()).indexOf(item) !==index)
                        const duplicates=findDuplicate(arr)
                        let duplicatesJSON=[]
                        for(let j=0;j<duplicates.length;j++){
                            duplicatesJSON[j]={noteEX:duplicates[j]}
                        }
                        res.send(duplicatesJSON)
                    }
                })
        }

    static PlusInfosDetailNote(idTrimestre,codemat,idClasse,idEvalua,idAs,res){
        const req = "SELECT matiere.nomMatiere,trimestre.libelle,classe.libelleClasse"
        +" ,evaluation.libelleEvalua FROM evaluation,passer_evaluation,matiere,trimestre,classe WHERE "
        +" (passer_evaluation.idClasse = classe.idClasse) AND (evaluation.idEvalua=passer_evaluation.idEvalua) "
        +" AND (passer_evaluation.codemat = matiere.codemat) AND (passer_evaluation.idTrimestre = trimestre.idTrimestre)"
        +" AND (passer_evaluation.idClasse='"+idClasse+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.codemat='"+codemat+"') LIMIT 1"

        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static EditerNoteEleve(idTrimestre,codemat,idClasse,idEvalua,idAs,res){
        const req = "SELECT inscription.photo,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +" passer_evaluation.idPass,passer_evaluation.note,passer_evaluation.commentaire"
        +" FROM eleve,passer_evaluation,classe,inscription WHERE (passer_evaluation.numMatricule = "
        +" eleve.numMatricule) AND (passer_evaluation.idClasse = classe.idClasse)"
        +" AND (eleve.numMatricule = inscription.numMatricule)"
        +" AND (passer_evaluation.idClasse='"+idClasse+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.codemat='"+codemat+"')"
        +" AND (passer_evaluation.valider=0) AND inscription.idAs='"+idAs+"' ORDER BY note DESC"

        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static AfficherNote(coef,idTrimestre,codemat,idClasse,idEvalua,idAs,res){
        /*const requete = "SELECT inscription.photo,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +" passer_evaluation.idPass,passer_evaluation.note,passer_evaluation.commentaire,matiere.nomMatiere,trimestre.libelle,classe.libelleClasse"
        +" FROM eleve,passer_evaluation,matiere,trimestre,classe,inscription WHERE (passer_evaluation.numMatricule = "
        +" eleve.numMatricule) AND (passer_evaluation.idClasse = classe.idClasse)"
        +" AND (eleve.numMatricule = inscription.numMatricule)"
        +" AND (passer_evaluation.codemat = matiere.codemat) AND (passer_evaluation.idTrimestre = trimestre.idTrimestre)"
        +" AND (passer_evaluation.idClasse='"+idClasse+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.codemat='"+codemat+"')"
        +" AND inscription.idAs='"+idAs+"' ORDER BY note DESC"*/
        const requete = "SELECT inscription.photo,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +" passer_evaluation.idPass,passer_evaluation.note,(passer_evaluation.note/'"+coef+"') as moyenne,passer_evaluation.commentaire,matiere.nomMatiere,trimestre.libelle,classe.libelleClasse"
        +" FROM eleve,passer_evaluation,matiere,trimestre,classe,inscription WHERE (passer_evaluation.numMatricule = "
        +" eleve.numMatricule) AND (passer_evaluation.idClasse = classe.idClasse)"
        +" AND (eleve.numMatricule = inscription.numMatricule)"
        +" AND (passer_evaluation.codemat = matiere.codemat) AND (passer_evaluation.idTrimestre = trimestre.idTrimestre)"
        +" AND (passer_evaluation.idClasse='"+idClasse+"') AND (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.codemat='"+codemat+"')"
        +" AND inscription.idAs='"+idAs+"' ORDER BY note DESC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result == ""){
                    res.send("resultat vide")
                }else{
                            /*res.json({result:result,
                            matiere:result[0].nomMatiere,
                            trimestre:result[0].libelle,
                            classe:result[0].libelleClasse})*/

                    var donnee=[]
                      for(let i=0;i<result.length;i++){
                            if(i != 0 && result[i].note == result[i-1].note){
                                result[i].classement = result[i-1].classement
                                donnee[i]={
                                    photo:result[i].photo,
                                    sexe:result[i].sexe,
                                    numMatricule:result[i].numMatricule,
                                    nom:result[i].nom,
                                    idPass:result[i].idPass,
                                    note:result[i].note,
                                    moyenne:result[i].moyenne,
                                    commentaire:result[i].commentaire,
                                    nomMatiere:result[i].nomMatiere,
                                    libelle:result[i].libelle,
                                    libelleClasse:result[i].libelleClasse,
                                    rang:result[i].classement}
                            }else{
                                result[i].classement=i+1
                                donnee[i]={
                                    photo:result[i].photo,
                                    sexe:result[i].sexe,
                                    numMatricule:result[i].numMatricule,
                                    nom:result[i].nom,
                                    idPass:result[i].idPass,
                                    note:result[i].note,
                                    moyenne:result[i].moyenne,
                                    commentaire:result[i].commentaire,
                                    nomMatiere:result[i].nomMatiere,
                                    libelle:result[i].libelle,
                                    libelleClasse:result[i].libelleClasse,
                                    rang:result[i].classement}
                            }
                            //console.log(result[i].classement)
                      }
                        res.json({result:donnee,
                        matiere:result[0].nomMatiere,
                        trimestre:result[0].libelle,
                        classe:result[0].libelleClasse})
                      //console.log(donnee)
                }
            }
        })

    }

    static getCoefficient(idClasse,codemat,res){
        const requete = "SELECT classe.idNiv FROM classe,niveau WHERE (classe.idNiv = niveau.idNiv)"
        +"  AND classe.idClasse = '"+idClasse+"'"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result == ""){
                    res.send("resultat vide")
                }else{
                        const requete2 = "SELECT coefficient FROM association"
                        +" WHERE idNiv=? AND codemat = ?"
                        return db.query(requete2,[result[0].idNiv,codemat],(err,result2)=>{
                            if(err){console.log(err)}
                        else{res.json({coefficient:result2[0].coefficient})}
                        })
                }
            }
        })

    }

    static pointageEleve(numMatricule,idAs,idClasse,res){

        const query = "SELECT eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom)"
        +" as nom FROM eleve,inscription,classe WHERE (eleve.numMatricule = inscription.numMatricule)"
        +" AND (inscription.idClasse = classe.idClasse) AND (inscription.idClasse = '"+idClasse+"')"
        +" AND (inscription.idAs = '"+idAs+"') AND (inscription.numMatricule='"+numMatricule+"')"

        return db.query(query,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result == ""){
                    res.json({msg:"Aucun enregistrement correspondant !!!"})
                }else{
                    res.send(result)
                }
            }
        })

    }

    static nouveauAbsent(dateAbs,heureDebut,heureFin,motif,numMatricule,codemat,idTrimestre,res){
        const requete = "INSERT INTO absence VALUES(null,'"+dateAbs+"','"+heureDebut+"','"+heureFin+"'"
        +" ,'"+motif+"','"+numMatricule+"','"+codemat+"','"+idTrimestre+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msgEnr:"Cette absence est enregistrée avec succès."})
            }
        })
    }

    static detailAbsence(){
        const requete = ""
    }

    static nombreHeureAbsence(idClasse,codemat,idTrimestre,idAs,res){
        
        const requete = "SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule,"
        +" CONCAT(eleve.nom,' ',eleve.prenom) as nom,CONCAT(MOD(HOUR(TIMEDIFF(heureDebut,heureFin)),24),"
        +" ' H ',MINUTE(TIMEDIFF(heureDebut,heureFin)), ' min ') AS nbr"
        +" FROM eleve,absence,matiere,trimestre,inscription WHERE"
        +" (eleve.numMatricule = absence.numMatricule) AND (matiere.codemat = absence.codemat)"
        +" AND (absence.idTrimestre = trimestre.idTrimestre) AND (trimestre.idTrimestre = '"+idTrimestre+"')"
        +" AND (eleve.numMatricule = inscription.numMatricule) AND (absence.codemat = matiere.codemat)"
        +" AND (inscription.idClasse = '"+idClasse+"') AND (absence.codemat = '"+codemat+"')"
        +" AND inscription.idAs='"+idAs+"'"
        +" GROUP BY (absence.numMatricule)"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NouveauDevoir(datePub,objet,fichier,idProf,idClasse){
        const requete = "INSERT INTO devoir VALUES(null,'"+datePub+"','"+objet+"','"+fichier+"','"+idProf+"','"+idClasse+"')"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Insertion a reuissi")
            }
        })
    }

    ///////////

    static StructureEnregistrementNote(idEvalua,idClasse,idTrimestre,idNiv,codemat,res){
        const requete = "SELECT evaluation.libelleEvalua,trimestre.libelle,classe.libelleClasse"
        +",niveau.libelleNiv,matiere.nomMatiere,association.coefficient"
        +" FROM evaluation,trimestre,classe,niveau,matiere,association WHERE"
        +" (association.idNiv=niveau.idNiv) AND (association.codemat"
        +"=matiere.codemat) AND (classe.idNiv=niveau.idNiv) AND"
        +" trimestre.idTrimestre='"+idTrimestre+"' AND classe.idClasse='"+idClasse+"' AND"
        +" niveau.idNiv='"+idNiv+"' AND matiere.codemat='"+codemat+"' AND evaluation.idEvalua='"+idEvalua+"'"

        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                if(result==""){
                    res.send("vide")
                }else{
                        res.json({libelleEvalua:result[0].libelleEvalua,libelle:result[0].libelle,libelleClasse:result[0].libelleClasse,libelleNiv:result[0].libelleNiv,nomMatiere:result[0].nomMatiere,coefficient:result[0].coefficient})
                    }
                }
        })
    }

    static listeEleve(idClasse,idNiv,idAs,res){
        const requete = "SELECT inscription.photo,CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +" eleve.sexe,eleve.dateNaissance,"
        +" eleve.numMatricule,classe.libelleClasse,classe.idClasse"
        +" FROM eleve,inscription,classe WHERE"
        +" (eleve.numMatricule = inscription.numMatricule) AND (classe.idClasse = inscription.idClasse)"
        +" AND inscription.idAs = ? AND classe.idClasse = ? AND classe.idNiv=? ORDER BY inscription.idInscri ASC"

        return db.query(requete,[idAs,idClasse,idNiv],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({result:result,commentaire:""})
            }
        })
    }

    static MoyenneGeneralBas(idNiv,idTrimestre,idClasse,idEvalua,res){

        const req="SELECT ((SUM(passer_evaluation.note))/(SUM(association"
        +".coefficient))) as moyGeneralBas FROM eleve,passer_evaluation,"
        +" association WHERE(eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat)AND "
        +" passer_evaluation.idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"'"
        +" AND passer_evaluation.idEvalua='"+idEvalua+"' AND association.idNiv='"+idNiv+"' GROUP BY"
        +" eleve.numMatricule ORDER BY moyGeneralBas ASC LIMIT 1"

        return db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({moyGeneralBas:result[0].moyGeneralBas})
                }
            }
        })
    }

    static MoyenneGeneralHaut(idNiv,idTrimestre,idClasse,idEvalua,res){
        const req="SELECT ((SUM(passer_evaluation.note))/(SUM(association"
        +".coefficient))) as moyGeneralHaute FROM eleve,passer_evaluation,"
        +" association WHERE(eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat)AND "
        +" passer_evaluation.idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"'"
        +" AND passer_evaluation.idEvalua='"+idEvalua+"' AND association.idNiv='"+idNiv+"' GROUP BY"
        +" eleve.numMatricule ORDER BY moyGeneralHaute DESC LIMIT 1"

        return db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({moyGeneralHaute:result[0].moyGeneralHaute})
                }
            }
        })
    }

    static MoyenneGeneraleClasse(idNiv,idTrimestre,idClasse,idEvalua,res){
        const req="SELECT ((SUM(passer_evaluation.note))/(SUM(association."
        +"coefficient))) as moyGeneralClasse FROM eleve,passer_evaluation,"
        +"association WHERE (eleve.numMatricule=passer_evaluation.numMatricule)"
        +"AND (association.codemat=passer_evaluation.codemat) AND "
        +"passer_evaluation.idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"'"
        +"AND passer_evaluation.idEvalua='"+idEvalua+"' AND association.idNiv='"+idNiv+"' GROUP BY"
        +" passer_evaluation.idClasse"

        return db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({moyGeneralClasse:result[0].moyGeneralClasse})
                }
            }
        })
    }

    static SommeMoyenneMatiere(coef,idClasse,idEvalua,idTrimestre,codemat,idAs,res){
        const requete = "SELECT ((SUM(passer_evaluation.note)/COUNT(inscription.idInscri))/'"+coef+"') as total"
        +" FROM passer_evaluation,inscription WHERE(inscription.idClasse=passer_evaluation.idClasse)"
        +" AND(inscription.idAs='"+idAs+"') AND inscription.idClasse='"+idClasse+"'"
        +" AND(passer_evaluation.idTrimestre='"+idTrimestre+"') AND (passer_evaluation.idEvalua='"+idEvalua+"')"
        +" AND(passer_evaluation.codemat='"+codemat+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({moyenneMatiere:result[0].total})
            }
        })
    }

    static NotePlusHaut(idClasse,idEvalua,idTrimestre,codemat,res){
        const requete = "SELECT MAX(note) as max FROM passer_evaluation"
        +" WHERE (idClasse='"+idClasse+"') AND (idTrimestre='"+idTrimestre+"')"
        +" AND (idEvalua='"+idEvalua+"') AND (codemat='"+codemat+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({max:result[0].max})
            }
        })
    }
    static NotePlusBas(idClasse,idEvalua,idTrimestre,codemat,res){
        const requete = "SELECT MIN(note) as min FROM passer_evaluation"
        +" WHERE (idClasse='"+idClasse+"') AND (idTrimestre='"+idTrimestre+"')"
        +" AND (idEvalua='"+idEvalua+"') AND (codemat='"+codemat+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({min:result[0].min})
            }
        })
    }

    // tableau moyenne
    //static TableauMoyenneEleve(idClasse,idAs,res)
    static contenusConsultationMoyenne(idClasse,idTrimestre,idEvalua,idNiv,res){
        const requete="SELECT MIN(passer_evaluation.note) as noteMin,"
        +"MAX(passer_evaluation.note) as noteMax,((SUM(passer_evaluation.note))"
        +"/(association.coefficient))/COUNT(passer_evaluation.numMatricule) as"
        +" moyenneMatiere,association.coefficient ,COUNT(passer_evaluation."
        +"numMatricule) as effectif,matiere.codemat,matiere.nomMatiere FROM"
        +" passer_evaluation,matiere,association WHERE (association.codemat="
        +" passer_evaluation.codemat) AND association.idNiv='"+idNiv+"' AND"
        +"(matiere.codemat=passer_evaluation.codemat) AND passer_evaluation."
        +"idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"' "
        +" AND passer_evaluation.idEvalua='"+idEvalua+"' GROUP BY passer_evaluation"
        +".idClasse,matiere.codemat"

        db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static MoyenneDuplicate(idClasse,idTrimestre,idEvalua,idNiv,res){
        const requete="SELECT eleve.numMatricule,"
        +" ((SUM(passer_evaluation.note))/(SUM(association.coefficient))) as moyenneEleve"
        +" FROM eleve,passer_evaluation,association WHERE(eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat) AND passer_evaluation.idClasse='"+idClasse+"'"
        +" AND passer_evaluation.idTrimestre='"+idTrimestre+"' AND passer_evaluation.idEvalua='"+idEvalua+"'"
        +" AND association.idNiv='"+idNiv+"' GROUP BY numMatricule"
        
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
    }

    static TableauMoyenneEleve(idClasse,idTrimestre,idEvalua,idNiv,res){
        /*const requete="SELECT CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +"eleve.numMatricule FROM eleve,inscription,classe WHERE"
        +"(eleve.numMatricule)=(inscription.numMatricule) AND"
        +"(classe.idClasse=inscription.idClasse)AND(inscription.idClasse='"+idClasse+"')"
        +"AND inscription.idAs='"+idAs+"'"*/

        const requete="SELECT eleve.numMatricule,CONCAT(eleve.nom,' ',"
        +" eleve.prenom) as nom,((SUM(passer_evaluation.note))/(SUM"
        +" (association.coefficient))) as moyenneEleve FROM eleve,passer_evaluation"
        +" ,association WHERE (eleve.numMatricule=passer_evaluation.numMatricule)"
        +" AND (association.codemat=passer_evaluation.codemat) AND"
        +" passer_evaluation.idClasse='"+idClasse+"' AND passer_evaluation.idTrimestre='"+idTrimestre+"'"
        +" AND passer_evaluation.idEvalua='"+idEvalua+"' AND association.idNiv='"+idNiv+"'"
        +" GROUP BY numMatricule ORDER BY moyenneEleve DESC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                
                //res.send(result)

                var donnee=[]
                for(let i=0;i<result.length;i++){
                      if(i != 0 && result[i].moyenneEleve == result[i-1].moyenneEleve){
                          result[i].classement = result[i-1].classement
                          donnee[i]={
                              numMatricule:result[i].numMatricule,
                              nom:result[i].nom,
                              moyenneEleve:result[i].moyenneEleve,
                              rang:result[i].classement
                          }
                      }else{
                          result[i].classement=i+1
                          donnee[i]={
                            numMatricule:result[i].numMatricule,
                            nom:result[i].nom,
                            moyenneEleve:result[i].moyenneEleve,
                            rang:result[i].classement
                          }
                      }
                }
                 
                res.send(donnee)
            }
        })
    }

    static Contenus(idTrimestre,idNiv,idEvalua,idClasse,idAs,res){
        const requete="SELECT eleve.numMatricule,matiere.nomMatiere,"
        +"association.coefficient,passer_evaluation.note,passer_evaluation"
        +".idPass FROM eleve,matiere,association,passer_evaluation,"
        +"inscription,classe,niveau WHERE (passer_evaluation.numMatricule="
        +"eleve.numMatricule)AND(eleve.numMatricule=inscription.numMatricule)"
        +"AND(passer_evaluation.idClasse=classe.idClasse) AND"
        +"(matiere.codemat=association.codemat)AND(niveau.idNiv=association.idNiv)"
        +"AND(classe.idNiv=niveau.idNiv)AND(matiere.codemat=association.codemat)"
        +"AND(passer_evaluation.idTrimestre='"+idTrimestre+"') AND (association.idNiv='"+idNiv+"')"
        +"AND(matiere.codemat=passer_evaluation.codemat)AND"
        +"(passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.idClasse='"+idClasse+"')"
        +"AND (inscription.idAs='"+idAs+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static plusContenu(i,idTrimestre,idNiv,idEvalua,idClasse,idAs,res,mat){
        //console.log(mat)
        const requete = "SELECT passer_evaluation.numMatricule,passer_evaluation.note,matiere.nomMatiere"
        +" ,association.coefficient FROM matiere,association,passer_evaluation"
        +",classe,niveau WHERE (passer_evaluation.idClasse=classe.idClasse) AND"
        +"(matiere.codemat=association.codemat)AND(niveau.idNiv=association.idNiv)"
        +"AND(classe.idNiv=niveau.idNiv)AND(matiere.codemat=association.codemat)"
        +"AND(passer_evaluation.idTrimestre='"+idTrimestre+"') AND (association.idNiv='"+idNiv+"')"
        +"AND(matiere.codemat=passer_evaluation.codemat)AND"
        +"(passer_evaluation.idEvalua='"+idEvalua+"') AND (passer_evaluation.idClasse='"+idClasse+"')"
        +"AND passer_evaluation.numMatricule='"+mat+"'"

        return db.query(requete,(err,result2)=>{
                    if(err){
                        console.log(err)
                    }else{
                        //console.log(result2)
                        let nomMat = result2[i]['nomMatiere']
                        let note = result2[i]['note']
                        const data = [{mat:mat,nomMat:nomMat,note:note}]
                        console.log(data)
                }
        })
    }

    /*static Contenus(idTrimestre,idNiv,idEvalua,idClasse,idAs,res){
        const requete="SELECT CONCAT(eleve.nom,' ',eleve.prenom) as nom,"
        +"eleve.numMatricule FROM eleve,inscription,classe WHERE"
        +"(eleve.numMatricule)=(inscription.numMatricule) AND"
        +"(classe.idClasse=inscription.idClasse)AND(inscription.idClasse='"+idClasse+"')"
        +"AND inscription.idAs='"+idAs+"'"

        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}else{
                for(let i=0; i<result.length;i++){
                    //console.log(result[i].numMatricule)
                    this.plusContenu(i,idTrimestre,idNiv,idEvalua,idClasse,idAs,res,result[i].numMatricule)
            }
               //res.send(result)
            }
        })
    }*/

    static TableauMoyenne(idClasse,res){
        const requete="SELECT matiere.codemat,matiere.nomMatiere,association.coefficient"
        +" FROM matiere,niveau"
        +" ,association,classe WHERE (matiere.codemat=association.codemat)"
        +" AND(niveau.idNiv=association.idNiv) AND (classe.idNiv=niveau.idNiv)"
        +" AND (classe.idClasse='"+idClasse+"')"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static fichePresence(idClasse,idAs,res){
        const requete = "SELECT eleve.sexe,eleve.numMatricule,inscription.photo,CONCAT(eleve.nom,' ',eleve.prenom) as nom"
        +" FROM eleve,inscription,classe WHERE(eleve.numMatricule=inscription.numMatricule)"
        +" AND(classe.idClasse = inscription.idClasse)"
        +" AND inscription.idAs=? AND classe.idClasse = ? ORDER BY inscription.idInscri ASC"

        return db.query(requete,[idAs,idClasse],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ProfClasse(idProf,res){
        const requete="SELECT DISTINCT classe.idClasse,classe.libelleClasse"
        +" FROM classe,enseigne,professeur WHERE (enseigne.idClasse="
        +" classe.idClasse) AND (professeur.idProf=enseigne.idProf)"
        +" AND (enseigne.idProf='"+idProf+"')"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ProfMatiere(idProf,res){
        const requete="SELECT DISTINCT matiere.codemat,matiere.nomMatiere"
        +" FROM matiere,enseigne,professeur WHERE (matiere.codemat="
        +" enseigne.codemat) AND (professeur.idProf=enseigne.idProf) AND"
        +" (enseigne.idProf='"+idProf+"')"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static MatiereClasse(idClasse,res){
        const requete="SELECT matiere.codemat as id,matiere.nomMatiere"
        +" as text FROM matiere,classe,niveau,association WHERE (matiere."
        +" codemat=association.codemat) AND (association.idNiv=classe.idNiv)"
        +" AND (niveau.idNiv=classe.idNiv) AND (classe.idClasse='"+idClasse+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){

                }else{
                    res.json({result:result,codemat:result[0].id})
                }
            }
        })
    }

    /**
     * SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule,
     * CONCAT(eleve.nom,' ',eleve.prenom) as nom,absence.dateAbs
     * ,absence.typeAbsence,matiere.nomMatiere,matiere.codemat,
     * absence.motif,classe.libelleClasse FROM absence,eleve
     * ,matiere,classe,trimestre,inscription WHERE 
     * (eleve.numMatricule=absence.numMatricule) AND
     * (matiere.codemat = absence.codemat) AND 
     * (absence.idTrimestre= trimestre.idTrimestre) 
     * AND(eleve.numMatricule = inscription.numMatricule)
     * AND(trimestre.idAs=3)AND (inscription.idAs=trimestre.idAs)
     *  AND (classe.idClasse=inscription.idClasse) AND
     *  absence.dateAbs BETWEEN '2022-12-07' AND '2022-12-07' 
     * AND matiere.codemat IN (SELECT matiere.codemat FROM
     *  enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat)
     *  AND (enseigne.idClasse=classe.idClasse) AND 
     * (professeur.idProf=enseigne.idProf) AND professeur.idProf=4) 
     * AND classe.idClasse IN (SELECT DISTINCT classe.idClasse FROM 
     * enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat)
     *  AND (enseigne.idClasse=classe.idClasse) AND
     *  (professeur.idProf=enseigne.idProf) AND professeur.idProf=4)
 */

    static ProfMatiereClasse(idClasse,idProf,res){
        const requete="SELECT DISTINCT matiere.codemat as id,matiere.nomMatiere"
        +" as text FROM matiere,classe,enseigne,professeur WHERE"
        +"(matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse)"
        +" AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"'"
        +" AND (classe.idClasse='"+idClasse+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static SupprimerEvaluation(idEvalua,idTrimestre,idClasse,res){
        const req="DELETE FROM passer_evaluation WHERE idEvalua='"+idEvalua+"'"
        +" AND idTrimestre='"+idTrimestre+"' AND idClasse='"+idClasse+"'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi avec succès."})
            }
        })
    }
//
    static ListeProfesseur(res){
        const req="SELECT * FROM professeur ORDER BY idProf DESC"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static RechercheProf(rech,res){
        const requete = "SELECT*FROM professeur WHERE (nomPrenom LIKE ? OR idProf LIKE ? OR adresse LIKE ?"
        +" OR contact LIKE ? OR cin LIKE ? OR classification LIKE ? OR sexe LIKE ?)"
        +" ORDER BY idProf DESC"
        return db.query(requete,["%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%"],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ModifierProfesseur(idProf,nomPrenom,adresse,contact,cin,classification,sexe,res){
        const req="UPDATE professeur SET nomPrenom='"+nomPrenom+"',adresse='"+adresse+"',contact='"+contact+"'"
        +" ,cin='"+cin+"',classification='"+classification+"' WHERE idProf='"+idProf+"'"
        db.query(req,(err,result)=>{
            if(err){
                if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msgDup404:"Erreur! Le cin que vous avez entré est déjà saisi."})
                }else{
                    console.log(err)
                }
            }else{
                res.json({msg200:"Génial ! La modification a effectuée avec succès."})
            }
        })
    }
    static SupprimerProfesseur(idProf,res){
        const req="DELETE FROM professeur WHERE idProf='"+idProf+"'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a effectuée avec succès."})
            }
        })
    }
}

