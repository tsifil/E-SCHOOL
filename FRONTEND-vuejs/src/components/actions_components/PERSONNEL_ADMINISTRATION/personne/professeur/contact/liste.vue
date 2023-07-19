<template>
    <div class="container-scroller">
        <NavHaut/> 
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">   
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">  
            <!-- AJOUTER NIVEAU -->        
            <router-link class="btn btn-info btn-icon-text" :to="{name:'CreerContactProf',params:{idPers:0}}">
                <i class="ti-plus"></i>
                Création  contact
            </router-link>
            
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Contact Disponible</h4>
                    <!--p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>#Id</th>
                              <th>Nom et prenom(s)</th>
                              <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in liste" :key="l.idNiv">
                                <td>{{l.idPers}}</td>
                                <td>{{l.nomPrenom}}</td>
                                <td><router-link :to="{name:'VoirContact',params:{idPers:l.idPers}}" class="btn btn-info btn-sm"><i class="ti-eye"></i></router-link></td>
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
import {HTTP} from '../../../../../../http-constants'
import NavHaut from '../../../../includes/Menu_haut.vue'
import NavGauche from '../../../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
         data(){
            return{
                liste:[]
            }
         },
         methods:{
            Liste(){
                HTTP.get('/contactDisponible/professeur')
                .then((response)=>{
                     this.liste = response.data
                })
            }
         },
         mounted(){               
             this.Liste()
         }
    }
</script>
  