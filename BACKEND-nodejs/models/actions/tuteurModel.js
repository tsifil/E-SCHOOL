const db = require('../../util/baseDeDonnees');

module.exports = class Tuteur{
    /*  NY ELEVE IZAY MANANA PERE INCONNU SY MERE INCONNUE IHANY NO AFAKA MANANA TUTEUR */
    static Enfant(idAs,res){

        return  db.query("SELECT eleve.numMatricule as id,CONCAT(eleve.nom,' ',eleve.prenom,'-',eleve.numMatricule) as text,eleve.prenom FROM eleve,inscription,anneescolaire"
                +" WHERE (eleve.numMatricule = inscription.numMatricule) AND (inscription.idAs = anneescolaire.idAs) AND"
                +" inscription.idAs = '"+idAs+"'",(err,result)=>{

                        if(err){
                            console.log(err)
                        }else{
                            res.send(result)
                        }
                })
        
    }
    /* PERSONNE REHETRA DIE POSSIBLE HO LASA TUTEUR */
    static Personne(res){

        return db.query("SELECT idPers as id,CONCAT(nomPrenom,'-',idPers)  as text FROM personne WHERE nomPrenom <> 'PERE INCONNU'"
        +" AND nomPrenom <> 'MERE INCONNUE' AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE'"
        +" ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NouveauTuteur(numMatricule,idPers,res){

        return db.query("INSERT INTO tuteur VALUES(?,?,?)",[null,numMatricule,idPers],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ListeTuteur(res){

        return db.query("SELECT personne.idPers,personne.nomPrenom,personne.profession"
        +" ,personne.sexe FROM tuteur,personne WHERE (tuteur.idPers = personne.idPers) GROUP BY tuteur.idPers",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

 static TuteurEleve(idPers,res){

    const requete = "SELECT tuteur.idTuteur,personne.nomPrenom as tuteur,eleve.numMatricule,eleve.sexe,CONCAT(eleve.nom,' ',eleve.prenom) as eleve"
                    +" FROM eleve,tuteur,personne"
                    +" WHERE (tuteur.idPers = personne.idPers) AND (eleve.numMatricule = tuteur.numMatricule)"
                    +" AND tuteur.idPers='"+idPers+"'"
        
        return db.query(requete,(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                if(result == ""){
                                    res.send("resultat vide")
                                }else{
                                    res.json({result:result,tuteur:result[0].tuteur})
                                }
                            }
        })
 }

 static SupprimerEleve(idTuteur,res){
    const requete="DELETE FROM tuteur WHERE idTuteur='"+idTuteur+"'"
    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    })
 }

 static SupprimerTuteur(idPers,res){
    const requete="DELETE FROM tuteur WHERE idPers='"+idPers+"'"
    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    })
 } 

}
