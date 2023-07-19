const express = require('express')
const router = express.Router()
const classeController = require('../../controllers/actions/classeController')

router.post('/ajouterClasse',classeController.CreerClasse)
router.get('/listeClasse',classeController.ListeClasse)
router.get('/listeGarderie',classeController.ListeGarderie)
router.post('/modifierClasse',classeController.ModifierClasse)
router.delete('/classe/supprimer/:idClasse',classeController.SupprimerClasse)
module.exports = router