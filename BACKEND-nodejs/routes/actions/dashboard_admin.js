const express = require('express')
const router = express.Router()
const dashoardController = require('../../controllers/actions/dashboardAdmin_controller')

router.get('/nombre/matiere',dashoardController.nombreMatiere)
router.get('/nombre/professeur',dashoardController.nombreProfesseur)
router.get('/nombre/classe',dashoardController.nombreClasse)
router.get('/nombre/eleveIncsrit/:idAs',dashoardController.nombreEleveInscrit)
router.get('/nombre/eleveFille/:idAs',dashoardController.nombreEleveFille)
router.get('/nombre/eleveGarcon/:idAs',dashoardController.nombreEleveGarcon)
// GRAPH
router.get('/platGraph/:idAs',dashoardController.getEleveData)
router.get('/nombreEleve/classe/:idAs',dashoardController.NombreEleveClasse)
router.get('/nombreEleve',dashoardController.NombreEleve)
module.exports = router