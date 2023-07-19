<template>  
    <div class="container-scroller">  
      <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
            <!-- AJOUTER TRIMESTRE -->
            <router-link class="btn btn-success btn-inverse btn-icon" :to="{name:'nouveauTrimestre',params:{idAs:idAsParams}}">
                <i class="ti-plus"></i>
            </router-link>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Trimestre</h4>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                              <th>Libelle</th>
                              <th>Date Debut</th>
                              <th>Date Fin</th>
                              <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in liste" :key="l.idTrimestre">
                                <td>{{l.libelle}}</td>
                                <td>{{moment(l.dateDebut).format('YYYY/MM/DD')}}</td>
                                <td>{{moment(l.dateFin).format('YYYY/MM/DD')}}</td>   
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
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
         data(){
            return{
                idAsParams : this.$route.params.anneeScolaire,
                liste:[]
            }
         },
         methods:{
            Liste(){
                HTTP.get(`/listeTrimestre/${this.idAsParams}`).then((response)=>{
                     this.liste = response.data
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
            }
         },
         mounted(){
            this.Liste()
         }
    }
</script>
  