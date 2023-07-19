const db = require('../../util/baseDeDonnees');
module.exports = class Note_bulletin{
    /* AJOUT AU BULLETIN*/
    static Ajout(idClasse,idTrimestre,codemat,idEvalua,date,res){
        const req="SELECT idPass FROM passer_evaluation WHERE idClasse='"+idClasse+"' AND"
        +" codemat='"+codemat+"' AND idTrimestre='"+idTrimestre+"' AND idEvalua='"+idEvalua+"' AND date='"+date+"'"
        return db.query(req,(err,result)=>{
            if(err){console.log(err)}
            else{
                for(let i=0;i<result.length;i++){
                    console.log(result[i])
                }
            }
        })
    }

static consultationMoyenne(idClasse,codemat,idTrimestre,idEvalua,idNiv,res){
    const requete = "SELECT CONCAT(eleve.nom,' ',eleve.prenom)"
    +" as np,eleve.numMatricule,eleve.sexe,passer_evaluation.note"
    +" as total,association.coefficient as diviserPar FROM eleve,"
    +" passer_evaluation,association WHERE (eleve.numMatricule="
    +" passer_evaluation.numMatricule) AND (association.codemat="
    +" passer_evaluation.codemat) AND passer_evaluation.idClasse='"+idClasse+"'"
    +" AND passer_evaluation.codemat='"+codemat+"' AND passer_evaluation.idTrimestre="
    +" '"+idTrimestre+"' AND passer_evaluation.idEvalua='"+idEvalua+"' AND"
    +" association.idNiv='"+idNiv+"'" 
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{res.send(result)}
    })
}

