const db = require('../../util/baseDeDonnees');

module.exports = class Absence{

   static listeAbsence(idAs,dateDebut,dateFin,res){
        const requete="SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule"
        +",CONCAT(eleve.nom,' ',eleve.prenom) as nom,absence.dateAbs,"
        +" absence.typeAbsence,matiere.nomMatiere,absence.motif,"
        +" classe.libelleClasse FROM eleve,absence,matiere,trimestre,"
        +" inscription,classe WHERE (eleve.numMatricule = absence.numMatricule)"
        +" AND (matiere.codemat = absence.codemat) AND (absence.idTrimestre"
        +" = trimestre.idTrimestre) AND (eleve.numMatricule ="
        +" inscription.numMatricule) AND (trimestre.idAs='"+idAs+"') AND"
        +" (inscription.idAs=trimestre.idAs) AND "
        +" (classe.idClasse=inscription.idClasse) AND absence.dateAbs BETWEEN"
        +"'"+dateDebut+"' AND '"+dateFin+"' ORDER BY absence.idAbsence DESC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                   res.send(result)
            }
        })
    }

    static NombreRetard(dateDebut,dateFin,res){
        const requete="SELECT COUNT(idAbsence) as ret  FROM absence WHERE"
        +" typeAbsence='En retard' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
    static NombreAbsenceInjustifie(dateDebut,dateFin,res){
        const requete="SELECT COUNT(idAbsence) as absInj FROM absence WHERE"
        +" typeAbsence='Absence' AND motif='' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
    static NombreAbsenceJustifie(dateDebut,dateFin,res){
        const requete="SELECT COUNT(idAbsence) as just FROM absence WHERE"
        +" typeAbsence='Absence' AND motif!='' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static AbsenceEnfant(idAs,numMatriculeParams,res){
        const requete = "SELECT matiere.nomMatiere,absence.idAbsence,absence.dateAbs,"
            +" absence.typeAbsence,absence.motif,trimestre.libelle FROM absence,"
            +" trimestre,anneescolaire,matiere WHERE (matiere.codemat=absence.codemat)"
            +" AND (absence.idTrimestre=trimestre.idTrimestre)"
            +" AND (anneescolaire.idAs=trimestre.idAs) AND"
            +" anneescolaire.idAs='"+idAs+"'"
            +" AND (absence.numMatricule='"+numMatriculeParams+"')"

            return db.query(requete,(err,result)=>{
                if(err){console.log(err)}
                else{
                    if(result==""){res.json({msg404:"Aucun enregistrement trouve"})
                    }else{res.json({msg200:result})}
                }
            })
    }

    static NombreRetardEleve(numMatriculeParams,idAs,res){

        const requete="SELECT COUNT(idAbsence) as ret FROM absence,eleve,"
        +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
        +" typeAbsence='En retard' AND (eleve.numMatricule='"+numMatriculeParams+"')"
        +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
        +".idAs='"+idAs+"')"

        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                if(result==""){res.json({msg404:"Aucun enregistrement trouve"})
                }else{
                    res.send(result)
                }
            }
        })
        
    }

    static AbsenceInjustifieeEnfant(idAs,numMatriculeParams,res){
        const requete="SELECT COUNT(idAbsence) as absInj FROM absence,eleve,"
        +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
        +" typeAbsence='Absence' AND motif=''  AND (eleve.numMatricule='"+numMatriculeParams+"')"
        +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
        +".idAs='"+idAs+"')"

        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                if(result==""){res.json({msg404:"Aucun enregistrement trouve"})
                }else{
                    res.send(result)
                }
            }
        })
    }

static AbsenceJustifiee(idAs,numMatriculeParams,res){
        const requete="SELECT COUNT(idAbsence) as absJus FROM absence,eleve,"
        +"inscription WHERE (absence.numMatricule=eleve.numMatricule) AND"
        +" typeAbsence='Absence' AND motif!='' AND (eleve.numMatricule='"+numMatriculeParams+"')"
        +" AND (inscription.numMatricule=eleve.numMatricule) AND (inscription"
        +".idAs='"+idAs+"')"

        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                if(result==""){
                    res.json({msg404:"Aucun enregistrement trouve"})
                }else{
                    res.send(result)
                }
            }
        })
    }

    static justifierAbsence(idAbs,type,motif,res){
      
        const req=`UPDATE absence SET typeAbsence=${db.escape(type)},motif=${db.escape(motif)} WHERE idAbsence=${db.escape(idAbs)}`
        
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La justification a effectué avec succès."})
            }
        })
    }

}