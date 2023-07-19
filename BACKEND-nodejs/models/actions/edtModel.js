const db = require('../../util/baseDeDonnees');

module.exports = class Edt{
    static ListeProfClassePOST(idClasse,res){
        const req="SELECT matiere.codemat,classe.idClasse,professeur.idProf,professeur.nomPrenom,classe.libelleClasse,matiere.nomMatiere FROM matiere,enseigne,classe,professeur WHERE (matiere.codemat=enseigne.codemat) AND (classe.idClasse=enseigne.idClasse) AND (professeur.idProf=enseigne.idProf) AND enseigne.idClasse='"+idClasse+"' GROUP BY enseigne.codemat ORDER BY enseigne.idEns DESC"
        return db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ListeProfClasse(res){
        const requete="SELECT professeur.idProf,professeur.nomPrenom,classe.libelleClasse,matiere.nomMatiere,"
        +" matiere.codemat,classe.idClasse"
        +" FROM matiere,enseigne,classe,professeur WHERE (matiere.codemat=enseigne.codemat)"
        +" AND (classe.idClasse=enseigne.idClasse) AND (professeur.idProf=enseigne.idProf) GROUP BY enseigne.codemat,enseigne.idClasse ORDER BY enseigne.idEns DESC"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NouveauPlanning(jour,heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf,res){
        const vJour=jour+1
        const req="SELECT*FROM enseigne WHERE DAYOFWEEK(dateHeurePlanDebut)='"+vJour+"'"
        +" AND DATE_FORMAT(dateHeurePlanDebut,'%H:%i')='"+heureD+"'"
        +" AND idClasse='"+idClasse+"'"
        
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    const requete="INSERT INTO enseigne VALUES(null,'"+dateheurePlanD+"','"+dateheurePlanF+"','','','"+idClasse+"','"+codemat+"','"+idProf+"')"
                    db.query(requete,(err,resultat)=>{
                    if(err){console.log(err)}else{
                            res.json({msg200:"Génial! Le nouveau planning est enregistré avec succès."})
                        }
                    })
                }else{
                    res.json({msg404:'Erreur! Cette heure est déjà occupé.'})
                }
            }
        })
    }

    static Creer(heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf,res){
        const jour = new Date(dateheurePlanD).getDay()
        const recProf="SELECT idProf FROM enseigne WHERE idClasse='"+idClasse+"'"
        +" AND codemat='"+codemat+"'"
        return db.query(recProf,(err,result)=>{
            if(result==''){
                 this.NouveauPlanning(jour,heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf,res)
            }else{
                if(result[0]['idProf']==idProf){
                  //console.log("Ok")
                  this.NouveauPlanning(jour,heureD,dateheurePlanD,dateheurePlanF,idClasse,codemat,idProf,res)
                }else{
                    //console.log('nOk')
                    res.json({msg404:'Erreur! Il y a déjà un professeur qui enseigne cette matière.'})
                }
            }
        })
    }
    
