const db = require('../../util/baseDeDonnees');

module.exports = class AnneeScolaire{

    static NouveauAnnee(idAs,libelle,dateDebut,dateFin,res){
       
                return db.query("INSERT INTO anneescolaire(idAs,libelle,dateDebut,dateFin) VALUES(?,?,?,?)",
                        [idAs,libelle,dateDebut,dateFin],(err,result)=>{
                            if(err){
                                if(err){
                                    if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                                        res.json({msgDup404:"Cette année scolaire est déjà existe"})
                                    }else{
                                        console.log(err)
                                    }
                                }
                            }else{
                                res.json({msg200:"La nouvelle année scolaire que vous avez saisie est enregistré avec succès"})
                            }
                })
    }

    static ChoixAnnee(res){
        
        return db.query("SELECT idAs as id,libelle as text FROM anneescolaire WHERE idAs<>22",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({result:result,idAs:result[0].id})
                }
            }
        })
    }

    static ListeAnnee(res){

        return db.query("SELECT * FROM anneescolaire WHERE idAs<>22",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static Editer(idAs,res){

        return db.query("SELECT * FROM anneescolaire WHERE idAs='"+idAs+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })

    }

static Modifier(libelle,dateDebut,dateFin,idAs,res){
    db.query("UPDATE anneescolaire SET libelle=?,dateDebut=?,dateFin=?"
     +" WHERE idAs=?",
    [libelle,dateDebut,dateFin,idAs],(err,result)=>{
    if(err){
        if(err){
           if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                res.json({msgDup404:"Cette année scolaire est déjà existe"})
            }else{ console.log(err)}
        }
    }
    else{
            res.json({msg200:"Génial ! La modification a effectuée avec succès"})
        }
    })
}

    static SupprimerAs(idAs,res){
        return db.query("DELETE FROM anneescolaire WHERE idAs = '"+idAs+"'",
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }

}