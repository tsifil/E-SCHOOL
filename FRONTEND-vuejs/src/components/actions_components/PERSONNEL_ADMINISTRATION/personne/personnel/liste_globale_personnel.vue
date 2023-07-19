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
                    <h4 class="card-title">Listes</h4>
                    <div class="col-md-6">
                        <div class="form-group row">
                          <div class="col-sm-9">
                          <input type="text" v-model="recherche" 
                           @keyup.exact="affichage='recherche'"
                           placeholder="barre de recherche rapide" class="form-control" width="12px"/>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive pt-3">
                      <table class="table table-dark">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>NOM ET PRENOM(S)</th>
                            <th>PROFESSION</th>
                            <th>SITUATION MATRIMONIALE</th>
                            <th>CONTACT</th>
                            <!--th>Adresse</th>
                            <th>Email</th-->
                            <th>ACTIONS</th>
                            <th>COMPTE</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in pageOfItems" :key="l.idPers">
                                <td>{{ l.idPers }}</td>
                                <td>{{ l.nomPrenom }}</td>
                                <td>{{ l.profession }}</td>
                                <td>{{ l.situationMatrimoniale }}</td>
                                <td>{{ l.contact }}</td>
                                <!--td>{{ l.adresse }}</td>
                                <td>{{ l.email }}</td-->
                                <td> 
                                  <!-- v-if='l.statut==0' -->
                                  <router-link :to="{name:'DetailPersonne',params:{idPers:l.idPers}}" class="btn btn-info btn-sm"><i class="ti-eye"></i></router-link>
                                  <!--router-link :to="{name:'CreerContact',params:{idPers:l.idPers}}" class="btn btn-success btn-sm"><i class="ti-mobile"></i></router-link-->
                                  <!--button @click='Supprimer(l.idPers)' class="btn btn-danger btn-sm"><i class="ti-trash"></i></button-->
                                </td>
                                <td v-if="l.email!=''"><button class="btn btn-success btn-sm">activé</button></td>
                                <td v-else><button class="btn btn-warning btn-sm">non activé</button></td>
                            </tr>
                        </tbody>
                      </table>
                      <br>
                      <pagination :maxPages=5 :pageSize=5 :items="personneFiltrer" @changePage="onChangePage"/>
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
import {HTTP} from '../../../../../http-constants'
import NavHaut from '../../../includes/Menu_haut.vue'
import NavGauche from '../../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
         data(){
            return{
                liste:[],
                recherche:'',
                pageOfItems:[],
                affichage:''
            }
         },
         methods:{
               onChangePage(page){
                  this.pageOfItems = page
                },
                ListePersonne(){
                    HTTP.get('/tablePersonnel').then((response)=>{
                        this.liste = response.data
                        this.affichage=''
                    })
                },
                Rechercher(){
                    var data = {recherche:this.recherche}
                    HTTP.post('/rech/tablePersonnel',data).then((response)=>{
                        this.liste = response.data
                        this.affichage=''
                    })
                },
              Supprimer(idPers){
                  this.$swal({icon:'warning',text:"Voulez-vous supprimer cette personne ?",dangerMode: true,
                    buttons:{
                        cancel:{text:"Annuler",value:false,visible:true,closeModal:true,className:""},
                        confirm:{text:"Ok",value:true,visible:true,closeModal:true,className:""
                        }
                      }
                    }).then((willDelete)=> {
                        if(willDelete){
                                HTTP.delete(`/personne/effacer/${idPers}`).then(response=>{
                                    if(response.data.msg200){
                                        this.$swal(response.data.msg200,{icon:"success"})
                                        .then(()=>{
                                            window.location.href = '/liste_globale'
                                        })
                                    }
                            }) 
                        }
                    })
                  }
              
         },
         mounted(){
             this.ListePersonne()
         },
         computed:{
            personneFiltrer(){
              if(this.affichage == 'recherche'){
                        this.Rechercher()
                        return this.liste                    
                }else{
                    return this.liste 
                }
            }
         }
    }
</script>
  

