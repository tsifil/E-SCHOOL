const express = require('express')
const router = express.Router()
const niveauController = require('../../controllers/actions/niveauController')
router.post('/ajouterNiveau',niveauController.Ajouter)
router.get('/listeNiveau',niveauController.Liste)
router.post('/modifierNiveau',niveauController.Modifier)
router.post('/supprimerNiveau',niveauController.Supprimer)
module.exports = router

