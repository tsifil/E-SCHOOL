<template>
  <div>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
         <ul class="nav">
            <li class="nav-item" id='active' :class="{'active':isActive('/dashboard_professeur')}">
               <router-link  :to="{name:'DasboardProf'}" class="nav-link" exact>
                  <i class="ti-home menu-icon"></i>
                  <span class="menu-title">Acceuil</span>
               </router-link>
            </li>   


           <li class="nav-item" :class="{ active: isActive('/presence_eleve') }">
              <a class="nav-link" data-toggle="collapse" href="#pointage">
                <i class="icon-layout menu-icon"></i>
                <span class="menu-title">Pointages</span>
              </a>
              <div class="collapse" id="pointage">
                <ul class="nav flex-column sub-menu">
                  <li class="nav-item" :class="{ active: isActive('/presence_eleve') }">
                    <router-link :to="{name:'PresenceEleve'}" class="nav-link">Présence des élèves</router-link>
                  </li>
                </ul>
              </div>
           </li>

           <li class="nav-item" :class="{ active: isActive('/note_groupee') || isActive('/professeur_consultationEvaluation') }">
             <a class="nav-link" data-toggle="collapse" href="#note">
               <i class="icon-columns menu-icon"></i>
               <span class="menu-title">Notes</span>
             </a>
             <div class="collapse" id="note">
               <ul class="nav flex-column sub-menu">
                 <li class="nav-item" :class="{'active':isActive('/note_groupee')}">
                    <router-link :to="{name:'NoteGroupe'}" class="nav-link">Enregistrement<br> <br>des notes</router-link>
                </li>
                 <li class="nav-item" :class="{'active':isActive('/professeur_consultationEvaluation')}">
                    <router-link :to="{name:'ConsultationEvaluationProf'}" class="nav-link">Consultation  <br><br> des evaluations</router-link>
                  </li>
               </ul>
             </div>
           </li>

           
           
          <li class="nav-item">
             <a  @click="deconnexion()" class="nav-link" exact>
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
              this.$swal({icon:'warning',text:"Souhaitez-vous vraiment vous déconnecter ?",
                          dangerMode: true,
                          buttons:{
                            cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                            confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}
                          }}).then((willDisconnect)=> {
                              if(willDisconnect){
                                  this.$store.dispatch('logoutProfesseur')
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