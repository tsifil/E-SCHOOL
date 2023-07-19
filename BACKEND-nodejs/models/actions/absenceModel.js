const db = require('../../util/baseDeDonnees');

module.exports = class Absence{

    static supprimerAbs(idAbsence,res){
        const req="DELETE FROM absence WHERE idAbsence='"+idAbsence+"'"
        db.query(req,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La suppression a effectuée avec succès."})
            }
        })
    }

    // HO FAFAKO
    static consultation(idAs,idClasse,idTrimestre,res){
        const requete = "SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom)"
        +" as nom,absence.dateAbs,absence.heureDebut,absence.heureFin,matiere.nomMatiere"
        +",trimestre.libelle,absence.motif FROM eleve,absence,matiere,trimestre,inscription"
        +" WHERE (eleve.numMatricule = absence.numMatricule) AND (matiere.codemat = absence.codemat)"
        +" AND (absence.idTrimestre = trimestre.idTrimestre) AND (trimestre.idTrimestre = '"+idTrimestre+"') AND"
        +" (eleve.numMatricule = inscription.numMatricule) AND (inscription.idClasse = '"+idClasse+"')"
        +" AND (trimestre.idAs = '"+idAs+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    // FAFA
    static verfication(idClasse,codemat,date_Abs,idAs,res){
        const requete = "SELECT eleve.numMatricule FROM eleve,matiere,absence,inscription"
        +" WHERE (eleve.numMatricule = inscription.numMatricule) AND"
        +" (absence.codemat = matiere.codemat) AND (absence.numMatricule = eleve.numMatricule)"
        +" AND (inscription.idClasse = '"+idClasse+"') AND (absence.dateAbs='"+date_Abs+"')"
        +" AND (absence.codemat='"+codemat+"') AND inscription.idAs='"+idAs+"'"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.json({aucun:"Aucune absence trouvée."})
                }else{
                    res.send(result)
                }
            }
        })
    }

    // Fafa
    static eleveAbsent(idClasse,codemat,dateAbs,res){
       
        const requete = "SELECT absence.idTrimestre,absence.idAbsence,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom)"
        +" as nom,absence.heureDebut,absence.heureFin"
        +",absence.motif FROM eleve,absence,matiere,inscription"
        +" WHERE (eleve.numMatricule = absence.numMatricule) AND (matiere.codemat = absence.codemat)"
        +" AND (eleve.numMatricule = inscription.numMatricule) AND (inscription.idClasse = '"+idClasse+"')"
        +" AND (absence.dateAbs='"+dateAbs+"') AND (absence.codemat='"+codemat+"')"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
               res.send(result)
            }
        })
    }
    
    // Fafa
    static justifierAbsence(motifAbs,idAbs,res){
        const requete="UPDATE absence SET motif='"+motifAbs+"' WHERE idAbsence='"+idAbs+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
               res.json({msg:'Votre absence est justifiée !'})
            }
        })
    }
