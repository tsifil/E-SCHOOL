const db = require('../../util/baseDeDonnees')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class Professeur{

static Creer(id,nomPrenom,email,password,res){
    return db.query("SELECT * FROM professeur WHERE idProf=? AND nomPrenom LIKE ?",[id,"%"+nomPrenom+"%"],
    (err,result) => {
          if(result.length){
            bcrypt.hash(password,10,(err,hash) => {
                if(err) {return res.status(500).send({msg: err});}
                else{     
                    if(result[0].email == ""){
                        const ver="SELECT * FROM professeur WHERE email='"+email+"'"
                        return db.query(ver,(err,resultat)=>{
                            if(err){console.log(err)}
                            else{
                                if(resultat==""){
                                    return db.query(`UPDATE professeur SET email='${email}',motDePasse=${db.escape(hash)} WHERE idProf=${result[0].idProf}`
                                    ,(err,res3)=>{
                                        if(err){
                                            console.log(err)
                                        }else{
                                            return res.status(201).send({
                                                msg:'Enregistrer'
                                            }) 
                                        }
                                    })
                                }else{
                                    return res.status(409).send({
                                        msg:'Erreur! Cet email est déjà enregistré'
                                    })
                                }
                            }
                    })
               }
          }
        }
       )

       }
    })
}

static Connexion(utilisateur,motDePasse,res){        
        db.query(
            `SELECT * FROM professeur WHERE idProf=${db.escape(utilisateur)} OR email=${db.escape(utilisateur)};`,
            (err,result) => {
              if(err) {
                return res.status(400).send({
                  msg: err
                });
              }
            if(utilisateur=="" || motDePasse==""){
                return res.status(400).send({
                  msg: 'Veuillez remplir tous les champs de saisie'
      
                });
            }
            if(!result.length) {
                return res.status(401).send({
                  msg: 'Email ou mot de passe est incorrect !!!'
                });
              }
              // check password
              bcrypt.compare(motDePasse,result[0]['motDePasse'],(bErr,bResult)=>{
                if(bErr){
                    //throw bErr;
                    return res.status(401).send({
                        msg:'Email ou mot de passe est incorrect !!!'
                    });
                }
                if(bResult){
                    const tokenProf = jwt.sign({
                        utilisateur:result[0].email,
                        idProf:result[0].idProf
                    },
                    'SECRETKEY',{
                        expiresIn: '7d'
                    }
               );
               return res.status(200).send({
                msg:'Logged in !',
                tokenProf,
                prof:result[0],
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
            const tokenAnneeProf = jwt.sign({
                libelle:result[0].libelle,
                id:result[0].idAs
            },
            'SECRETKEY',{
                expiresIn: '7d'
            }
            );
            return res.status(200).send({
                        msg:'Logged in !',
                        tokenAnneeProf,
                        profAnnee:result[0],
                    })
                }       
             }
       
         )
    }
}