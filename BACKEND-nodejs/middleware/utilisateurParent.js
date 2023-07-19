const jwt = require('jsonwebtoken')
module.exports = {
  isLoggedInParent: (req, res, next) => {
    try {
      const tokenParent = req.headers.authorization.split(' ')[1];
      const tokenAnneSco = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(
        tokenParent,
        tokenAnneSco,
        'SECRETKEY'
      );
      req.userData = decoded;
      next();
    }catch (err) {
      return res.status(401).send({
        msg: "Votre session n'est pas valide !" /* Your session is not valid! */
      });
    }
  }
}