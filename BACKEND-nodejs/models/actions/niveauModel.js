const db = require('../../util/baseDeDonnees');

module.exports = class Niveau{

    static Ajouter(libelleNiv,res){
        return db.query("INSERT INTO niveau VALUES(?,?)",[null,libelleNiv],(err,resultat)=>{
            if(err){
                    if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                        res.json({msgDup404:"Erreur! Ce niveau est déjà existe."})
                    }else{
                        console.log(err)
                    }

            }else{
                res.send({msg202:"Ce niveau de classe est enregistré avec succès"})
            }
        })
    }

    static Liste(res){
        return db.query("SELECT * FROM niveau WHERE idNiv <> 19 ORDER BY idNiv DESC",(err,resultat)=>{
            if(err){
                console.log(err)
            }else{
                res.send(resultat)
            }
        })
    }

    static Modifier(libelleNiv,idNiv,res){
        return db.query("UPDATE niveau SET libelleNiv='"+libelleNiv+"' WHERE idNiv = '"+idNiv+"'",
        (err,resultat)=>{
            if(err){
                if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msgDup404:"Erreur! Ce niveau est déjà existe."})
                }else{
                    console.log(err)
                }
            }else{
                   res.json({msg202:"La modification a effectué avec succès."})
            }
        })
    }

    static Supprimer(idNiv,res){
        return db.query("DELETE FROM niveau WHERE idNiv = '"+idNiv+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send("La suppression a réussi")
            }
        })
    }

    static Modifier(idNiv,libelle,res){
        db.query("UPDATE niveau SET libelleNiv='"+libelle+"' WHERE idNiv='"+idNiv+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                 res.json({msg200:"La modification a effectué avec succès."})
            }
        })
    }

    static Supprimer(idNiv,res){
        db.query("DELETE FROM niveau WHERE idNiv='"+idNiv+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                 res.json({msg200:"La suppression a réussi."})
            }
        })
    }
}