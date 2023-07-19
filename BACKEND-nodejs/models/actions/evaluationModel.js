const db = require('../../util/baseDeDonnees');
module.exports = class Evaluation{
    static Liste(res){
        db.query("SELECT * FROM evaluation",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static Ajouter(libelle,res){
        db.query("SELECT*FROM evaluation WHERE libelleEvalua='"+libelle+"'",
        (err,result)=>{
            if(err){console.log(err)
            }else{
                if(result==""){
                    db.query("INSERT INTO evaluation VALUES(null,'"+libelle+"')",(err,result)=>{
                        if(err){console.log(err)
                        }else{
                            res.json({msg200:"Génial! Insertion a réussi"})
                        }
                    })
                }else{
                    res.json({msg404:"Erreur! Cette évaluation est déjà existe"})
                }
            }
        })
    }
    static Supprimer(idEvalua,res){
        db.query("DELETE FROM evaluation WHERE idEvalua='"+idEvalua+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }
    static Modifier(idEvalua,libelle,res){
        db.query("SELECT*FROM evaluation WHERE libelleEvalua='"+libelle+"'",
        (err,result)=>{
            if(err){console.log(err)
            }else{
                if(result==""){
                    db.query("UPDATE evaluation SET libelleEvalua='"+libelle+"' WHERE idEvalua='"+idEvalua+"'",
                    (err,result)=>{
                        if(err){console.log(err)
                        }else{
                            res.json({msg200:"Génial! La modification a réussi"})
                        }
                    })
                }else{
                    res.json({msg404:"Erreur! Cette évaluation est déjà existe"})
                }
            }
        })
    }
}