// GET && POST
static listeAbsence(idAs,dateDebut,dateFin,idProf,res){
        const requete="SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,absence.dateAbs,absence.typeAbsence,matiere.nomMatiere,matiere.codemat,absence.motif,classe.libelleClasse FROM absence,eleve,matiere,classe,trimestre,inscription WHERE (eleve.numMatricule=absence.numMatricule) AND (matiere.codemat = absence.codemat) AND" 
        +"(absence.idTrimestre= trimestre.idTrimestre) AND(eleve.numMatricule = inscription.numMatricule) AND(trimestre.idAs='"+idAs+"')AND (inscription.idAs=trimestre.idAs) AND (classe.idClasse=inscription.idClasse) AND absence.dateAbs BETWEEN '"+dateDebut+"' AND '"+dateFin+"' AND matiere.codemat IN (SELECT matiere.codemat FROM enseigne,professeur,classe WHERE"
        +"(matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse)AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"')  AND classe.idClasse IN (SELECT DISTINCT classe.idClasse FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse) AND"
        +"(professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"') ORDER BY absence.idAbsence DESC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                   res.send(result)
            }
        })
    }

    static NombreRetard(idProf,dateDebut,dateFin,res){
        /*const requete="SELECT COUNT(idAbsence) as ret  FROM absence WHERE"
        +" typeAbsence='En retard' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"*/
        const requete="SELECT COUNT(absence.idAbsence) as ret"
        +" FROM absence,professeur,enseigne,matiere WHERE (professeur."
        +"idProf=enseigne.idProf) AND (matiere.codemat=absence.codemat)"
        +"AND(enseigne.codemat=absence.codemat) AND (absence.typeAbsence="
        +"'En retard') AND (professeur.idProf='"+idProf+"')"
        +"AND absence.dateAbs BETWEEN '"+dateDebut+"' AND '"+dateFin+"'"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NombreAbsenceInjustifie(idProf,dateDebut,dateFin,res){
        /*const requete="SELECT COUNT(idAbsence) as absInj FROM absence WHERE"
        +" typeAbsence='Absence' AND motif='' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"*/

    /*const requete="SELECT COUNT(absence.idAbsence) as absInj"
        +" FROM absence,professeur,enseigne,matiere WHERE (professeur."
        +"idProf=enseigne.idProf) AND (matiere.codemat=absence.codemat)"
        +"AND(enseigne.codemat=absence.codemat) AND (absence.typeAbsence="
        +"'Absence') AND (absence.motif='') AND (professeur.idProf='"+idProf+"')"
        +"AND absence.dateAbs BETWEEN '"+dateDebut+"' AND '"+dateFin+"'"*/

  const requete="SELECT COUNT(absence.idAbsence) as absInj FROM absence,matiere,classe  WHERE (matiere.codemat=absence.codemat) AND (absence.typeAbsence='Absence') AND (absence.motif='') AND absence.dateAbs BETWEEN '"+dateDebut+"' AND '"+dateFin+"' AND matiere.codemat IN (SELECT matiere.codemat FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse)AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"')  AND classe.idClasse IN (SELECT DISTINCT classe.idClasse FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse) AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"')"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NombreAbsenceJustifie(idProf,dateDebut,dateFin,res){
        /*const requete="SELECT COUNT(idAbsence) as just FROM absence WHERE"
        +" typeAbsence='Absence' AND motif!='' AND dateAbs BETWEEN"
        +" '"+dateDebut+"' AND '"+dateFin+"'"*/
        const requete="SELECT COUNT(absence.idAbsence) as just"
        +" FROM absence,professeur,enseigne,matiere WHERE (professeur."
        +"idProf=enseigne.idProf) AND (matiere.codemat=absence.codemat)"
        +"AND(enseigne.codemat=absence.codemat) AND (absence.typeAbsence="
        +"'Absence') AND (absence.motif!='') AND (professeur.idProf='"+idProf+"')"
        +"AND absence.dateAbs BETWEEN '"+dateDebut+"' AND '"+dateFin+"'"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    
static listeAbsenceClasse(heureEnr,idProf,date,idClasse,idAs,res){
    /*const requete="SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule"
    +",CONCAT(eleve.nom,' ',eleve.prenom) as nom,absence.dateAbs,"
    +"absence.typeAbsence,matiere.nomMatiere,absence.motif,"
    +"classe.libelleClasse FROM eleve,absence,matiere,trimestre,"
    +"inscription,classe WHERE (eleve.numMatricule = absence.numMatricule)"
    +"AND (matiere.codemat = absence.codemat) AND (absence.idTrimestre="
    +"trimestre.idTrimestre) AND (eleve.numMatricule=inscription.numMatricule)"
    +"AND (inscription.idAs=trimestre.idAs) AND (classe.idClasse=inscription.idClasse)"
    +"AND absence.dateAbs='"+date+"' AND"
    +"(trimestre.idAs='"+idAs+"') AND (classe.idClasse='"+idClasse+"')"*/
    const requete="SELECT absence.idAbsence,eleve.sexe,eleve.numMatricule,CONCAT(eleve.nom,' ',eleve.prenom) as nom,absence.dateAbs,absence.typeAbsence,matiere.nomMatiere,matiere.codemat,absence.motif,classe.libelleClasse FROM absence,eleve,matiere,classe,trimestre,inscription WHERE (eleve.numMatricule=absence.numMatricule) AND (matiere.codemat = absence.codemat) AND" 
        +"(absence.idTrimestre= trimestre.idTrimestre) AND(eleve.numMatricule = inscription.numMatricule) AND(trimestre.idAs='"+idAs+"')AND (inscription.idAs=trimestre.idAs) AND (classe.idClasse=inscription.idClasse) AND absence.dateAbs='"+date+"' AND absence.heureEnr='"+heureEnr+"' AND (classe.idClasse='"+idClasse+"') AND matiere.codemat IN (SELECT matiere.codemat FROM enseigne,professeur,classe WHERE"
        +"(matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse)AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"')  AND classe.idClasse IN (SELECT DISTINCT classe.idClasse FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse) AND"
        +"(professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"') ORDER BY absence.idAbsence DESC"

    return db.query(requete,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

    static NombreRetardClasse(date,heureEnr,idClasse,res){
        const requete="SELECT COUNT(absence.idAbsence) as ret" 
        +" FROM absence,inscription,classe WHERE (inscription.idClasse="
        +" classe.idClasse) AND (absence.numMatricule=inscription.numMatricule)" 
        +" AND (classe.idClasse='"+idClasse+"') AND absence.typeAbsence='En retard'" 
        +" AND absence.dateAbs='"+date+"' AND" 
        +" absence.heureEnr='"+heureEnr+"'"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NombreAbsenceInjustifieClasse(date,heureEnr,idClasse,res){
        const requete="SELECT COUNT(absence.idAbsence) as absInj" 
        +" FROM absence,inscription,classe WHERE (inscription.idClasse="
        +" classe.idClasse) AND (absence.numMatricule=inscription.numMatricule)" 
        +" AND (classe.idClasse='"+idClasse+"') AND absence.typeAbsence='Absence' AND" 
        +" absence.motif='' AND absence.dateAbs='"+date+"' AND" 
        +" absence.heureEnr='"+heureEnr+"'"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static NombreAbsenceJustifieClasse(date,heureEnr,idClasse,res){
        const requete="SELECT COUNT(absence.idAbsence) as just" 
        +" FROM absence,inscription,classe WHERE (inscription.idClasse="
        +" classe.idClasse) AND (absence.numMatricule=inscription.numMatricule)" 
        +" AND (classe.idClasse='"+idClasse+"') AND absence.typeAbsence='Absence' AND" 
        +" absence.motif!='' AND absence.dateAbs='"+date+"' AND" 
        +" absence.heureEnr='"+heureEnr+"'"
        
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }


    static verficationAppel(idAs,idProf,res){
       
        const requete="SELECT classe.idClasse,absence.idAbsence,absence.dateAbs,classe.libelleClasse,absence.heureEnr,matiere.nomMatiere,trimestre.libelle FROM absence,classe,matiere,trimestre,inscription WHERE (absence.codemat=matiere.codemat) AND (absence.idTrimestre= trimestre.idTrimestre) AND (inscription.idClasse=classe.idClasse) AND (inscription.numMatricule=absence.numMatricule)AND (inscription.idAs=trimestre.idAs) AND (inscription.idAs='"+idAs+"') AND matiere.codemat IN (SELECT matiere.codemat FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse) AND (professeur.idProf='"+idProf+"'))AND classe.idClasse IN (SELECT DISTINCT classe.idClasse FROM enseigne,professeur,classe WHERE (matiere.codemat=enseigne.codemat) AND (enseigne.idClasse=classe.idClasse) AND (professeur.idProf=enseigne.idProf) AND professeur.idProf='"+idProf+"') GROUP BY absence.heureEnr,classe.idClasse,trimestre.idTrimestre ORDER BY absence.idAbsence DESC"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }
}