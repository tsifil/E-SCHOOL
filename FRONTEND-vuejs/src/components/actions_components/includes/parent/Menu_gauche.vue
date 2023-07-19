<template>
  <div>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
         <ul class="nav">
            <li class="nav-item" id='active' :class="{'active':currentRoute=='/dashboard_parent'}">
               <router-link  class="nav-link" :to="{name:'dashboard_parent'}" @click.native="setActiveItem('accueil')">
                  <i class="ti-home menu-icon"></i>
                  <span class="menu-title">Acceuil</span>
               </router-link>
               
            </li>    
                    
           <li class="nav-item" :class="{'active':currentRoute=='/professeur'}">               
               <router-link :to="{name:'ProfesseurE'}" class="nav-link" exact>
                   <i class="ti-user menu-icon"></i>
                   <span class="menu-title">Ses professeurs</span>
              </router-link>
           </li>

           <li class="nav-item" :class="{'active':currentRoute=='/matiere'}">
                <router-link :to="{name:'MatiereE'}" class="nav-link" exact>
                  <i class="ti-book menu-icon"></i>
                  <span class="menu-title">Ses Matières</span>
                </router-link>
           </li>

           <li class="nav-item" :class="{'active':currentRoute=='/absence'}">
               <router-link :to="{name:'AbsenceE'}" class="nav-link" exact>
                  <i class="icon-columns menu-icon"></i>
                  <span class="menu-title">Ses absences</span>
               </router-link>
            </li>

           <li class="nav-item" :class="{'active':currentRoute=='/note'}">
               <router-link :to="{name:'NoteE'}"  class="nav-link" exact>
                 <i class="icon-bar-graph menu-icon"></i>
                <span class="menu-title">Ses notes</span>
              </router-link>
           </li>

           <li class="nav-item" :class="{'active':currentRoute=='/consultation_bulletin'}">
               <router-link :to="{name:'BulletinE'}" class="nav-link" exact>
                <i class="icon-grid-2 menu-icon"></i>
                <span class="menu-title">Ses bulletins</span>
               </router-link>
           </li>

           <li class="nav-item">
                <a @click="deconnexion()" class="nav-link">
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
   data(){
       return{
          currentRoute:''
       }
    },
    created(){
        this.currentRoute=this.$route.path
    },
    watch:{
        '$route'(to){
           this.currentRoute=to.path
        }
    },
   methods:{
        deconnexion(){
            this.$swal({icon:'warning',text:"Souhaitez-vous vraiment vous déconnecter ?",
                        dangerMode: true,
                        buttons:{
                          cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}
                        }}).then((willDisconnect)=> {
                            if(willDisconnect){
                                this.$store.dispatch('logoutParent')
                                this.$router.push('/')
                            }
                        })
        }
   }
}
</script>