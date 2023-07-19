<template>
    <div class="container-scroller">

        <NavHaut/>
  
        <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
        
            <router-link class="btn btn-info btn-icon-text" :to="{name:'nouveauClasse'}">
                <!--i class="ti-plus"></i-->
                <i class="ti-plus"></i>
                Création
            </router-link>
            <br><br>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Listes</h4>
                   
                    <div class="table-responsive pt-3">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>CLASSE DE</th>
                            <th>NIVEAU</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(liste,i) in listeClasse" :key="liste.idClasse">
                                <td>{{i+1}}</td>
                                <td>{{ liste.libelleClasse }}</td>
                                <td>{{liste.libelleNiv}}</td>
                                <td> 
                                    <router-link :to="{name:'EditerClasse',params:{idClasse:liste.idClasse,idNiv:liste.idNiv,libelle:liste.libelleClasse}}" class="btn btn-info btn-sm">
                                      <i class="ti-pencil"></i>
                                    </router-link>
                                    <button @click="Supprimer(liste.idClasse)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </template>
<script>
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                  this.$router.push('/connecter_personnel_administration')
            }
        },
         data(){
            return{
                listeClasse:[],
            }
         },
         methods:{
                    Liste(){
                        HTTP.get('/listeClasse').then((response)=>{
                            this.listeClasse = response.data
                        })
                },
                Supprimer(idClasse){
                  this.$swal({icon:'warning',text:"Voulez-vous supprimer cette classe ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/classe/supprimer/${idClasse}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href = '/classe_liste'
                                  })
                                }
                            }) 
                        }
                    })
                }
         },
         mounted(){
               
             this.Liste()
         }
    }
</script>
  


