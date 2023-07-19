<template>
  <div>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
         <ul class="nav">
            <li class="nav-item" id='active' :class="{'active':isActive('/dashboard_administrateur')}">
               <router-link class="nav-link" :to="{name:'dashboard_administrateur'}">
                  <i class="icon-grid menu-icon"></i>
                  <span class="menu-title">Tableau de bord</span>
               </router-link>
                
            </li>            
           <li class="nav-item" :class="{'active':isActive('/inscription') || isActive('/liste_eleve') || isActive('/eleve_inscrit') || isActive('/eleve_par_classe') || isActive('/liste_enfantProfesseur')}">
             <a class="nav-link" data-toggle="collapse" href="#eleve">
               <vs-icon icon="person_add" class="menu-icon"></vs-icon>
               <span class="menu-title">Elèves</span>
             </a>
             <div class="collapse" id="eleve">
               <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{'active':isActive('/inscription')}">
                  <router-link class="nav-link" :to="{name:'Inscription'}">Inscription</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/liste_eleve')}">
                  <router-link class="nav-link" :to="{name:'listeEleve'}">Liste des élèves</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/eleve_inscrit')}">
                  <router-link class="nav-link" :to="{name:'EleveListeInscrit'}">Liste des inscrits</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/eleve_par_classe')}">
                  <router-link class="nav-link" :to="{name:'listeParClasse'}">Liste par classe</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/liste_enfantProfesseur')}">
                  <router-link class="nav-link" :to="{name:'listeEnfantProf'}">Liste d'enfant <br><br> du professeur</router-link>
                </li>
               </ul>
             </div>
           </li>

           <li class="nav-item" :class="{'active':isActive('/nouveau_personnel') || isActive('/liste_globale') || isActive('/liste_tuteur')}">
              <a class="nav-link" data-toggle="collapse" href="#parent-el">
                <i class="ti-user menu-icon"></i>
                <span class="menu-title">Parents/Tuteurs</span>
              </a>
             <div class="collapse" id="parent-el">
               <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{'active':isActive('/nouveau_personnel')}">
                  <router-link class="nav-link" :to="{name:'NouveauPersonnel'}">Ajouter</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/liste_globale')}"> 
                  <router-link :to="{name:'ListeGlobalePersonnel'}" class="nav-link">Liste globale</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/liste_tuteur')}">
                  <router-link class="nav-link" :to="{name:'ListeTuteur'}">Tuteur/élève</router-link>
                </li>
               </ul>
             </div>
           </li>

           <li class="nav-item" :class="{'active':isActive('/nouveau_prof') || isActive('/liste_prof') || isActive('/liste_Profs_classe')}" >
             <a class="nav-link" data-toggle="collapse" href="#prof">
               <i class="ti-user menu-icon"></i>
               <span class="menu-title">Professeurs</span>
             </a>
             <div class="collapse" id="prof">
               <ul class="nav flex-column sub-menu">
                 <li class="nav-item" :class="{'active':isActive('/nouveau_prof')}">
                    <router-link class="nav-link" :to="{name:'NouveauProf'}">Ajouter</router-link>
                 </li>
                 <li class="nav-item" :class="{'active':isActive('/liste_prof')}">
                    <router-link class="nav-link" :to="{name:'ListeProf'}">Liste</router-link>
                 </li>
                 <li class="nav-item" :class="{'active':isActive('/liste_Profs_classe')}">
                  <router-link class="nav-link" :to="{name:'ListeProfClasseAdmin'}">Liste des Profs/classe</router-link>
                 </li>
               </ul>
             </div>
           </li>

           <li class="nav-item" :class="{'active':isActive('/Admin_consultation-evaluation') || isActive('/Admin_consultation-moyennes')}">
             <a class="nav-link" data-toggle="collapse" href="#note" aria-expanded="false" aria-controls="charts">
               <i class="ti-info-alt menu-icon"></i>
               <span class="menu-title">Notes</span>
             </a>
             <div class="collapse" id="note">
               <ul class="nav flex-column sub-menu">
                 <li class="nav-item" :class="{'active':isActive('/Admin_consultation-evaluation')}"> 
                  <router-link class="nav-link" :to="{name:'ConsultationEvaluationAdmin'}">Consultation <br><br>des evaluations</router-link>
                </li>
                 <li class="nav-item" :class="{'active':isActive('/Admin_consultation-moyennes')}"> 
                  <router-link class="nav-link" :to="{name:'consultationMoyennesAdmin'}">Consultation <br><br>des moyennes</router-link>
                 </li>
               </ul>
             </div>
           </li>


            <li class="nav-item" :class="{'active':isActive('/Admin_consulation-bulletin')}">
             <a class="nav-link" data-toggle="collapse" href="#bulletin" aria-expanded="false" aria-controls="charts">
               <i class="ti-info-alt menu-icon"></i>
               <span class="menu-title">Bulletin des notes</span>
             </a>
             <div class="collapse" id="bulletin">
               <ul class="nav flex-column sub-menu">
                 <li class="nav-item" :class="{'active':isActive('/Admin_consulation-bulletin')}"> 
                  <router-link class="nav-link" :to="{name:'consulationBulletin'}">Consultation</router-link>
                </li>
               </ul>
             </div>
           </li>
      
           <li class="nav-item" :class="{'active':isActive('/Admin-presence_eleve') || isActive('/planning') || isActive('/heure_travaille')}">
             <a class="nav-link" data-toggle="collapse" href="#temp">
               <i class="ti-alarm-clock menu-icon"></i>
               <span class="menu-title">Gestion du temps</span>
             </a>
             <div class="collapse" id="temp">
               <ul class="nav flex-column sub-menu">
                
                 <li class="nav-item" :class="{'active':isActive('/Admin-presence_eleve')}">
                  <router-link class="nav-link" :to="{name:'PresenceEleveAdmin'}">
                    Présence des élèves
                  </router-link></li>
                 <li class="nav-item" :class="{'active':isActive('/planning')}">
                    <router-link :to="{name:'listeEdt'}" class="nav-link">Emploi du temps</router-link>
                 </li>
                 <li class="nav-item" :class="{'active':isActive('/heure_travaille')}">
                    <router-link :to="{name:'HeureTravaille'}" class="nav-link">Consultation<br><br> d’heure travaillée </router-link>
                 </li>
               </ul>
             </div>
           </li>

           <li class="nav-item" :class="{'active':isActive('/listeAnneeScolaire') || isActive('/classe_liste') || isActive('/niveau') || isActive('/matiere_liste') || isActive('/coefficient_matiere_liste') || isActive('/evaluation_liste')}">
             <a class="nav-link" data-toggle="collapse" href="#param" aria-expanded="false" aria-controls="error">
               <i class="ti-settings menu-icon"></i>
               <span class="menu-title">Paramètres</span>
             </a>
             <div class="collapse" id="param">
               <ul class="nav flex-column sub-menu">
                <li class="nav-item" :class="{'active':isActive('/listeAnneeScolaire')}">
                  <router-link :to="{name:'anneeScolaireListe'}" class="nav-link">Année scolaire</router-link>
                </li>
                <li class="nav-item" :class="{'active':isActive('/classe_liste')}">
                  <router-link :to="{name: 'listeClasse'}" class="nav-link">Classe</router-link>
              </li>
                <li class="nav-item" :class="{'active':isActive('/niveau')}">
                  <router-link :to="{name: 'Niveau'}" class="nav-link">Niveau</router-link>
                </li>
                
                <li class="nav-item" :class="{'active':isActive('/matiere_liste')}">
                  <router-link class="nav-link" :to="{name:'ListeMatiere'}" >Matière</router-link>
                </li>

                <li class="nav-item" :class="{'active':isActive('/coefficient_matiere_liste')}">
                  <router-link class="nav-link" :to="{name:'ListeCoefficientMatiere'}">Matière/Niveau</router-link>
                </li>

                <li class="nav-item" :class="{'active':isActive('/evaluation_liste')}">
                  <router-link class="nav-link" :to="{name:'Evaluation'}">Evaluation</router-link>
                </li>

              </ul>
             </div>
           </li>
           <li class="nav-item">
             
             <a class="nav-link" @click="deconnexion()">
                <vs-icon icon="logout" class="menu-icon"></vs-icon>
                <span class="menu-title">Déconnexion</span>
             </a>
           </li>
         </ul>
       </nav>
  </div>
</template>

<script>
export default {
   methods:{
    deconnexion(){
        //this.$store.dispatch('logout')
        //this.$router.push('/')
        this.$swal({icon:'warning',text:"Souhaitez-vous vraiment vous déconnecter ?",
                    dangerMode: true,
                    buttons:{
                      cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                      confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}
                    }}).then((willDisconnect)=> {
                        if(willDisconnect){
                             this.$store.dispatch('logout')
                             this.$router.push('/') 
                        }
                    })
             },
            isActive(route) {
              return this.$route.path === route;
            }
          }
}
</script>