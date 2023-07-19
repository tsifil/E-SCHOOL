const db = require('../../util/baseDeDonnees');
module.exports = class Trimestre{

static NouveauTrimestre(libelle,dateDebut,dateFin,idAs,res){

const req="SELECT * FROM trimestre WHERE libelle=? AND idAs=?"

db.query(req,[libelle,idAs],(error,resultat)=>{
    if(error){
        console.log(error)
    }else{
        if(resultat==""){
            const requete = "INSERT INTO trimestre(idTrimestre,libelle,dateDebut,dateFin,idAs) VALUES(?,?,?,?,?)"
            db.query(requete,[null,libelle,dateDebut,dateFin,idAs],(err,result)=>{
                        if(err){
                            if(err){console.log(err)}
                        }else{
                            res.json({msg200:"Génial ! Le nouveau trimestre est ajouté avec succès"})
                        }
                    })
        }else{
            res.json({msgFailed:"Erreur! Ce trimestre est déjà enregistré"})
        }
    }
})

}

    static ListeNonEncours(idAs,res){
  
            return db.query("SELECT * FROM trimestre WHERE idAs='"+idAs+"'",
                    (err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            res.send(result)
                        }
                    })
    }

    static SupprimerTri(idTrimestre,res){
        return db.query("DELETE FROM trimestre WHERE idTrimestre = '"+idTrimestre+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a réussi"})
            }
        })
    }

    static Editer(idTrimestre,res){
        return db.query("SELECT * FROM trimestre WHERE idTrimestre='"+idTrimestre+"'"
        ,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
      }
    
static Modifier(libelle,dateDebut,dateFin,idTrimestre,res){

    return db.query("UPDATE trimestre SET libelle='"+libelle+"',dateDebut='"+dateDebut+"',dateFin='"+dateFin+"'"
    +" WHERE idTrimestre='"+idTrimestre+"'",(err,result)=>{
        if(err){
            if(JSON.parse(JSON.stringify(err)).code === 'ER_DUP_ENTRY'){
                res.json({msgFailed:"Erreur! Ce trimestre est déjà enregistré"})
            }else{
                console.log(err)
            }
        }else{
            res.json({msg200:"Génial ! La modification a effectuée avec succès."})
        }
    })
  }

}