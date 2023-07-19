const express = require('express')
const router = express.Router()
const personneController = require('../../controllers/actions/personneController')
router.post('/ajouterPersonne',personneController.Ajouter)
router.get('/listePersonnel',personneController.Liste)
router.get('/listePersonnelContacter',personneController.ListeContacter)
router.get('/personnePere',personneController.PersonnePere)
router.get('/personneMere',personneController.PersonneMere)
router.get('/editer/personne/:idPers',personneController.Editer)
router.post('/modifierPersonne',personneController.Modifier)
router.get('/tablePersonnel',personneController.TabPersonne)
router.post('/rech/tablePersonnel',personneController.recherche)
//
router.post('/personne/liste/anneeScolaire',personneController.AnneeScolaire)
//
router.get('/personne/contacterUrgence/:idAs/:numMatricule',personneController.PersonneContacter)
router.delete('/personne/effacer/:idPers',personneController.EffacerPersonne)
module.exports = router