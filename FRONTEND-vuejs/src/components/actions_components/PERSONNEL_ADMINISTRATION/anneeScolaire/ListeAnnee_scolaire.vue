<template>
  <div class="container-scroller">
    <NavHaut/>
    <div class="container-fluid page-body-wrapper">
      
        <NavGauche/>

      <div class="main-panel">
        <div class="content-wrapper">

          <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">

              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">
                    <router-link  :to="{name:'nouveauAnneeScolaire'}">
                        <!--i class="ti-plus"></i-->
                        Cliquez ici pour ajouter nouvelle année scolaire
                    </router-link>
                  </h4>
                  <p class="card-description">
                    <!--Add class <code>.table-striped</code>-->
                  </p>
                  <div class="table-responsive">
                    <table class="table table-dark">
                      <thead>
                        <tr>
                            <th>LIBELLE</th>
                            <th>DATE DE DEBUT</th>
                            <th>DATE DE FIN</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr v-for="annee in pageOfItems" :key="annee.idAs">
                            <td>{{annee.libelle}}</td>
                            <td>{{moment(annee.dateDebut).format('YYYY-MM-DD')}}</td>
                            <td>{{moment(annee.dateFin).format('YYYY-MM-DD')}}</td>
                            <td>
                                <vs-button color="green" icon="check" v-if="(annee.idAs == idAs_actuelle)"></vs-button>
                                <vs-button color='red' icon='cancel' @click="changerAnnee(annee.idAs)"  v-else></vs-button>
                            </td>
                    <td>
                        <div class="dropdown">
                          <vs-button color='blue' class='dropdown-toggle' id="dropdownMenuIconButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          </vs-button>
                          
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuIconButton1">
                                <router-link class="dropdown-item" :to="{name:'EditerAnneeScolaire',params:{idAs:annee.idAs}}"><i class="ti-pencil"></i>     Edit</router-link>
                                <button v-if="idAs_actuelle!=annee.idAs" class="dropdown-item" @click="SupprimerAnnee(annee.idAs)"><i class="ti-trash"></i>      Supprimer</button>
                              
                              <div class="dropdown-divider"></div>
                                <router-link class="dropdown-item" :to="{name:'trimestre',params:{anneeScolaire:annee.idAs}}" v-if="annee.idAs!=idAs_actuelle"><i class="ti-list"></i>    Trimestre</router-link>
                                <router-link class="dropdown-item" :to="{name:'nouveauTrimestre',params:{idAs:idAs_actuelle}}" v-else><i class="ti-plus"></i>    Ajouter un trimestre</router-link>
                          </div>
                        </div>
                    </td>
                </tr>
                      </tbody>
                    </table>
                <br>                     
                <!-- PAGINATION -->
                <pagination :maxPages=5 :pageSize=4 :items="getTableauMaterielFilter" @changePage="onChangePage"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Trimestre</h4>
                  <div class="table-responsive">
                    <table class="table table-dark">
                      <thead>
                        <tr>
                            <th>LIBELLE</th>
                            <th>DATE DE DEBUT</th>
                            <th>DATE DE FIN</th>
                            <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="l in listeTrimestre" :key="l.idTrimestre">
                                <td>{{l.libelle}}</td>
                                <td>{{moment(l.dateDebut).format('YYYY-MM-DD')}}</td>
                                <td>{{moment(l.dateFin).format('YYYY-MM-DD')}}</td>
                                <td>
                                  <router-link class="btn btn-info btn-sm" :to="{name:'EditerTrimestre',params:{idTrimestre:l.idTrimestre}}"><i class="ti-pencil"></i></router-link>
                                  <button @click="SupprimerTrimestre(l.idTrimestre)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
import AuthService from '@/services/AuthPersonnel_AdministrationService.js';
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'

export default {
    components:{NavHaut,NavGauche},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
    data(){
            return{
                ListeAnne:[],
                dateAujour: new Date(),
                idAs_actuelle:this.$store.getters.getUserAnnee.idAs,
                msg:'',
                listeTrimestre:[],
                pageOfItems:[],
            }
        },
        methods:{
            AnneeScolaire(){
                HTTP.get('/liste_anneeScolaire').then(response=>{
                    this.ListeAnne = response.data
                })
            },  
            ListeTrimestre(){           
                HTTP.get(`/listeTrimestre/${this.idAs_actuelle}`).then((response)=>{
                     this.listeTrimestre = response.data
                })
            },    
            SupprimerAnnee(id){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                    buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                    confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
              }).then((willDelete)=> {
                  if(willDelete){
                      HTTP.delete(`/anneeScolaire/supprimer/${id}`).then(response=>{
                        if(response.data.msg200){
                            this.$swal(response.data.msg200,{icon:"success"})
                            .then(()=>{
                                      window.location.href = '/listeAnneeScolaire'
                                  })
                                }
                            }) 
                        }
                    })
            },
            SupprimerTrimestre(idTrimestre){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                    buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                    confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
              }).then((willDelete)=> {
                  if(willDelete){
                      HTTP.delete(`/trimestre/supprimer/${idTrimestre}`).then(response=>{
                        if(response.data.msg200){
                            this.$swal(response.data.msg200,{icon:"success"})
                            .then(()=>{
                                      window.location.href = '/listeAnneeScolaire'
                                  })
                                }
                            }) 
                        }
                    })
            },       
        async changerAnnee(idAs){
                    try{
                            const credentials = {
                                 idAs: idAs
                            };
                            const response = await AuthService.anneeScoAdmin(credentials);
                            const tokenAnneeAdmin = response.tokenAnneeAdmin
                            const userAnnee = response.userAnnee
                            this.$store.dispatch('anneeScoAdmin',{tokenAnneeAdmin,userAnnee})
                            this.$swal("Opération exécutée avec succès",{icon:'success'}).then(()=>{
                              window.location.href = '/listeAnneeScolaire'
                            })

                    }catch(error){
                            this.msg = error.response.data.msg
                    }
            },
            onChangePage(page){
               this.pageOfItems = page
            }
        },
        mounted(){
            this.AnneeScolaire()
            this.ListeTrimestre()
        },
        computed:{
            getTableauMaterielFilter(){
              return this.ListeAnne
            }
        }
}
</script>
