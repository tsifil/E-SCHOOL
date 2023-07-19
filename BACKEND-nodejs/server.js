const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
//const multer = require('multer');
const fileUpload = require('express-fileupload');
app.set('view engine', 'ejs');
app.set('views','views');
app.use(fileUpload());

/****************
     ROUTES START
*****************/
const administrateurRoutes = require('./routes/authentification/personnel_administrationRoutes/administrateur')
const dashboard_admin_Routes = require('./routes/actions/dashboard_admin')
const professeurCompte = require('./routes/authentification/professeurRoutes/professeur')
const parent_tuteurRoutes = require('./routes/authentification/parentRoutes/parent_tuteur') 
const professeurRoutes = require('./routes/actions/professeur')
const eleveRoutes = require('./routes/actions/eleve')
const anneeRoutes = require('./routes/actions/anneeScolaire')
const classeRoutes = require('./routes/actions/classe')
const trimestreRoutes = require('./routes/actions/trimestre')
const matiereRoutes = require('./routes/actions/matiere')
const niveauRoutes = require('./routes/actions/niveau')
const edtRoutes = require('./routes/actions/edt')
const personneRoutes = require('./routes/actions/personne') 
const tuteurRoutes = require('./routes/actions/tuteur')
const contactRoutes = require('./routes/actions/contact')
const absenceRoutes = require('./routes/actions/absence')
const note_bulletinRoutes = require('./routes/actions/note_bulletin')
const publicationRoutes = require('./routes/actions/publication')
const parentRoutes = require('./routes/actions/parent')
const AdminAbsenceRoutes = require('./routes/actions/AdminAbsence')
const evaluationRoutes = require('./routes/actions/evaluation')
/**************
     ROUTES END 
***************/

/****************
     USE START
*****************/

app.use(express.static(path.join(__dirname,'controllers/actions/upload')));// CALL FOLDER IN PUBLIC CONTROLLER
app.use(express.static("./controllers/actions/upload/images"));
app.use(express.static("./controllers/actions/upload/fichier_devoir"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
app.use('/api',administrateurRoutes)
app.use(dashboard_admin_Routes)
app.use('/api',professeurCompte)
app.use('/api',parent_tuteurRoutes)
app.use(eleveRoutes)
app.use(anneeRoutes)
app.use(classeRoutes)
app.use(trimestreRoutes)
app.use(matiereRoutes)
app.use(niveauRoutes)
app.use(edtRoutes)
app.use(personneRoutes)
app.use(tuteurRoutes)
app.use(contactRoutes)
app.use(professeurRoutes)
app.use(absenceRoutes)
app.use(note_bulletinRoutes)
app.use(publicationRoutes)
app.use(parentRoutes)
app.use(AdminAbsenceRoutes)
app.use(evaluationRoutes)
/****************
     USE END
*****************/

/****************
     SERVER START
*****************/

app.listen(2002, () => {
    console.log('Le server demarre dans le port 2002');
});

/****************
     SERVER END
*****************/