static Horaire(idClasse,dateDebut,dateFin,res){
       
    const requete="SELECT DISTINCT DATE_FORMAT(dateHeurePlanDebut,'%H:%i')as heureMinuteD"
    +",DATE_FORMAT(dateHeurePlanFin,'%H:%i') as heureMinuteF"
    +" FROM enseigne WHERE idClasse='"+idClasse+"' AND dateHeurePlanDebut NOT IN('0000-00-00 00:00:00')"
    +" ORDER BY heureMinuteD,heureMinuteF ASC "

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
                //console.log(result)
            }
        })
    }

    static Edt(idClasse,dateDebut,dateFin,res){
        const requete="SELECT DATE_FORMAT(enseigne.dateReelDebut,'%Y-%m-%d %H:%i:%s') as dateReel,DAYOFWEEK(enseigne.dateHeurePlanDebut) as jour,"
        +" DATE_FORMAT(enseigne.dateReelDebut,'%d/%m') as jourMoisReelDebut,"
        +" enseigne.dateHeurePlanDebut,enseigne.dateHeurePlanFin,enseigne.idEns,"
        +" DATE_FORMAT(enseigne.dateHeurePlanDebut,'%H:%i') as heureDebut," 
        +" DATE_FORMAT(enseigne.dateHeurePlanFin,'%H:%i') as heureFin,"
        +" professeur.idProf,matiere.codemat,"
        +"  professeur.nomPrenom,professeur.sexe,matiere.nomMatiere,DATE_FORMAT(enseigne.dateReelDebut,'%Y-%m-%d %H:%i') as dateReelDebut"
        +"  ,DATE_FORMAT(enseigne.dateReelDebut,'%H:%i') as heureReelDebut,"
        +"  DATE_FORMAT(enseigne.dateReelFin,'%H:%i') as heureReelFin"
        +" ,DATE_FORMAT(enseigne.dateReelFin,'%Y-%m-%d %H:%i') as dateReelFin"
        +" ,DATE_FORMAT(enseigne.dateReelFin,'%Y/%m/%d') as dateReelFinCours" 
        +" ,DATE_FORMAT(enseigne.dateReelDebut,'%Y/%m/%d') as dateReelDebutCours FROM enseigne,professeur,matiere"
        +" WHERE (matiere.codemat=enseigne.codemat) AND "
        +" (enseigne.idProf=professeur.idProf) AND enseigne.idClasse='"+idClasse+"' AND enseigne.dateHeurePlanDebut	NOT IN('0000-00-00 00:00:00')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
// FAFANA  JUSK AMBANY
static VoirEdt(idClasse,idAs,res){
const requete = "select enseigne.heurePlanDebut,enseigne.heurePlanFin,enseigne.jour"
                +" , group_concat(matiere.nomMatiere SEPARATOR '_') as nomMatiere,group_concat(enseigne.jour SEPARATOR '_') as jour  from enseigne,matiere,anneescolaire,classe WHERE"
                +" (enseigne.codemat = matiere.codemat) AND anneescolaire.idAs='"+idAs+"'"
                +" AND (enseigne.idClasse = classe.idClasse) AND classe.idClasse='"+idClasse+"' group by enseigne.heurePlanDebut,enseigne.heurePlanFin"

        return db.query(requete,(err,resultat)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(resultat)
                }
        })
    }

    static EdtDisponible(res){

const requete = "SELECT classe.libelleClasse,classe.idClasse FROM classe,enseigne WHERE (classe.idClasse = enseigne.idClasse)"
                +" GROUP BY classe.libelleClasse"

          return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
          })
    }

    static EnregistrerdateReel(idEns,dateReelDebut,dateReelFin,res){
        const req=`UPDATE enseigne SET dateReelDebut=${db.escape(dateReelDebut)},dateReelFin=${db.escape(dateReelFin)} WHERE idEns=${db.escape(idEns)}`
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:'Cours deja resneigne'})
            }
        })
    }

    static ListeProf(res){
        db.query("SELECT idProf as id,nomPrenom as text FROM professeur"
        +" ORDER BY idProf DESC",(err,result)=>{
             if(err){
                console.log(err)
             }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({result:result,idProf:result[0].id})
                }
             }
        })
    }

    static Registre(idProf,dateDebut,dateFin,res){
       
        const req="SELECT DATE_FORMAT(enseigne.dateReelDebut,'%Y-%m-%d')"
        +"as date ,DATE_FORMAT(enseigne.dateReelDebut,'%H:%i') as heureD"
        +",DATE_FORMAT(enseigne.dateReelFin,'%H:%i') as heureF,matiere."
        +"nomMatiere,classe.libelleClasse,professeur.nomPrenom,enseigne.idEns"
        +" ,CONCAT(MOD(HOUR(TIMEDIFF(enseigne.dateReelFin,enseigne.dateReelDebut)),24),"
        +" ' H ',MINUTE(TIMEDIFF(enseigne.dateReelFin,enseigne.dateReelDebut)), ' min ') AS nbr "
        +" FROM enseigne,classe,matiere,professeur WHERE(enseigne.codemat="
        +"matiere.codemat) AND (enseigne.idClasse=classe.idClasse)AND(enseigne"
        +".idProf=professeur.idProf) AND (DATE_FORMAT(enseigne.dateReelDebut,"
        +"'%Y-%m-%d') BETWEEN '"+dateDebut+"' AND '"+dateFin+"')AND enseigne."
        +"idProf='"+idProf+"' AND dateHeurePlanDebut='0000-00-00 00:00:00'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static archiveHeureTravaille(idClasse,idProf,codemat,dateReelDebut,dateReelFin,res){
        const req="INSERT INTO enseigne VALUES(null,'','','"+dateReelDebut+"','"+dateReelFin+"','"+idClasse+"','"+codemat+"','"+idProf+"')"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Ok"})
            }
        })
    }

    static ModifierDateReel(dateReel,idClasse,codemat,idProf,dateReelDebutUpd,dateReelFinUpd,res){
        const req="UPDATE enseigne SET dateReelDebut='"+dateReelDebutUpd+"',"
            +" dateReelFin='"+dateReelFinUpd+"' WHERE codemat='"+codemat+"'"
            +" AND idProf='"+idProf+"' AND idClasse='"+idClasse+"'"
            +" AND dateReelDebut='"+dateReel+"'"

        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La modification a effectué avec succès."})
            }
        })
    }
    /*
       SELECT  CONCAT(MOD(HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(dateReelFin,dateReelDebut))))),24),'H',MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(dateReelFin,dateReelDebut))))),'min') as bnr ,SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(dateReelFin,dateReelDebut)))) FROM enseigne WHERE (DATE_FORMAT(dateReelDebut,'%Y-%m-%d') BETWEEN '2023-01-03' AND '2023-01-03') AND idProf=20 AND dateHeurePlanDebut='0000-00-00 00:00:00' GROUP BY idProf
    */
   static TotalHeureTravaillee(idProf,dateDebut,dateFin,res){
        const req="SELECT CONCAT(MOD(HOUR(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(dateReelFin,dateReelDebut))))),24),' H ',MINUTE(SEC_TO_TIME(SUM(TIME_TO_SEC(TIMEDIFF(dateReelFin,dateReelDebut))))),' min ') as bnr"
        +" FROM enseigne WHERE (DATE_FORMAT(dateReelDebut,'%Y-%m-%d') BETWEEN '"+dateDebut+"' AND '"+dateFin+"') AND idProf='"+idProf+"'"
        +" AND dateHeurePlanDebut='0000-00-00 00:00:00' GROUP BY idProf"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({total:result[0].bnr})
                }
            }
        })
   }

   static SupprimerEdt(idEns,res){
        const req="DELETE FROM enseigne WHERE idEns='"+idEns+"'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Suppression a effectué avec succès."})
            }
        })
   }

   static ModifierEdt(idEns,dateHeurePlanD,dateHeurePlanF,res){
       const req="UPDATE enseigne SET dateHeurePlanDebut='"+dateHeurePlanD+"'"
       +", dateHeurePlanFin='"+dateHeurePlanF+"' WHERE idEns='"+idEns+"'"

       db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La modification a effectué avec succès"})
            }
       })
   }

   static effacerProfClasse(codemat,idProf,idClasse,res){
        const req="DELETE FROM enseigne WHERE idProf='"+idProf+"'"
        +" AND codemat='"+codemat+"' AND idClasse='"+idClasse+"'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Suppression a effectué avec succès."})
            }
        })
   }
}
