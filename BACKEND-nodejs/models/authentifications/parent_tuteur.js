const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const db = require('../../util/baseDeDonnees')
module.exports = class ParentTuteur{

static creerCompte(id,nomPrenom,email,password,res){
    return db.query("SELECT * FROM personne WHERE idPers=? AND nomPrenom LIKE ?",[id,"%"+nomPrenom+"%"],
    (err,result) => {
          if(result.length){
            bcrypt.hash(password,10,(err,hash) => {
                if(err) {return res.status(500).send({msg: err});}
                else{
                  if(result[0].email == ""){
                        return db.query(`UPDATE personne SET nomPrenom='${result[0].nomPrenom}',profession='${result[0].profession}',situationMatrimoniale='${result[0].situationMatrimoniale}',adresse='${result[0].adresse}',email='${email}',motDePasse=${db.escape(hash)} WHERE idPers=${result[0].idPers}`,(err,result)=>{
                          if(err){console.log(err)}
                          else{return res.status(201).send({msg:'Enregistrer'})
                      }})
                  }else{return res.status(409).send({msg:'Vous avez deja un compte'})}
                }
            })
          }else{
                  return res.status(409).send({
                    msg: "Erreur de creer une compte veuillez verfifier tous vos informations !!!"
                  });
          }
        }
       )
    }


static Connexion(utilisateur,motDePasse,res){        
      db.query(
          `SELECT * FROM personne WHERE idPers=${db.escape(utilisateur)} OR email=${db.escape(utilisateur)};`,
          (err,result) => {
            if(err) {
              return res.status(400).send({
                msg: err
              });
            }
          if(!result.length) {
              return res.status(401).send({
                msg: 'Email ou mot de passe est incorrect !!!'
              });
            }
            bcrypt.compare(motDePasse,result[0]['motDePasse'],(bErr,bResult)=>{
              if(bErr){
                  //throw bErr;
                  return res.status(401).send({
                      msg:'Email ou mot de passe est incorrect !!!'
                  });
              }
              if(bResult){
                  const tokenParent = jwt.sign({
                      utilisateur:result[0].email,
                      idPers:result[0].idPers
                  },
                  'SECRETKEY',{
                      expiresIn: '7d'
                  }
             );
             return res.status(200).send({
              msg:'Logged in !',
              tokenParent,
              parent:result[0],
          })
      }
              return res.status(401).send({
                  msg: 'Email ou mot de passe est incorrect !!!'
              })
            }
  
          )    
       }
    )

  }

  static ChoixAnneescolaire(idAs,res){
    db.query(`SELECT * FROM anneescolaire WHERE idAs = ${db.escape(idAs)};`,(err,result) => {
        if(err) { 
            return res.status(400).send({msg: err});
        }
        else{
            const tokenAnneSco = jwt.sign({
                libelle:result[0].libelle,
                id:result[0].idAs
            },
            'SECRETKEY',{
                expiresIn: '7d'
            }
            );
            return res.status(200).send({
                        msg:'Logged in !',
                        tokenAnneSco,
                        anneeSco:result[0],
                    })
                }       
             }
       
         )
    }
}
