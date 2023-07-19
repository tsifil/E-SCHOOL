const db = require('../../util/baseDeDonnees');

module.exports = class Contact{

    static Personne(res){
        return db.query("SELECT idPers as id,nomPrenom as text FROM personne WHERE nomPrenom <> 'PERE INCONNU'"
        +" AND nomPrenom <> 'MERE INCONNUE' AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE'"
        +" ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static PersonneParent(res){
        return db.query("SELECT idPers as id,nomPrenom as text FROM personne WHERE nomPrenom <> 'PERE INCONNU'"
        +" AND nomPrenom <> 'MERE INCONNUE' AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE'"
        //+" AND statut=0"
        +" ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static PersonneProf(res){
        return db.query("SELECT idPers as id,nomPrenom as text FROM personne WHERE nomPrenom <> 'PERE INCONNU'"
        +" AND nomPrenom <> 'MERE INCONNUE' AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE'"
        +" AND statut=1"
        +" ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static Ajouter(telephone,idPers,res){

        return db.query("INSERT INTO contact VALUES(?,?,?)",[null,telephone,idPers],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Insertion a réussi"})
            }
        })
    }

    static ContactDispo(res){
        const requete = "SELECT personne.idPers,personne.nomPrenom FROM personne,contact WHERE (personne.idPers = contact.idPers)"
                        +" GROUP BY personne.idPers"
//AND personne.statut=0
          return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
          })
    }

    static ContactDispoProfesseur(res){
        const requete = "SELECT personne.idPers,personne.nomPrenom FROM personne,contact WHERE (personne.idPers = contact.idPers)"
                        +" AND personne.statut=1 GROUP BY personne.idPers"

          return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
          })
    }

    static ContactParPersonne(idPers,res){

            const requete = "SELECT contact.idContact,personne.nomPrenom,contact.telephone FROM contact,personne"
            +" WHERE (personne.idPers = contact.idPers) AND contact.idPers = '"+idPers+"'"

            return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result==""){
                        res.json({msg404:"resultat Vide"})
                    }else{
                        res.json({result:result,nomPrenom:result[0].nomPrenom})
                    }
                }
        })
        
    }

    static EditerContact(idContact,res){

        const requete = "SELECT contact.idContact,personne.idPers,personne.nomPrenom,contact.telephone FROM contact,personne"
            +" WHERE (personne.idPers = contact.idPers) AND contact.idContact = '"+idContact+"'"

        return db.query(requete,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
        })

    }

    static Modifier(idContact,telephone,idPers,res){

            return db.query("UPDATE contact SET telephone=?,idPers=? WHERE idContact=?",
            [telephone,idPers,idContact],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json({msg200:"Génial ! La modification a effectué avec succès"})
                }
        })
    }
}