const publication = require('../../models/actions/publicationModel')
exports.PublierNote= (req,res) => {
    const {pub,idTrimestre,codemat,idClasse,idEvalua} = req.body
    publication.PublierNote(pub,idTrimestre,codemat,idClasse,idEvalua,res)
}
