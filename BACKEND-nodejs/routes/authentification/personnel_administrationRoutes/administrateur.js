const express = require('express')
const router = express.Router()
/*const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../../../util/baseDeDonnees')*/
const administrateurController = require('../../../controllers/authentifications/administrateur')
router.post('/connecter_personnel_administration',administrateurController.Connexion)
router.post('/annee_admin',administrateurController.ChoixAnneescolaire)

/*router.post('/connecter_personnel_administration',(req,res,next) => {

    db.query(
        `SELECT * FROM personnel_administration WHERE nomUtilisateur = ${db.escape(req.body.nomUtilisateur)};`,
        (err,result) => {
          // user does not exists
          if(err) {
            //throw err;
            return res.status(400).send({
              msg: err
            });
          }

        if(req.body.nomUtilisateur=="" || req.body.motDePasse==""){

            return res.status(400).send({
              msg: 'Veuillez remplir tous les champs de saisie'
  
            });
        }

        if(!result.length) {
            return res.status(401).send({
              msg: '1 le nom ou mot de passe est incorrect !!!'
            });
          }
          // check password
          bcrypt.compare(req.body.motDePasse,result[0]['motDePasse'],(bErr,bResult)=>{

            if(bErr){
                //throw bErr;
                return res.status(401).send({
                    msg:'2 le nom ou mot de passe est incorrect !!!'
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
                msg: '3 le nom ou mot de passe est incorrect !!!'
            })

          }

        )

     }

    )
                     
 })*/
 
//

/*router.post('/annee_admin',(req,res,next) => {
     
  db.query(

     `SELECT * FROM anneescolaire WHERE idAs = ${db.escape(req.body.idAs)};`,
      (err,result) => {

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

})*/

/*router.get('/secret-route_administrateur',userMiddleware.isLoggedIn,(req,res,next) => {
     res.send('This is secret content. Only logged in users can see that')
     //console.log(req.userData)
})*/

module.exports = router;