static Rang(idClasse,idEvalua,idTrimestre,res){
    const requete = "SELECT eleve.numMatricule,SUM(passer_evaluation.note)"
    +" as totalMoyEleve FROM passer_evaluation,eleve WHERE (eleve.numMatricule ="
    +" passer_evaluation.numMatricule) AND (passer_evaluation.idClasse='"+idClasse+"')"
    +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND"
    +" (passer_evaluation.idTrimestre='"+idTrimestre+"')"
    +" GROUP BY passer_evaluation.numMatricule ORDER BY SUM(passer_evaluation.note) DESC"
    return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                let donnee=[]
                for(let i = 0;i<result.length;i++){
                     donnee[i] = {ranger:i+1,numMatricule:result[i].numMatricule,totalMoyEleve:result[i].totalMoyEleve}
                    if(Object.keys(donnee).length == result.length){
                        res.json({resultat:donnee})
                    } 
                }
            }
        })
    }

    static Tete_BulletinParClasse(idEvalua,idTrimestre,idClasse,res){
        const requete="SELECT eleve.numMatricule,eleve.nom,eleve.prenom,"
        +"eleve.dateNaissance,classe.libelleClasse FROM passer_evaluation"
        +",evaluation,classe,eleve WHERE (passer_evaluation.idClasse=classe.idClasse)"
        +"AND (eleve.numMatricule = passer_evaluation.numMatricule) AND"
        +"(evaluation.idEvalua = passer_evaluation.idEvalua)AND"
        +"(passer_evaluation.idTrimestre='"+idTrimestre+"')AND(passer_evaluation.idClasse='"+idClasse+"')"
        +"AND passer_evaluation.idEvalua='"+idEvalua+"' GROUP BY passer_evaluation.numMatricule ORDER BY SUM(passer_evaluation.note) DESC"
        
        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{res.send(result)}
        })
    }

    static Effectif(idAs,idClasse,res){
        const requete = "SELECT COUNT(idInscri) as effectif FROM"
        +" inscription WHERE inscription.idAs='"+idAs+"'AND"
        +" inscription.idClasse='"+idClasse+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("aucun resultat")
                }else{
                    res.json({effectif:result[0].effectif})
                }
            }
        })
    }

    static BulletinParClasse(idEvalua,idTrimestre,idClasse,res){
        const req1 = "SELECT classe.idNiv FROM classe,niveau WHERE"
        +" (classe.idNiv = niveau.idNiv) AND (classe.idClasse='"+idClasse+"')"
       
        const req2 = "SELECT matiere.codemat,eleve.numMatricule,matiere.nomMatiere,"
        +"association.coefficient,passer_evaluation.note as eleve,passer_evaluation.commentaire FROM matiere,"
        +"association,passer_evaluation,evaluation,classe,eleve WHERE"
        +"(eleve.numMatricule = passer_evaluation.numMatricule) AND"
        +"(passer_evaluation.codemat = matiere.codemat) AND"
        +"(passer_evaluation.idClasse=classe.idClasse) AND"
        +"(evaluation.idEvalua = passer_evaluation.idEvalua) AND"
        +"(association.codemat = passer_evaluation.codemat) AND"
        +"(passer_evaluation.idClasse=?) AND (association.idNiv = ?)"
        +"AND (passer_evaluation.idEvalua=?) AND (passer_evaluation.idTrimestre=?)"

        return db.query(req1,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                const idNiv=result[0].idNiv
                return db.query(req2,[idClasse,idNiv,idEvalua,idTrimestre],(err,result2)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.send(result2)
                    }
                })
            }
        })
    }

    static NoteMatiere(idEvalua,idTrimestre,idClasse,res){
        const requete = "SELECT idPass,codemat,SUM(note) as MoyenneClasse"
        +" FROM passer_evaluation WHERE (idEvalua='"+idEvalua+"') AND (idTrimestre="
        +"'"+idTrimestre+"') AND (idClasse='"+idClasse+"') GROUP BY codemat,idTrimestre"
        +",idEvalua,idClasse"
        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{res.send(result)}
    })
}

    static NoteExtreme(idEvalua,idTrimestre,idClasse,res){
        const req="SELECT codemat,MAX(note) as noteHaut,MIN(note)" 
        +" as noteBas FROM passer_evaluation WHERE (idEvalua='"+idEvalua+"') AND"
        +" (idTrimestre='"+idTrimestre+"') AND (idClasse='"+idClasse+"') GROUP BY codemat,idTrimestre"
        +" ,idEvalua,idClasse"
    }

    static NoteExtremeMoins(idEvalua,idTrimestre,idClasse,res){
        const requete = "SELECT codemat,MIN(note) as noteBas FROM passer_evaluation"
        +" WHERE (idEvalua = '"+idEvalua+"') AND (idTrimestre"
        +"='"+idTrimestre+"') AND (idClasse='"+idClasse+"')"
        +" GROUP BY codemat,idTrimestre,idEvalua,idClasse"
        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{res.send(result)}
        })
    }

    static NoteExtremePlus(idEvalua,idTrimestre,idClasse,res){
        const requete = "SELECT codemat,MAX(note) as noteHaut FROM passer_evaluation"
        +" WHERE (idEvalua = '"+idEvalua+"') AND (idTrimestre='"+idTrimestre+"')"
        +" AND (idClasse='"+idClasse+"') GROUP BY codemat,idTrimestre,idEvalua,idClasse"
        return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{res.send(result)}
        })
    }

    static TotalCoeff(idClasse,idEvalua,idTrimestre,res){
        const requete = "SELECT SUM(association.coefficient) as totalCoeff"
        +" FROM association,passer_evaluation WHERE (association.codemat ="
        +" passer_evaluation.codemat) AND (passer_evaluation.idClasse='"+idClasse+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND"
        +" (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" GROUP by passer_evaluation.numMatricule LIMIT 1"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                if(result==""){
                    res.send("aucun resultat")
                }else{
                    res.json({totalCoeff:result[0].totalCoeff})
                }
            }
        })
    }

static Total_MoyenneEleve(idClasse,idEvalua,idTrimestre,res){
        const requete = "SELECT eleve.numMatricule,SUM(passer_evaluation.note)"
        +" as totalMoyEleve FROM passer_evaluation,eleve WHERE (eleve.numMatricule ="
        +" passer_evaluation.numMatricule) AND (passer_evaluation.idClasse='"+idClasse+"')"
        +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND"
        +" (passer_evaluation.idTrimestre='"+idTrimestre+"')"
        +" GROUP BY passer_evaluation.numMatricule"

        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

static Total_MoyenneClasse(idClasse,idTrimestre,idEvalua,res){
     const requete="SELECT SUM(note) as total_moyenneClasse FROM passer_evaluation"
     +" WHERE idClasse='"+idClasse+"' AND idTrimestre='"+idTrimestre+"'"
     +" AND idEvalua='"+idEvalua+"'"
     return db.query(requete,(err,result)=>{
         if(err){
            console.log(err)
         }else{
            if(result==""){
                res.send("aucun resulat")
            }else{
                res.json({total_moyenneClasse:result[0].total_moyenneClasse})
            }
         }
     })
}

static Total_extremeMoins(idTrimestre,idClasse,idEvalua,res){
    const requete = "SELECT MIN(note) as noteBas FROM passer_evaluation"
    +" WHERE (idEvalua = '"+idEvalua+"') AND (idTrimestre"
    +"='"+idTrimestre+"') AND (idClasse='"+idClasse+"')"
    +" GROUP BY codemat,idTrimestre,idEvalua,idClasse"
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{
            //res.send(result)
            let sum=0
            for(let i = 0;i<result.length;i++){
                //console.log(result[i].noteBas)
                sum += result[i].noteBas
            }
            //console.log(sum)
            res.json({total_noteBas:sum})
        }
    })
}

