const express = require('express')
const router = express.Router()
const evaluationController = require('../../controllers/actions/evaluationController')

router.post('/evaluation/ajouter',evaluationController.Ajouter)
router.get('/evaluation/liste',evaluationController.Liste)
router.post('/modifierEvaluation',evaluationController.Modifier)
router.post('/evaluation/supprimer',evaluationController.Supprimer)
module.exports = router
