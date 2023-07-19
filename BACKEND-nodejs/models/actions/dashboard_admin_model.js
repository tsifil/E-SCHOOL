const db = require('../../util/baseDeDonnees');
module.exports = class Dashboard{

    static NombreEleveClasse(idAs,res){
        const requete="SELECT COUNT(inscription.idInscri) total,classe."
        +"libelleClasse FROM classe,inscription WHERE (classe.idClasse="
        +"inscription.idClasse) AND (inscription.idAs='"+idAs+"') GROUP BY classe"
        +".idClasse"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NombreEleve(res){
        const req="SELECT COUNT(numMatricule) as im FROM eleve"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({nbrEleve:result[0].im})
            }
        })
    }

    static getEleveData(idAs,res){
        db.query("SELECT COUNT(eleve.sexe) as mas FROM eleve,inscription WHERE(eleve.sexe"
            +"='Masculin') AND (eleve.numMatricule=inscription.numMatricule) AND"
            +"(inscription.idAs='"+idAs+"')",(err,result)=>{
                if(err){console.log(err)}
                else{
                    db.query("SELECT COUNT(eleve.sexe) as fem FROM eleve,inscription WHERE(eleve.sexe"
                    +"='Féminin') AND(eleve.numMatricule=inscription.numMatricule) AND"
                    +"(inscription.idAs='"+idAs+"')",(err,result2)=>{
                        if(err){console.log(err)}
                        else{
                            res.json({feminin:result2[0].fem,masculin:result[0].mas})
                        }
                    })
            
                  }
            })
    
       
    }

    static nombreMatiere(res){

        return db.query("SELECT COUNT(codemat) as nbrMatiere FROM matiere",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static nombreProfesseur(res){
        return db.query("SELECT COUNT(idProf) as nbrProf FROM professeur",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({nbrProf:result[0].nbrProf})
                }
            }
        })
    }
    
    static nombreClasse(res){
        return db.query("SELECT COUNT(idClasse) as nbrClasse FROM classe WHERE idClasse <> 56",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({nbrClasse:result[0].nbrClasse})
                }
            }
        })
    }

    static nombreEleveInscrit(idAs,res){
        return db.query("SELECT COUNT(idInscri) as nbrEleveInscrit FROM inscription WHERE inscription.idAs = '"+idAs+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("")
                }else{
                    res.json({nbrEleveInscrit:result[0].nbrEleveInscrit})
                }
            }
        })
    }

    static nombreEleveFille(idAs,res){

        return db.query("SELECT COUNT(eleve.numMatricule) as eleveFille FROM eleve,inscription"
        +" WHERE (eleve.numMatricule = inscription.numMatricule) AND eleve.sexe='Féminin' AND"
        +" inscription.idAs='"+idAs+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static nombreEleveGarcon(idAs,res){

        return db.query("SELECT COUNT(eleve.numMatricule) as eleveGarcon FROM eleve,inscription"
        +" WHERE (eleve.numMatricule = inscription.numMatricule) AND eleve.sexe='Masculin'"
        +" AND inscription.idAs='"+idAs+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
}