const db = require('../../util/baseDeDonnees');

module.exports = class Publication{
    static PublierNote(pub,idTrimestre,codemat,idClasse,idEvalua,res){
        const requete = "UPDATE passer_evaluation SET public='"+pub+"' WHERE"
        +" idTrimestre='"+idTrimestre+"' AND codemat='"+codemat+"' AND idClasse='"+idClasse+"'"
        +" AND idEvalua='"+idEvalua+"'"
        return db.query(requete,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({msg200:"La publication a effectue avec succes"})
            }
        })
    }
}