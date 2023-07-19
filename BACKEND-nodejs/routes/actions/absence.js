const express = require('express')
const router = express.Router()
const absenceController = require('../../controllers/actions/absenceController')
router.post('/admin/consultationAbsence',absenceController.consultation)
router.post('/admin/verificationAbsence',absenceController.verfication)
router.get('/admin/eleveAbsent/:idClasse/:codemat/:dateAbs',absenceController.eleveAbsent)
router.post('/Admin/justifierAbsence',absenceController.justifierAbsence)

router.get('/verificationAppel/:idAs/:idProf',absenceController.verficationAppel)
// GET
router.get('/listeAbsence/:heureEnr/:idClasseParams/:idAs/:dateDebut/:dateFin/:idProf',absenceController.listeAbsence)
router.get('/nombreAbsences/Injustifiee/:idProf/:heureEnr/:idClasseParams/:dateDebut/:dateFin',absenceController.NombreAbsenceInjustifiees)
router.get('/nombreRetards/:idProf/:idClasseParams/:heureEnr/:dateDebut/:dateFin',absenceController.NombreRetard)
router.get('/nombreAbsences/justifiee/:idProf/:heureEnr/:idClasseParams/:dateDebut/:dateFin',absenceController.NombreAbsencesJustifiees)
//POST
router.post('/listeAbsence',absenceController.listeAbsencePost)
router.post('/nombreAbsences/Injustifiee',absenceController.NombreAbsenceInjustifieesPost)
router.post('/nombreRetards',absenceController.NombreRetardPost)
router.post('/nombreAbsences/justifiee',absenceController.NombreAbsencesJustifieesPost)

router.post('/absence/testAbs',absenceController.testAbs)
router.delete('/absence/supprimer/:idAbsence',absenceController.supprimerAbs)
//
module.exports = router