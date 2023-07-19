const express = require('express')
const router = express.Router()
const edtController = require('../../controllers/actions/edtController')

router.post('/ajouterEdt',edtController.CreerEdt)
router.get('/horaire/:dateDebut/:dateFin/:idClasse',edtController.Horaire)
router.get('/edt/:dateDebut/:dateFin/:idClasse',edtController.Edt)
router.get('/edtDisponible',edtController.EdtDisponible)
router.get('/voirEdt/:idClasse/:idAs',edtController.VoirEdt)
router.get('/edt/liste/ProfClasse',edtController.ListeProfClasse)
router.post('/edt/liste/ProfClassePOST',edtController.ListeProfClassePOST)
router.post('/enregistrerdateReel',edtController.EnregistrerdateReel)
router.get('/edt/tableProfesseur',edtController.ListeProf)
router.post('/registre/heureTravaille',edtController.Registre)
router.post('/archiveHeureTravaille',edtController.archiveHeureTravaille)
router.post('/modifierDateReel',edtController.ModifierDateReel)
router.delete('/supprimer/planning/:idEns',edtController.SupprimerEdt)
router.post('/edt/modifier',edtController.ModifierEdt)
router.post('/edt/totalHeureTravaillee',edtController.TotalHeureTravaillee)
router.delete('/edt/effacer/profClasse/:idProf/:idClasse/:codemat',edtController.effacerProfClasse)
module.exports = router


