const jwt = require('jsonwebtoken')

module.exports = {
    
    validateRegister: (req, res, next) => {
      // 
      if(req.body.username=="" || req.body.password=="" || req.body.password_repeat==""){

          return res.status(400).send({
            msg: 'Veuillez remplir tous les champs de saisie'

          });
      }
        // username min length 3
        if (!req.body.username || req.body.username.length < 3) {
          
            return res.status(400).send({
            msg: 'Le mot de passe doit au moins comporter 3 caractères' /* Please enter a username with min. 3 chars  */
          });
    }

  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    
    return res.status(400).send({
      msg: 'Le mot de passe doit au moins comporter 6 caractères' /** Please enter a password with min. 6 chars */
    });
  }

   // password (repeat) does not match
   if (!req.body.password_repeat || req.body.password != req.body.password_repeat){
       
       return res.status(400).send({
           msg:'Veuillez remplir le mot de passe'/* Both passwords must match */
       })
   }

   next(); 

},

isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Votre session n'est pas valide !" /* Your session is not valid! */
      });
    }
  }

}

//

