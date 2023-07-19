<template>
   
    <div class="container-scroller">

        <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title"></h4>
                    <p class="card-description">
                        Id:<code>{{idPers}}</code> 
                        {{nomPrenom}}
                    </p>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>N</th>
                              <th>Téléphone disponible</th>
                              <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,i) in liste" :key="l.idContact">
                                <td>{{i+1}}</td>
                                <td>{{l.telephone}}</td>
                                <td>
                                    <router-link :to="{name:'ModifierContact',params:{idContact:l.idContact}}" class="btn btn-info btn-sm"><i class="ti-pencil"></i></router-link>
                                    <button class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
                liste:[],
                idPers:this.$route.params.idPers,
                nomPrenom:''
            }
         },
         methods:{
            Liste(){
                HTTP.get(`/liste/contact/${this.idPers}`).then((response)=>{
                     this.liste = response.data.result
                     this.nomPrenom = response.data.nomPrenom
                })
            }
         },
         mounted(){
               
             this.Liste()
         }
    }
</script>
  