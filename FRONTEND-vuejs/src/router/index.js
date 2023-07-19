import Vue from 'vue'
import VueRouter from 'vue-router'
import EschoolLogin from '../views/actions_views/Acceuil_login'
/*********************
  ADMINISTRATEUR START 
 *********************/
import AdministrateurLogin from '../views/authentification_views/PERSONNEL_ADMINISTRATION/Login'
import AdministrateurDashoard from '../views/actions_views/PERSONNEL_ADMINISTRATION/Dashboard.vue'
import EleveListe from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/EleveListe'
import EleveListeInscrit from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/EleveListe_Inscrits'
import AjoutAnneeScolaire from '../views/actions_views/PERSONNEL_ADMINISTRATION/anneeScolaire/AjoutAnnee_scolaire'
import ListeAnneeScolaire from '../views/actions_views/PERSONNEL_ADMINISTRATION/anneeScolaire/ListeAnnee_scolaire'
import EditerAnneeScolaire from '../views/actions_views/PERSONNEL_ADMINISTRATION/anneeScolaire/editerAnnee_scolaire'
import AjouterClasse from '../views/actions_views/PERSONNEL_ADMINISTRATION/classe/Ajouter_classe'
import ListeClasse from '../views/actions_views/PERSONNEL_ADMINISTRATION/classe/Liste_classe'
import AnneeScolaireAdmin from '../views/authentification_views/PERSONNEL_ADMINISTRATION/annee_scolaire'
import ListeGlobale from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/Liste_globale'
import ListeEnfantProfesseur from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/Liste_EnfantProfesseur'
import ListeParClasse from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/LIste_parClasse'
import Trimestre from '../views/actions_views/PERSONNEL_ADMINISTRATION/trimestre/trimestre'
import NouveauTrimestre from '../views/actions_views/PERSONNEL_ADMINISTRATION/trimestre/nouveau_trimestre'
import NouveauMatiere from '../views/actions_views/PERSONNEL_ADMINISTRATION/matiere/nouveau_matiere'
import ListeMatiere from '../views/actions_views/PERSONNEL_ADMINISTRATION/matiere/liste_matiere'
import DetailEleveInscrit from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/Detail_eleveInscrit'
import Reinscription from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/reinscription'
import DetailEleve  from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/Detail_eleve'
import AjouterNiveau from '../views/actions_views/PERSONNEL_ADMINISTRATION/niveau/AjouterNiveau'
import ListeNiveau from '../views/actions_views/PERSONNEL_ADMINISTRATION/niveau/NiveauListe.vue'
import ConsulterCoeff from '../views/actions_views/PERSONNEL_ADMINISTRATION/coefficient_matiere/consulter_coeff_matiere'
import ListeCoeff from '../views/actions_views/PERSONNEL_ADMINISTRATION/coefficient_matiere/liste_coeff_matiere'
//import Edt from '../views/actions_views/PERSONNEL_ADMINISTRATION/edt/emploi_du_temps'
//import CreerEdt from '../views/actions_views/PERSONNEL_ADMINISTRATION/edt/nouveau_edt'
//import EdtDispo from '../views/actions_views/PERSONNEL_ADMINISTRATION/edt/edt_dispo'
import Inscription from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/inscription'
import NouveauPersonnel from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/personnel/nouveau_personnel'
import ListeGlobalePersonnel from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/personnel/liste_globale_personnel'
import DetailPersonne from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/personnel/detail_liste'
import NouveauTuteur from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/tuteur/nouveau_tuteur'
import ListeTuteur from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/tuteur/liste_tuteur'
import Contact from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/contact'
import CreerContact from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/creer_contact'
import VoirContact from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/voir_contact'
import ModifierContact from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/modifier_contact'
import DetailTuteur from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/tuteur/Detail_tuteur'
import EditerTrimestre from '../views/actions_views/PERSONNEL_ADMINISTRATION/trimestre/edit_trimestre'
import NouveauProf from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/professeur/nouveau_prof'
import ListeProf from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/professeur/liste_prof'
import ConsultationAbsenceAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/absence/consultation_absence'
import JustificationAbsenceAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/absence/justification_absence'
import EleveAbsent from '../views/actions_views/PERSONNEL_ADMINISTRATION/absence/eleve_absent'
import consulationBulletin from '../views/actions_views/PERSONNEL_ADMINISTRATION/Bulletin_note/consultation'
import BulletinAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/Bulletin_note/bulletin_admin'
import ConsultationEvaluationAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/notes/consultation_evaluations'
import VoirNotesAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/notes/voir_notes'
import AfficherNotesAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/notes/afficher_notes'
import consultationMoyennesAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/notes/consultation_moyennes'
import ajouterEdt from '../views/actions_views/PERSONNEL_ADMINISTRATION/temps/ajouter_edt'
import listeEdt from '../views/actions_views/PERSONNEL_ADMINISTRATION/temps/edt'
import listeEdtClasse from '../views/actions_views/PERSONNEL_ADMINISTRATION/temps/edt_classe'
import EditerClasse from '../views/actions_views/PERSONNEL_ADMINISTRATION/classe/editer_classe'
import PresenceEleveAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/absence/presence_eleve'
import ListeProfClasseAdmin from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/professeur/liste_prof_classe'
import Evaluation from '../views/actions_views/PERSONNEL_ADMINISTRATION/evaluation/liste'
import ListeContactProf from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/professeur/contact/liste'
import CreerContactProf from '../views/actions_views/PERSONNEL_ADMINISTRATION/personne/professeur/contact/creation'
import HeureTravaille from '../views/actions_views/PERSONNEL_ADMINISTRATION/temps/heure_travaille'

