<template>
    <div class="container-scroller">
        <NavHaut/>  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
          
            <router-link class="btn btn-info btn-icon-text" :to="{name:'AjouterNiveau'}">
                <i class="ti-plus"></i>
                Création  niveau
            </router-link>
            <br><br>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <!--h4 class="card-title">Liste de Niveau</h4-->
                    <!--p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>LIBELLE</th>
                              <th>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,i) in liste" :key="l.idNiv">
                                <td>{{i+1}}</td>
                                <td>{{l.libelleNiv}}</td>
                                <td>
                                  <button @click="Edit(l.idNiv,l.libelleNiv)" data-toggle="modal" data-target="#myModal" class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                  <button @click="Supprimer(l.idNiv)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
                                </td>
                          </tr>
                        </tbody>
                      </table>
                  
                  <!-- MODAL -->
                  <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br>
                              <label>Libellé :</label>
                              <br>
                              <input type="text" class="form-control"  
                               v-model="passedData.libelle">
                              <br><br>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                              @click="Modifier(passedData.idNiv,passedData.libelle)">Modifier
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                passedData:{idNiv:null,libelle:''},
            }
         },
         methods:{
            Liste(){
                HTTP.get('/listeNiveau').then((response)=>{
                     this.liste = response.data
                })
            },
            Edit(idNiv,libelle){
              this.passedData={idNiv,libelle}
            },
            Modifier(idNiv,libelle){
                const data={
                  idNiv:idNiv,
                  libelle:libelle
                }
                HTTP.post('/modifierNiveau',data).then((response)=>{
                    if(response.data.msg200){
                       this.$swal(response.data.msg200,{icon:'success'}).then(()=>{
                            window.location.href = '/niveau'
                       })
                    }
                })
            },
            Supprimer(idNiv){
                
                this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                            const data={idNiv:idNiv}
                            HTTP.post('/supprimerNiveau',data)
                            .then((response)=>{
                                if(response.data.msg200){
                                    this.$swal(response.data.msg200,{icon:'success'}).then(()=>{
                                        window.location.href = '/niveau'
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
  