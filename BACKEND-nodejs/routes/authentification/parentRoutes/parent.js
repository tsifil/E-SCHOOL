const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userMiddleware = require('../../../middleware/utilisateurParent')
const db = require('../../../util/baseDeDonnees')

router.post('/connecter_parent',(req,res,next) => {

    db.query(
        `SELECT * FROM parent WHERE nomUsage = ${db.escape(req.body.nomUsage)};`,
        (err,result) => {

        if(err) {
            return res.status(400).send({msg: err});
        }
        if(req.body.nomUsage=="" || req.body.motDePasse==""){

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
                 
                const tokenParent = jwt.sign({
                    nomUsage:result[0].nomUsage,
                    userId:result[0].idParent
                },
                'SECRETKEY',{
                    expiresIn: '7d'
                }
                
                );

                db.query(`UPDATE parent SET derniere_connexion = now() WHERE idParent='${result[0].idParent}'`)

                    return res.status(200).send({
                        msg:'Logged in !',
                        tokenParent,
                        parent:result[0],
                    })
            }

            return res.status(401).send({
                msg: '3 le nom ou mot de passe est incorrect !!!'
            })

          }

        )

     }

    )
                     
 })
 //
 router.post('/choixAnneesco',(req,res,next) => {
     
    db.query(
        `SELECT * FROM anneescolaire WHERE libelle = ${db.escape(req.body.anneeSco)};`,
        (err,result) => {

                if(err) {
                    return res.status(400).send({msg: err});
                }
                 
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

    )

 })
//
/*router.get('/secret-route_parent',userMiddleware.isLoggedInParent,(req,res,next) => {
     res.send('This is secret content. PARENT Only logged in users can see that')
     //console.log(req.userData)
})*/

module.exports = router;