//import feuillePresence_eleve from '../views/actions_views/PERSONNEL_ADMINISTRATION/eleve/feuillePresence_eleve'
/*******************
  ADMINISTRATEUR END 
 *******************/

/*******************
  PROFESSEUR START 
 ******************/
import ProfesseurLogin from '../views/authentification_views/PROFESSEUR/Login'
import CreationCompteProf from '../views/authentification_views/PROFESSEUR/Creation_compte'
import AnneeScolaireProf from '../views/authentification_views/PROFESSEUR/annee_scolaire'
import DasboardProf from '../views/actions_views/PROFESSEUR/Dashboard'
import NoteIndividuelle from '../views/actions_views/PROFESSEUR/notes/Ajout_note_individuelle'
import NouvelleNoteIndividuelle from '../views/actions_views/PROFESSEUR/notes/nouvelle_note_individuelle'
import NoteGroupe from '../views/actions_views/PROFESSEUR/notes/note_groupee'
import ConsultationEvaluationProf from '../views/actions_views/PROFESSEUR/notes/consultation_evaluation'
import VoirNoteProf from '../views/actions_views/PROFESSEUR/notes/voir_note'
import EditerNotesProf from '../views/actions_views/PROFESSEUR/notes/editer_note'
import AfficherNoteEleve from '../views/actions_views/PROFESSEUR/notes/afficher_note_eleve'
import NouveauAbsence from '../views/actions_views/PROFESSEUR/absence/nouveau'
import ConsultationAbsence from '../views/actions_views/PROFESSEUR/absence/consultation'
import PublierDevoir from '../views/actions_views/PROFESSEUR/devoir/envoyerDevoir'
import NoteGroupeeEleveVue from '../views/actions_views/PROFESSEUR/notes/note_groupee_eleve'
import PresenceEleve from '../views/actions_views/PROFESSEUR/absence/presence_eleve'
import VerificationAppel from '../views/actions_views/PROFESSEUR/absence/verificationAppel'

/******************
  PROFESSEUR START 
 ******************/

/******************
  PROF ET ADMIN START 
 ******************/

/******************
  PROF ET ADMIN END 
 ******************/

/*******************
  PARENT START 
 ******************/
