const express = require('express')
const router = express.Router()
const trimestreController = require('../../controllers/actions/trimestreController')
router.post('/trimestre',trimestreController.NouveauTrimestre)
router.get('/listeTrimestre/:idAs',trimestreController.Liste)
router.get('/editer/trimestre/:idTrimestre',trimestreController.Editer)
router.post('/modifierTrimestre',trimestreController.Modifier)
router.delete('/trimestre/supprimer/:idTrimestre',trimestreController.SupprimerTri)
module.exports = router
