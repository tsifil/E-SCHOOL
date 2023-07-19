const express = require('express')
const router = express.Router()
const note_bulletinController = require('../../controllers/actions/note_bulletinController')
router.get('/consultationMoyenne/:idClasse/:codemat/:idTrimestre/:idEvalua/:idNiv',note_bulletinController.consultationMoyenne)
// COM
router.get('/infoEleve_BulletinParClasse/:idEvalua/:idTrimestre/:idClasse',note_bulletinController.infoEleve)
router.get('/bulletinAdmin/:idEvalua/:idTrimestre/:idClasse',note_bulletinController.BulletinParClasse)
router.get('/appreciation/et/moyenneEleve/:idEvalua/:idTrimestre/:idClasse',note_bulletinController.AppreciationEtMoyenneEleve)
router.post('/validerBulletin',note_bulletinController.ValiderBulletin)
router.post('/eleveListe',note_bulletinController.EleveListe)
//
router.get('/moyenne/duplicate/:idClasse/:idEvalua/:idTrimestre',note_bulletinController.MoyenneDuplicate)
router.post('/devalider',note_bulletinController.Devalider)
router.post('/valider',note_bulletinController.Valider)
router.get('/legendeBulletin/:idEvalua/:idTrimestre',note_bulletinController.LegendeBulletin)
module.exports = router

