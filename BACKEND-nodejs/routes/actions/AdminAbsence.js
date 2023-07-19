const express = require('express')
const router = express.Router()
const AdminAbsenceController = require('../../controllers/actions/absenceAdminController')
//GET
router.get('/Admin/listeAbsence/:idAs/:dateDebut/:dateFin',AdminAbsenceController.listeAbsence)
router.get('/Admin/nombreAbsences/Injustifiee/:heureEnr/:dateDebut/:dateFin',AdminAbsenceController.NombreAbsenceInjustifiees)
router.get('/Admin/nombreAbsences/justifiee/:heureEnr/:dateDebut/:dateFin',AdminAbsenceController.NombreAbsencesJustifiees)
router.get('/Admin/nombreRetards/:heureEnr/:dateDebut/:dateFin',AdminAbsenceController.NombreRetard)
//POST
router.post('/Admin/listeAbsence',AdminAbsenceController.listeAbsencePost)
router.post('/Admin/nombreRetards',AdminAbsenceController.NombreRetardPost)
router.post('/Admin/nombreAbsences/Injustifiee',AdminAbsenceController.NombreAbsenceInjustifieesPost)
router.post('/Admin/nombreAbsences/justifiee',AdminAbsenceController.NombreAbsencesJustifieesPost)

// PAR ELEVE
router.get('/nombre/retard/:idAs/:numMatriculeParams',AdminAbsenceController.NombreRetardEleve)
router.get('/afficher/Absence/:idAs/:numMatriculeParams',AdminAbsenceController.AbsenceEnfant)
router.get('/nombre/AbsenceInjustifiee/:idAs/:numMatriculeParams',AdminAbsenceController.AbsenceInjustifieeEnfant)
router.get('/nombre/AbsenceJustifiee/:idAs/:numMatriculeParams',AdminAbsenceController.AbsenceJustifiee)

// JUSTIFICATION
router.post('/absence/admin/justifierAbsence',AdminAbsenceController.justifierAbsence)
module.exports = router