const express = require('express')
const router = express.Router()
const parentTuteurController = require('../../../controllers/authentifications/parent_tuteur')
router.post('/creer_compte_parent',parentTuteurController.CreerCompte)
router.post('/connecter_parentTuteur',parentTuteurController.Connecter)
router.post('/choixAnneesco_Parent',parentTuteurController.ChoixAnneescolaire)
module.exports = router;