static Total_extremePlus(idTrimestre,idClasse,idEvalua,res){
    
    const requete = "SELECT MAX(note) as total_noteHaut FROM passer_evaluation"
    +" WHERE (idEvalua = '"+idEvalua+"') AND (idTrimestre"
    +"='"+idTrimestre+"') AND (idClasse='"+idClasse+"')"
    +" GROUP BY codemat,idTrimestre,idEvalua,idClasse"
    return db.query(requete,(err,result)=>{
        if(err){console.log(err)}
        else{
            let sum=0
            for(let i = 0;i<result.length;i++){
                sum += result[i].total_noteHaut
            }
            res.json({total_noteHaut:sum})
        }
    })
}

}











static RangNote(idClasse,idEvalua,idTrimestre,codemat,res){
    const requete = "SELECT eleve.numMatricule,passer_evaluation.note"
    +" as note FROM passer_evaluation,eleve WHERE (eleve.numMatricule ="
    +" passer_evaluation.numMatricule) AND (passer_evaluation.idClasse='"+idClasse+"')"
    +" AND (passer_evaluation.idEvalua='"+idEvalua+"') AND"
    +" (passer_evaluation.idTrimestre='"+idTrimestre+"') AND (passer_evaluation.codemat='"+codemat+"')"
    +" ORDER BY passer_evaluation.note DESC"
    
    return db.query(requete,(err,result)=>{
            if(err){console.log(err)}
            else{
                    let donnee=[]
                    let tab=[]
                    let tabFilter=[]
                    let arr=[]

                for(let i=0;i<result.length;i++){
                    
                    tab[i]={note:result[i].note} // TSY FAFA 
                    
                    //arr=[result[i].note,]//fafa
                    //console.log(arr)//fafs
                    //
                    /*if(this.hasDuplicates(arr)){
                        tab[i]={note:result[i].note,indice:"ex"}
                    }else{
                        tab[i]={note:result[i].note,indice:""}
                    }//*/
                    
                    tabFilter = [...new Set(tab.map(obj=>JSON.stringify(obj)))]
                    .map(str=>JSON.parse(str))

                    for(let j=0;j<tabFilter.length;j++){
                        //donnee[j]={rang:j+1,note:tabFilter[j].note,indice:tabFilter[j].indice}
                        donnee[j]={rang:j+1,note:tabFilter[j].note}
                    }

                    // && i!=1
                    /*if(result[i].note==result[1].note){
                       donnee[i]={ranger:'',indice:'ex',imP:result[1].numMatricule,numMatricule:result[i].numMatricule,note:result[i].note}
                    }else{
                       donnee[i]={ranger:'',indice:'',imP:'',numMatricule:result[i].numMatricule,note:result[i].note}
                    }*/
                    /*if(Object.keys(donnee).length == result.length){
                        res.json({resultat:donnee})
                    }*/
                    //tab[i]={rang:i+1,note:result[i].note}
                    //donnee = tab.filter((ele,pos)=>tab.indexOf(ele)==pos)

                    /*if(result[i].note==result[1].note){
                        tab[i]={rang:i+1,indice:'ex',note:result[i].note}
                        donnee = [...new Set(tab.map(obj=>JSON.stringify(obj)))]
                        .map(str=>JSON.parse(str))
                    }else{
                        tab[i]={rang:i+1,indice:'',note:result[i].note}
                        donnee = [...new Set(tab.map(obj=>JSON.stringify(obj)))]
                        .map(str=>JSON.parse(str))
                    }*/
                }
                console.log(donnee)
            }
        })
}