import ParentCreatAccount from '../views/authentification_views/PARENT/creer_compte'
import ParentLogin from '../views/authentification_views/PARENT/Login'
import ParentDashoard from '../views/actions_views/PARENT/Dashboard'
import AnneeScolaire from '../views/authentification_views/PARENT/annee_scolaire'
import AbsenceE from '../views/actions_views/PARENT/absence/absence'
import NoteE from '../views/actions_views/PARENT/note/note'
import MatiereE from '../views/actions_views/PARENT/matiere/matiere_eleve'
import ProfesseurE from '../views/actions_views/PARENT/professeur/professeur'
import BulletinE from '../views/actions_views/PARENT/bulletin/consultation'
import AfficherBulletinE from '../views/actions_views/PARENT/bulletin/afficher_bulletin'
//import { component } from 'vue/types/umd'

/******************
  PARENT START 
 ******************/
  
Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    name:'eSchool_login',
    component: EschoolLogin
 }/*,
 {
     path:'/anneeScolaire',
     name:'anneeScolaire',
     component:AnneeScolaire
 }*/,
 {
    path:'/anneeScolaire_:idAs',
    name:'EditerAnneeScolaire',
    component:EditerAnneeScolaire
 },
 {
    path:'/trimestre_edit_:idTrimestre',
    name:'EditerTrimestre',
    component:EditerTrimestre
 },
 /**************
  PARENT START 
 ***************/
{
  path:'/creer_compte_parent',
  name:'ParentCreatAccount',
  component:ParentCreatAccount
},
{
    path:'/connecter_parent',
    name:'connecter_parent',
    component: ParentLogin
 },
 {
    path:'/dashboard_parent',
    name:'dashboard_parent',
    component: ParentDashoard
},
{
     path:'/parent_anneeScolaire',
     name:'anneeScolaireParent',
     component:AnneeScolaire
},
{
    path:'/absence',
    name:'AbsenceE',
    component:AbsenceE
},
{
    path:'/note',
    name:'NoteE',
    component:NoteE
},
{
    path:'/matiere',
    name:'MatiereE',
    component:MatiereE
},
{
    path:'/professeur',
    name:'ProfesseurE',
    component:ProfesseurE
},
{
    path:'/consultation_bulletin',
    name:'BulletinE',
    component:BulletinE
},
{
    path:'/afficher_bulletin-:numMatricule-:idClasse-:idTrimestre-:idEvalua',
    name:'AfficherBulletinE',
    component:AfficherBulletinE
},
  /************
  PARENT END 
 **************/
 /*********************
  PROFESSEUR START 
 *********************/
 {
     path:'/connecter_professeur',
     name:'connecter_professeur',
     component: ProfesseurLogin
  },
  {
    path:'/creer_compte',
    name:'CreationCompteProf',
    component:CreationCompteProf
  },
  {
    path:'/annee_scolaire',
    name:'AnneeScolaireProf',
    component:AnneeScolaireProf
  },
  {
    path:'/dashboard_professeur',
    name:'DasboardProf',
    component:DasboardProf
  },
  {
    path:'/note_individuelle',
    name:'NoteIndividuelle',
    component:NoteIndividuelle
  },
  {
    path:'/note_individuelle_:numMatricule-:idClasse',
    name:'NouvelleNoteIndividuelle',
    component:NouvelleNoteIndividuelle
  },
  {
    path:'/note_groupee',
    name:'NoteGroupe',
    component:NoteGroupe
  },
  {
      path:'/professeur_consultationEvaluation',
      name:'ConsultationEvaluationProf',
      component:ConsultationEvaluationProf
  },
  {
      path:'/professeur_afficherNote_:idTrimestre-:codemat',
      name:'VoirNoteProf',
      component:VoirNoteProf
  },
  {
      path:'/professeur_afficherNoteEleve-:coef-:idClasse-:idEvalua-:idTrimestre-:codemat',
      name:'AfficherNoteEleve',
      component:AfficherNoteEleve
  },
  {
     path:'/pointage_eleve',
     name:'NouveauAbsence',
     component:NouveauAbsence
  },
  {
     path:'/Prof_consultation_absence',
     name:'ConsultationAbsence',
     component:ConsultationAbsence
  },
  {
      path:'/nouveau_devoir',
      name:'PublierDevoir',
      component:PublierDevoir
  },
  {
      path:'/prof_editer-notes-:coef-:idClasse-:idEvalua-:idTrimestre-:codemat-:public-:date',
      name:'EditerNotesProf',
      component:EditerNotesProf
  },
  {
    path:'/enregistrement-note-:idClasse-:idTrimestre-:idNiv-:codemat-:idEvalua-:date',
    name:'NoteGroupeeEleveVue',
    component:NoteGroupeeEleveVue
  },
  {
     path:'/presence_eleve',
     name:'PresenceEleve',
     component:PresenceEleve
  },
  {
     path:'/presence_eleve_:idClasse-:heureEnr-:dateAbs',
     name:'PresenceEleves',
     component:PresenceEleve
  },
  {
      path:'/verificationAppel',
      name:'VerificationAppel',
      component:VerificationAppel
  },

