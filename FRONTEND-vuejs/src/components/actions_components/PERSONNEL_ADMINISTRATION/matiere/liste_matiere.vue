<template>
   
    <div class="container-scroller">

        <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
            <router-link class="btn btn-info btn-icon-text" :to="{name:'NouveauMatiere'}">
                <i class="ti-plus"></i>
                Ajouter
            </router-link>
            <br><br>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Liste de la matière</h4>
                    <!--p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>NOM DE LA MATIERE</th>
                              <th>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,i) in liste" :key="l.codemat">
                                    <td>{{i+1}}</td>
                                    <td>{{l.nomMatiere}}</td>
                                <td>
                                  <button @click="Edit(l.codemat,l.nomMatiere)" data-toggle="modal" data-target="#myModal" class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                  <button @click="Supprimer(l.codemat)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
                                </td>
                           </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
  
                  <!-- MODAL -->
                  <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br>
                              <label>Nom de la matiere :</label>
                              <br><br>
                              <input type="text" class="form-control"  
                               v-model="passedData.nomMatiere">
                              <br><br>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                              @click="Modifier(passedData.codemat,passedData.nomMatiere)">
                                  Modifier
                              </button>
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
                passedData:{codemat:'',nomMatiere:''}
            }
         },
         methods:{
            Liste(){
                HTTP.get('/listeMateriel').then((response)=>{
                    this.liste = response.data
                })
            },
            Edit(codemat,nomMatiere){
                this.passedData={codemat,nomMatiere}
            },
            Modifier(codemat,nomMatiere){
                const data={codemat:codemat,nomMatiere:nomMatiere}
                HTTP.post('/matiere/modifier',data)
                .then((response)=>{
                    if(response.data.msg404){
                      this.$swal(response.data.msg404,{icon:'error'})
                    }else if(response.data.msg200){
                      this.$swal(response.data.msg200,{icon:'success'}).then(()=>{
                          window.location.href = '/matiere_liste'
                      })
                    }
                })
            },
            Supprimer(codemat){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer cette matiere ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                            const data={codemat:codemat}
                            HTTP.post('/supprimerMatiere',data)
                            .then((response)=>{
                                if(response.data.msg200){
                                    this.$swal(response.data.msg200,{icon:'success'})
                                    .then(()=>{
                                        window.location.href = '/matiere_liste'
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
  


