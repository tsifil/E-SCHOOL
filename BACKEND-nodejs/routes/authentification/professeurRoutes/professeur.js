const express = require('express')
const router = express.Router()
const professeurController = require('../../../controllers/authentifications/professeur')
router.post('/creer_compte_prof',professeurController.Creer)
router.post('/connecter_prof',professeurController.Connexion)
router.post('/choixAnneesco_prof',professeurController.Annee)
module.exports = router;