/******************
  PROF ET ADMIN START 
 ******************/

/******************
  PROF ET ADMIN START 
 ******************/

/*********************
  PROFESSEUR END 
 *********************/
/*********************
  ADMINISTRATEUR START 
 *********************/
  {
     path:'/connecter_personnel_administration',
     name:'connecter_personnel_administration',
     component: AdministrateurLogin
  },
  {
    path:'/annee_scolaire_admin',
    name:'anneeAdmin',
    component:AnneeScolaireAdmin
  },
  {
    path:'/dashboard_administrateur',
    name:'dashboard_administrateur',
    component: AdministrateurDashoard
 },
 {
    path:'/inscription',
    name:'Inscription',
    component:Inscription
 },
 {
    path:'/liste_eleve',
    name:'listeEleve',
    component:EleveListe
 },
 {
    path:'/nouveau_prof',
    name:'NouveauProf',
    component:NouveauProf
 },
 {
    path:'/liste_prof',
    name:'ListeProf',
    component:ListeProf
 },
 {
    path:'/listeAnneeScolaire',
    name:'anneeScolaireListe',
    component:ListeAnneeScolaire
 },
  {
    path:'/nouveauAnneeScolaire',
    name:'nouveauAnneeScolaire',
    component:AjoutAnneeScolaire
  },
  {
    path:'/classe_nouveau',
    name:'nouveauClasse',
    component:AjouterClasse
  },
  {
    path:'/classe_liste',
    name:'listeClasse',
    component:ListeClasse
  },
  {
    path:'/liste/globale',
    name:'listeGlobale',
    component:ListeGlobale
  },
  {
    path:'/detail_eleveInscrit_:numMatricule',
    name:'DetailEleveInscrit',
    component: DetailEleveInscrit
  },
  {
    path:'/liste_enfantProfesseur',
    name:'listeEnfantProf',
    component:ListeEnfantProfesseur
  },
  {
    path:'/eleve_par_classe',
    name:'listeParClasse',
    component:ListeParClasse
  },
  {
    path:"/trimestre_:anneeScolaire",
    name:'trimestre',
    component:Trimestre
  },
  {
    path:'/trimestre_nouveau_:idAs',
    name:'nouveauTrimestre',
    component:NouveauTrimestre
  },
  {
    path:'/matiere_nouveau',
    name:'NouveauMatiere',
    component:NouveauMatiere
  },
  {
    path:'/matiere_liste',
    name:'ListeMatiere',
    component:ListeMatiere
  },
  {
    path:'/coefficient_matiere_nouveau',
    name:'NouveauCoefficientMatiere',
    component:ConsulterCoeff
  },
  {
      path:'/coefficient_matiere_liste',
      name:'ListeCoefficientMatiere',
      component:ListeCoeff
  },
  /*{
    path:'/edt',
    name:'Edt',
    component:Edt
  },
   {
    path:'/nouveau_edt',
    name:'CreationEdt',
    component:CreerEdt
  },*/
  {
    path:'/liste_globale',
    name:'ListeGlobalePersonnel',
    component:ListeGlobalePersonnel
  },
  {
    path:'/eleve_inscrit',
    name:'EleveListeInscrit',
    component:EleveListeInscrit
  }, 
  {
    path:'/reinscription_:numMatricule-:idAs',
    name:'Reinscription',
    component:Reinscription
  },
  {
    path:'/eleve_detail_:numMatricule',
    name:'DetailEleve',
    component:DetailEleve
  },
  {
    path:'/nouveau_niveau',
    name:'AjouterNiveau',
    component:AjouterNiveau
  },
  {
    path:'/niveau',
    name:'Niveau',
    component:ListeNiveau
  }/*,
  {
    path:'/edtDisponible_:idClasse',
    name:'EdtDisponible',
    component:EdtDispo

  }*/,
  {
    path:'/nouveau_personnel',
    name:'NouveauPersonnel',
    component:NouveauPersonnel
  },
  {
    path:'/nouveau_tuteur',
    name:'NouveauTuteur',
    component:NouveauTuteur
  },
  {
    path:'/liste_tuteur',
    name:'ListeTuteur',
    component:ListeTuteur
  },
  {
    path:'/tuteur_detail_:idPers',
    name:'DetailTuteur',
    component:DetailTuteur
  },
  {
    path:'/contact',
    name:'Contact',
    component:Contact
  },
  {
    path:'/contact_creer_:idPers',
    name:'CreerContact',
    component:CreerContact
  },
  {
    path:'/modifier_contact_:idContact',
    name:'ModifierContact',
    component:ModifierContact
  },
  {
    path:'/contact_:idPers',
    name:'VoirContact',
    component:VoirContact
  },
  {
    path:'/detail_personne_:idPers',
    name:'DetailPersonne',
    component:DetailPersonne
  },
  {
    path:'/Admin_consultation_absence',
    name:'ConsultationAbsenceAdmin',
    component:ConsultationAbsenceAdmin
  },
  {
    path:'/Admin_justification_absence',
    name:'JustificationAbsenceAdmin',
    component:JustificationAbsenceAdmin
  },
  {
    path:'/Admin_afficher_absence_:idClasse-:codemat-:dateAbs',
    name:'EleveAbsent',
    component:EleveAbsent
  },
  {
    path:'/Admin_consulation-bulletin',
    name:'consulationBulletin',
    component:consulationBulletin
  },
  {
    path:'/bulletinAdmin_:idClasse-:idTrimestre-:idEvalua',
    name:'BulletinAdmin',
    component:BulletinAdmin
  },
  {
    path:'/Admin_consultation-evaluation',
    name:'ConsultationEvaluationAdmin',
    component:ConsultationEvaluationAdmin
  },
  {
    path:'/Admin_voir-notes_:idTrimestre-:codemat',
    name:'VoirNotesAdmin',
    component:VoirNotesAdmin
  },
  {
    path:'/Admin_afficher-notes-:coef-:idClasse-:idEvalua-:idTrimestre-:codemat',
    name:'AfficherNotesAdmin',
    component:AfficherNotesAdmin
  },
  {
    path:'/Admin_consultation-moyennes',
    name:'consultationMoyennesAdmin',
    component:consultationMoyennesAdmin
  },
  {
    path:'/ajouter_Edt',
    name:'ajouterEdt',
    component:ajouterEdt
  },
  {
    path:'/Admin-presence_eleve',
    name:'PresenceEleveAdmin',
    component:PresenceEleveAdmin
  },
  {
    path:'/planning',
    name:'listeEdt',
    component:listeEdt
  },
  {
    path:'/planning_:idClasse',
    name:'listeEdtClasse',
    component:listeEdtClasse
  },
  {
    path:'/liste_Profs_classe',
    name:'ListeProfClasseAdmin',
    component:ListeProfClasseAdmin
  },
  {
    path:'/editerClasse-:idClasse-:idNiv-:libelle',
    name:'EditerClasse',
    component:EditerClasse
  },
  {
    path:'/evaluation_liste',
    name:'Evaluation',
    component:Evaluation
  },
  {
    path:'/liste_contactProf',
    name:'ListeContactProf',
    component:ListeContactProf
  },
  {
    path:'/creation_contactProf',
    name:'CreerContactProf',
    component:CreerContactProf
  },
  {
    path:'/heure_travaille',
    name:'HeureTravaille',
    component:HeureTravaille
  }
 /******************
  ADMINISTRATEUR END 
 *******************/
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
