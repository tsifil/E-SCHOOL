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
                            <th>CONTACT</th>
                            <th>CIN</th>
                            <th>CLASSIFICATION</th>
                            <th>ACTIONS</th>
                            <th>COMPTE</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in pageOfItems" :key="l.idProf">
                                <td>{{ l.idProf }}</td>
                                <td>{{ l.nomPrenom }}</td>
                                <td>{{ l.contact }}</td>
                                <td>{{ l.cin }}</td>
                                <td>{{ l.classification }}</td>
                                <td> 
                                  <button @click="Editer(l.idProf,l.nomPrenom,l.adresse,l.contact,l.cin,l.classification,l.sexe)" data-toggle="modal" data-target="#myModal" class="btn btn-info btn-sm"><i class="ti-eye"></i></button>
                                  <button @click='Supprimer(l.idProf)' class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
      <!-- MODAL -->
      <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body"> 
                            <div class="form-group">
                          <label>Nom et Prénom(s)*</label>
                          <input type="text" class="form-control" v-model="passedData.nomPrenom" placeholder="votre nom complet"/>
                    </div>

                    <div class="form-group">
                      <label>CIN*</label>
                      <input type="number" class="form-control" v-model="passedData.cin" placeholder="votre cin"/>
                    </div>

                    <div class="form-group">
                        <label>Genre*</label>
                        <select v-model="passedData.sexe" class="form-control">
                            <option>Masculin</option>
                            <option>Féminin</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Adresse*</label>
                        <input class="form-control" v-model="passedData.adresse" placeholder="votre adresse actuelle"/>
                    </div>
                    <div class="form-group">
                        <label>Contact *</label>
                        <input type="number" class="form-control" v-model="passedData.contact"/>
                    </div>
                    <div v-if="msg!=''" class="alert alert-danger">
                         {{msg}}
                    </div>
                    <div class="form-group">
                        <label>Classification*</label>
                        <select v-model="passedData.classification" class="form-control">
                            <option value="Titulaire">Titulaire</option>
                            <option value="Vacataire">Vacataire</option>
                        </select>
                    </div>                              
                          <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                          <button class="btn btn-info mr-2"
                            @click="EnrModification(passedData.idProf,passedData.nomPrenom,passedData.adresse,passedData.contact,passedData.cin,passedData.classification,passedData.sexe)">
                              Modifier
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                affichage:'',
                msg:'',
                passedData:{idProf:'',nomPrenom:'',adresse:'',contact:'',cin:'',classification:'',sexe:''}
            }
         },
         methods:{
               onChangePage(page){
                  this.pageOfItems = page
                },
                Editer(idProf,nomPrenom,adresse,contact,cin,classification,sexe){
                    this.passedData={idProf,nomPrenom,adresse,contact,cin,classification,sexe}
                },
                EnrModification(idProf,nomPrenom,adresse,contact,cin,classification,sexe){
                    const data={
                      idProf:idProf,
                      nomPrenom:nomPrenom,
                      adresse:adresse,
                      contact:contact,
                      cin:cin,
                      classification:classification,
                      sexe:sexe
                    }
                    HTTP.post('/modifierProfesseur',data)
                    .then((response)=>{
                      if(response.data.msgDup404){
                          this.msg=response.data.msgDup404
                      }
                      else if(response.data.msg200){
                          this.msg=''
                          this.$swal(response.data.msg200,{icon:'success'})
                          .then(()=>{
                              window.location.href='/liste_prof'
                          })
                       }
                    })
                },
                ListeProf(){
                    HTTP.get('/tableProfesseur').then((response)=>{
                        this.liste = response.data
                        this.affichage=''
                    })
                },
                Rechercher(){
                    var data = {recherche:this.recherche}
                    HTTP.post('/rechercheProfesseur',data)
                    .then((response)=>{
                        this.liste = response.data
                        this.affichage=''
                    })
                },
              Supprimer(idProf){
                  this.$swal({icon:'warning',text:"Voulez-vous supprimer ce professeur ?",dangerMode: true,
                    buttons:{
                        cancel:{text:"Annuler",value:false,visible:true,closeModal:true,className:""},
                        confirm:{text:"Ok",value:true,visible:true,closeModal:true,className:""
                        }
                      }
                    }).then((willDelete)=> {
                        if(willDelete){
                                HTTP.delete(`/professeur/effacer/${idProf}`).then(response=>{
                                    if(response.data.msg200){
                                        this.$swal(response.data.msg200,{icon:"success"})
                                        .then(()=>{
                                            window.location.href = '/liste_prof'
                                        })
                                    }
                            }) 
                        }
                    })
                  }
         },
         mounted(){
            this.ListeProf()
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
  

