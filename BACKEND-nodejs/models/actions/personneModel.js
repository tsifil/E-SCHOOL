const db = require('../../util/baseDeDonnees');

module.exports = class Personne{

    static Ajouter(nomPrenom,sexe,profession,situationMatrimoniale,adresse,contact,statut/*,email*/,res){

        return db.query("INSERT INTO personne VALUES(?,?,?,?,?,?,?,?,?,?)",
        [null,nomPrenom,sexe,profession,situationMatrimoniale,adresse,contact,statut/*,email*/,'',''],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Génial! Insertion a réussi"})
            }
        })
    }

    static Liste(res){
        return db.query("SELECT idPers as id,CONCAT(nomPrenom,'-',idPers) as text FROM personne WHERE nomPrenom <> 'PERE INCONNU' AND nomPrenom <> 'MERE INCONNUE'"
        +" AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE' ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static ListeContacter(res){
        return db.query("SELECT idPers as id,CONCAT(nomPrenom,'-',idPers) as text FROM personne WHERE nomPrenom <> 'PERE INCONNU' AND nomPrenom <> 'MERE INCONNUE'"
        +" AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE' ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({result:result,idPers:result[0].id})
            }
        })
    }

    static TabPersonne(res){

        return db.query("SELECT * FROM personne WHERE nomPrenom <> 'PERE INCONNU' AND nomPrenom <> 'MERE INCONNUE'"
        +" AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE' ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static PersonnePere(res){
        
        return db.query("SELECT idPers as id,CONCAT(nomPrenom,'-',idPers) as text FROM personne WHERE sexe='Masculin' ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static PersonneMere(res){
        
        return db.query("SELECT idPers as id,CONCAT(nomPrenom,'-',idPers) as text FROM personne WHERE sexe='Féminin' ORDER BY idPers DESC",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static Editer(idPers,res){

        return db.query("SELECT * FROM personne WHERE idPers='"+idPers+"'",(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static Modifier(statut,contact,nomPrenom,sexe,profession,situationMatrimoniale,adresse,email/*,nomUtilisateur*/,motDePasse,idPers,res){

        return db.query("UPDATE personne SET nomPrenom=?,sexe=?,profession=?,situationMatrimoniale=?,adresse=?,"
        +" contact=?,statut=? WHERE idPers=?",[nomPrenom,sexe,profession,situationMatrimoniale,adresse,contact,statut,idPers],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"Génial ! La modification a effectué avec succès"})
            }
        })
    }

    static Recherche(rech,res){
        const requete = "SELECT * FROM personne WHERE (nomPrenom LIKE ? OR idPers LIKE ? OR idPers LIKE ?"
        +" OR sexe LIKE ? OR idPers LIKE ? OR situationMatrimoniale LIKE ? OR adresse LIKE ?)"
        +" AND nomPrenom <> 'PERE INCONNU' AND nomPrenom <> 'MERE INCONNUE'"
        +" AND nomPrenom <> 'FEU' AND nomPrenom <> 'FEUE'"
        +" ORDER BY idPers DESC"

        return db.query(requete,["%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%","%"+rech+"%"],
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static AnneeScolaire(res){
        const requete="SELECT idAs as id,libelle as text FROM anneescolaire WHERE idAs<>22"
        return db.query(requete,(err,result)=>{
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

    static PersonneContacter(idAs,numMatricule,res){
       
        const requete="SELECT personne.nomPrenom,personne.profession,"
        +"personne.adresse,personne.sexe,personne.contact as tel FROM personne,inscription WHERE"
        +"(inscription.idPers=personne.idPers)AND(inscription.idAs='"+idAs+"')"
        +" AND(inscription.numMatricule='"+numMatricule+"')"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    }

    static EffacerPersonne(idPers,res){
        const requete="DELETE FROM personne WHERE idPers='"+idPers+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:'La suppression a effectuée avec succès.'})
            }
        })
    }
}
