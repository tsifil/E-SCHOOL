const express = require('express')
const router = express.Router()
const matiereController = require('../../controllers/actions/matiereController')
router.post('/ajouterMatiere',matiereController.Ajouter)
router.get('/listeMateriel',matiereController.Liste)
router.post('/consulter_coefficientMatiere',matiereController.CreationCoefficient)
router.get('/listeCoefficientMatiere',matiereController.ListeCoefficientMatiere)
router.get('/consulter_coeff_niveau/:idNiv',matiereController.ConsultationCoefficient)
router.post('/matiere/modifier',matiereController.Modifier)
router.post('/supprimerMatiere',matiereController.Supprimer)
//
router.post('/modifier/coeffMatiere',matiereController.ModifierCoeffMatiere)
router.post('/supprimerMatiereCoeff',matiereController.supprimerMatiereCoeff)
module.exports = router

