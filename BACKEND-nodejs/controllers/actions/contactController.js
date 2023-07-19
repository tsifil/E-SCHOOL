const contact = require('../../models/actions/contactModel')

exports.Ajouter = (req,res) => {
    const {telephone,idPers} = req.body
    contact.Ajouter(telephone,idPers,res)
}

exports.ListeContact = (req,res) => {
    const {idPers} = req.params
    contact.ContactParPersonne(idPers,res)
}

exports.Personne = (req,res) => {
    contact.Personne(res)
}

exports.PersonneParent = (req,res) => {
    contact.PersonneParent(res)
}

exports.ContactDispo = (req,res) => {
    contact.ContactDispo(res)
}

exports.ContactDispoProfesseur = (req,res) => {
    contact.ContactDispoProfesseur(res)
}

exports.EditerContact= (req,res) => {
    const {idContact} = req.params
    contact.EditerContact(idContact,res)
}

exports.Modifier= (req,res) => {
    const {idContact,telephone,idPers} = req.body
    contact.Modifier(idContact,telephone,idPers,res)
}

exports.PersonneProf = (req,res) => {
    contact.PersonneProf(res)
} 