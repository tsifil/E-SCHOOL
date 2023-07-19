const db = require('../../util/baseDeDonnees');
module.exports = class Classe{
   
    static ModifierClasse(idNiv,idClasse,libelleClasse,res){
        db.query("UPDATE classe SET libelleClasse='"+libelleClasse+"',idNiv='"+idNiv+"'"
        +" WHERE idClasse='"+idClasse+"'",(err,result)=>{
        if(err){
            if(err){
               if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                    res.json({msgDup404:"Cette classe est déjà existe"})
                }else{ console.log(err)}
            }
        }
        else{
                res.json({msg200:"Génial ! La modification a effectuée avec succès"})
            }
        })
    }

    static Creer(libelleClasse,idNiv,res){
        
         return db.query("INSERT INTO classe VALUES (?,?,?)",[null,libelleClasse,idNiv],
         (err,result)=>{
                if(err){
                    if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                        res.json({msgDup404:"Erreur! Cette classe est déjà existe."})
                    }else{
                        console.log(err)
                    }
                }else{
                    res.json({msg200:"Opération exécutée avec succès"})
                }
         })
    }

    static Liste(res){
        return db.query("SELECT classe.idClasse,classe.libelleClasse,niveau.idNiv,niveau.libelleNiv FROM classe,niveau"
            +" WHERE(classe.idNiv = niveau.idNiv) AND classe.idClasse <> 56 ORDER BY classe.idClasse DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ListeParId(idClasse,res){
        return db.query("SELECT * FROM classe WHERE idClasse = '"+idClasse+"'",(err,result)=>{
            if(err){console.log(err)}
            else{res.send(result)}
        })
    }

    static Modifier(libelleClasse,idNiv,idClasse,res){
            return db.query("UPDATE classe SET libelleClasse  = '"+libelleClasse+"', idNiv = '"+idNiv+"' WHERE idClasse = '"+idClasse+"'",
            (err,result)=>{
                    if(err){
                        if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                            res.json({msgDup404:"Erreur! Cette classe est déjà existe."})
                        }else{
                            console.log(err)
                        }
                    }else{
                            res.json({msg200:"La modification a effectué avec succès."})
                    }
            })
    }

    static SupprimerClasse(idClasse,res){
        return db.query("DELETE FROM classe WHERE idClasse = '"+idClasse+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }

    /*static ListeGarderie(res){

        return db.query("SELECT * FROM classe WHERE type='garderie'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }*/
}