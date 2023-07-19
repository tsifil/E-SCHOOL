const Eleve = require('../../models/actions/eleveModele')

exports.As = (req,res) => {
      Eleve.As(res)
}

exports.SupprimerEleve = (req,res) => {
      const {id} = req.params
      Eleve.SupprimerEleve(id,res)
}

exports.SupprimerEleveInscrit = (req,res) => {
      const {idInscri} = req.params
      Eleve.SupprimerEleveInscrit(idInscri,res)
}

exports.AjouterEleve = (req,res) => {
      const {image,nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere} = req.body
      const {porteur,idPers,mesureUrgence,autorisationCamera,dateInscription,idClasse,idAs} = req.body
      if(req.files==null){
            Eleve.Inscription(nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere,image,porteur,mesureUrgence,autorisationCamera,dateInscription,idPers,idClasse,idAs,res)
      }
      else{
            const myFile = req.files.file
            myFile.mv(`${__dirname}/upload/images/${myFile.name}`,function(err){
                  if(err){
                  console.log(err)
                  res.sendStatus(400);
                  res.json({msg:"Error"})
                  }
                        var photo = 'http://127.0.0.1:2002//images/' + myFile.name
                        Eleve.Inscription(nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere,photo,porteur,mesureUrgence,autorisationCamera,dateInscription,idPers,idClasse,idAs,res)
            })
   }
},

exports.ListeEleve = (req,res) => {
       
      const {idAs} = req.params
      Eleve.ListeEleve(idAs,res)
}

exports.ModifierEleve= (req,res) => {
const {numMatricule,nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere} = req.body
      Eleve.ModifierEleve(numMatricule,nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere,res)
}

exports.RechercheEleve = (req,res) => {
      const {idAs,recherche} = req.body
      Eleve.RechercheEleve(idAs,recherche,res)
} 
exports.ListeEleveInscrit = (req,res) => {
      const {idAs} = req.params
      Eleve.ListeEleveInscrits(idAs,res)
}

exports.RechercheEleveInscrits = (req,res) => {
      const {idAs,recherche} = req.body
      Eleve.RechercheEleveInscrits(idAs,recherche,res)
}

exports.ModifierEleveInscrit = (req,res) => {
   
 const {idInscri,photoActuelle,porteur,mesureUrgence,autorisationCamera,
       dateInscription,idPers,idClasse,idAs,numMatricule} = req.body

       if(req.files==null){
            Eleve.ModifierEleveInscrit(idInscri,photoActuelle,porteur,mesureUrgence,autorisationCamera,
                                          dateInscription,idPers,idClasse,idAs,numMatricule,res)
       }else{

            const fichier = req.files.file
            fichier.mv(`${__dirname}/upload/images/${fichier.name}`,function(err){
                  if(err){
                  console.log(err)
                  res.sendStatus(400);
                  res.json({msg:"Error"})
                  }
                      var photo_actuelle = 'http://127.0.0.1:2002//images/' + fichier.name
                      Eleve.ModifierEleveInscrit(idInscri,photo_actuelle,porteur,mesureUrgence,autorisationCamera,
                                                dateInscription,idPers,idClasse,idAs,numMatricule,res)
            })
       }                                  
}

exports.ListeEnfantProfesseur= (req,res) => {
      Eleve.ListeEnfantProfesseur(res)
}

exports.ListeParClasse = (req,res) => {
      const{idAs,idClasse} = req.params
      Eleve.ListeParClasse(idAs,idClasse,res)
}

exports.FicheReinscrire = (req,res) => {
      const {numMatricule,idAs} = req.params
      Eleve.FicheReinscrire(numMatricule,idAs,res)
}

exports.Reinscription = (req,res) => {

      const {image,porteur,mesureUrgence,autorisationCamera,dateInscription,personneContacter,idClasse,idAs,numMatricule} = req.body
      if(req.files==null){
            Eleve.Reinscription(image,porteur,mesureUrgence,autorisationCamera,dateInscription,personneContacter,idClasse,idAs,numMatricule,res)
       }else{
                  const myFile = req.files.file
                  myFile.mv(`${__dirname}/upload/images/${myFile.name}`,function(err){
                  if(err){
                        console.log(err)
                        res.sendStatus(400);
                        res.json({msg:"Error"})
                  }else{
                        var photo = 'http://127.0.0.1:2002//images/' + myFile.name
                        Eleve.Reinscription(photo,porteur,mesureUrgence,autorisationCamera,dateInscription,personneContacter,idClasse,idAs,numMatricule,res)
                  }
            })
   }
}

exports.DetailEleve = (req,res) => {
      const {numMatricule} = req.params
      Eleve.DetailEleve(numMatricule,res)
}
        
exports.DetailEleveInscrit = (req,res) => {
      const {numMatricule,idAs} = req.params
      Eleve.DetailEleveInscrit(numMatricule,idAs,res)
}

exports.TuteurEleve = (req,res) => {
      const {numMatricule} = req.params
      Eleve.TuteurEleve(numMatricule,res)
}
