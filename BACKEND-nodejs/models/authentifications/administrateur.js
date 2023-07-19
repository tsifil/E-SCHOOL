const db = require('../../util/baseDeDonnees');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class Administrateur{
       
    static Connexion(nomUtilisateur,motDePasse,res){

        db.query(
            `SELECT * FROM personnel_administration WHERE nomUtilisateur = ${db.escape(nomUtilisateur)};`,(err,result) => {
              if(err) {
                return res.status(400).send({
                  msg: err
                });
              }
            if(nomUtilisateur=="" || motDePasse==""){
    
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
                     
                    const token = jwt.sign({
                        nomUtilisateur:result[0].nomUtilisateur,
                        userId:result[0].idP
                    },
    
                    'SECRETKEY',{
                        expiresIn: '7d'
                    }
        );
                    db.query(`UPDATE personnel_administration SET derniere_connexion = now() WHERE idP='${result[0].idP}'`)
    
                        return res.status(200).send({
                            msg:'Logged in !',
                            token,
                            user:result[0]
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
                            const tokenAnneeAdmin = jwt.sign({
                                libelle:result[0].libelle,
                                id:result[0].idAs
                            },
                            'SECRETKEY',{
                                expiresIn: '7d'
                            }
                 );
                    return res.status(200).send({
                                msg:'Logged in !',
                                tokenAnneeAdmin,
                                userAnnee:result[0],
                            })
                    }       
             }
       
         )
    }
}