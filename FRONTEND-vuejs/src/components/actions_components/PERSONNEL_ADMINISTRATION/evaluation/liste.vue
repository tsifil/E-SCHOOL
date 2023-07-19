<template>   
    <div class="container-scroller">
        <NavHaut/>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">  
            
                  <!-- MODAL -->
                  <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br>
                              <label>Libellée :</label>
                              <br><br>
                               <input type="text" class="form-control" v-model.trim="$v.libelle.$model" :class="{'is-invalid':$v.libelle.$error,'is-valid':!$v.libelle.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.libelle.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>

                              <br><br>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                              <button class="btn btn-info mr-2"
                              @click="Ajouter">
                                  Ajouter
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
            
            <vs-button color='primary' type='gradient' data-toggle="modal" data-target="#myModal">
                <i class="ti-plus"></i>
                Création
            </vs-button>


            <br><br>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">                   
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>LIBELLE</th>
                              <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,i) in liste" :key="l.idEvalua">
                                    <td>{{i+1}}</td>
                                    <td>{{l.libelleEvalua}}</td>
                                <td>
                                  <vs-button @click="Modifier(l.idEvalua,l.libelleEvalua)" data-toggle="modal" data-target="#myModal2" color='blue' icon='edit'></vs-button>
                                  <vs-button @click="Supprimer(l.idEvalua)" color='red' icon='delete'></vs-button>
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
      
      <!-- MODAL -->
      <div id="myModal2" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br>
                              <label>Libellée :</label>
                              <br><br>
                              <input type="text" class="form-control"  
                               v-model="passedData.libelleEvalua">
                              <br><br>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                              @click="EnrModification(passedData.idEvalua,passedData.libelleEvalua)">
                                  Modifier
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
    </div>
  </template>
<script>
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import { required } from 'vuelidate/lib/validators'

    export default{
        components:{NavGauche,NavHaut},
         data(){
            return{
                liste:[],
                libelle:'',
                passedData:{idEvalua:'',libelleEvalua:''}
            }
         },
          validations: {
      libelle:{required},
    },
         methods:{
            Modifier(idEvalua,libelleEvalua){
                this.passedData={idEvalua,libelleEvalua}
            },
            EnrModification(idEvalua,libelleEvalua){
                const data={
                  idEvalua:idEvalua,
                  libelleEvalua:libelleEvalua
                }
                HTTP.post('/modifierEvaluation',data)
                .then((response)=>{
                  if(response.data.msg200){
                        this.$swal(response.data.msg200,{icon:'success'})
                        .then(()=>{
                            window.location.href='/evaluation_liste'
                        })
                    }else if(response.data.msg404){
                       this.$swal(response.data.msg404,{icon:'error'})
                    }
                })
            },
            Liste(){
                HTTP.get('/evaluation/liste').then((response)=>{
                    this.liste = response.data
                })
            },
            Ajouter(){

              this.$v.$touch()

              if(this.$v.$invalid){
                  console.log("Remplir tout")
              }else{
                    const data={libelle:this.libelle}
                    HTTP.post('/evaluation/ajouter',data)
                    .then((response)=>{
                        if(response.data.msg200){
                            this.$swal(response.data.msg200,{icon:'success'})
                            .then(()=>{
                                window.location.href='/evaluation_liste'
                            })
                        }else if(response.data.msg404){
                          this.$swal(response.data.msg404,{icon:'error'})
                        }
                    })
              }
            },
            Supprimer(idEvalua){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer cette evaluation ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                            const data={idEvalua:idEvalua}
                            HTTP.post('/evaluation/supprimer',data)
                            .then((response)=>{
                                if(response.data.msg200){
                                    this.$swal(response.data.msg200,{icon:'success'})
                                    .then(()=>{
                                      window.location.href='/evaluation_liste'
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

