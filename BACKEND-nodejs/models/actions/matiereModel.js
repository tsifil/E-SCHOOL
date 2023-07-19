const db = require('../../util/baseDeDonnees');

module.exports = class Matiere{

     static Ajouter(libelle,res){
        return db.query("INSERT INTO matiere VALUES(?,?)",[null,libelle],(err,result)=>{
            if(err){
               if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msgDup404:"Erreur! Cette matière est déjà existe."})
                }else{
                    console.log(err)
                }
                }else{
                    res.json({msg202:"Création a réussi"})
                }
        })
     }

     static Liste(res){
        return db.query("SELECT * FROM matiere ORDER BY codemat DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
     }
     
     static CreationCoefficient(idNiv,codemat,coefficient,res){
        const requeteVerification = "SELECT * FROM association WHERE idNiv='"+idNiv+"' AND codemat='"+codemat+"'"
        return db.query(requeteVerification,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){

                    return db.query("INSERT INTO association VALUES(?,?,?,?)",[null,idNiv,codemat,coefficient],
                    (err,result) => {
                        if(err){
                            console.log(err)
                        }else{
                            res.send({msg202:"Insertion a réussi"})
                        }
                    })
                }else{

                    //res.json({msg400:"existe deja"})
                    console.log("existe deja")

               }
            }
        })
     }
     
    static ConsultationCoefficient(idNiv,res){
        return db.query("SELECT association.idAssoc,association.coefficient,matiere.nomMatiere,niveau.libelleNiv"
                        +" FROM association,matiere,niveau WHERE (matiere.codemat = association.codemat)"
                        +" AND (niveau.idNiv = association.idNiv) AND association.idNiv=? ORDER BY association.idAssoc DESC",
                        [idNiv],(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                    res.json({result:result,niveau:idNiv})                           
                            }
                        })
     }

    static ListeCoefficientMatiere(res){
        
        /*const requete = "SELECT * FROM association,matiere WHERE (association.codemat = matiere.codemat)"
                    +" LIMIT 1"*/
          const requete = "SELECT niveau.idNiv FROM niveau,association WHERE (association.idNiv=niveau.idNiv)"
                          +" LIMIT 1"
    
              return db.query(requete,(err,result)=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                            if(result==""){
                                                
                                                res.json({msg:"LIgne vide"})
                                            }else{
                                                const idNiv = result[0].idNiv
                                                this.ConsultationCoefficient(idNiv,res)
                                            }
                                           
                                    }
            })

     }
 
     static Modifier(nomMatiere,codemat,res){
        return db.query("UPDATE matiere SET nomMatiere = '"+nomMatiere+"' WHERE codemat = '"+codemat+"'",(err,result)=>{
            if(err){
                if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msg404:"Erreur! Cette matière est déjà existe."})
                }else{
                    console.log(err)
                }
            }else{
                res.json({msg200:"La modification a effectué avec succès."})
            }
        })
     }

     static Supprimer(codemat,res){
        db.query("DELETE FROM matiere WHERE codemat='"+codemat+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }

    static ModifierCoeffMatiere(idAssoc,coeff,res){
        db.query("UPDATE association SET coefficient='"+coeff+"'"
        +" WHERE idAssoc='"+idAssoc+"'",(err,result)=>{
            if (err){
                console.log(err)
            }else{
                res.json({msg200:'La modification a effectué avec succès.'})
            }
        })
    }
    
    static supprimerMatiereCoeff(idAssoc,res){
        db.query("DELETE FROM association WHERE idAssoc='"+idAssoc+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }
}

