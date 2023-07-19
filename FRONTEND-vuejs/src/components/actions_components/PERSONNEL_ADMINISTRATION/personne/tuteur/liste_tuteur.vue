<template>
    <div class="container-scroller">  
      <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">
  
            <!-- AJOUTER TRIMESTRE -->
            <vs-button :to="{name:'NouveauTuteur'}" color='primary' type='gradient'>
                <i class="ti-plus"></i>
                Création
            </vs-button>
            <br>
            <br>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Tuteur</h4>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>IDENTIFIANT</th>
                            <th>NOM ET PRENOM(S)</th>
                            <th>PROFESSION</th>
                            <th>SEXE</th>
                            <th>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in liste" :key="l.idPers">
                                <td>{{ l.idPers }}</td>
                                <td>{{ l.nomPrenom }}</td>
                                <td>{{ l.profession }}</td>
                                <td>{{ l.sexe }}</td>
                                <td>                                  
                                    <!--router-link :to="{name:'DetailTuteur',params:{idPers:l.idPers}}" class="btn btn-info btn-sm">Voir detail</router-link>
                                    <button @click="Supprimer(l.idPers)" class="btn btn-danger btn-sm">Supprimer</button-->
                                    <vs-button :to="{name:'DetailTuteur',params:{idPers:l.idPers}}" color="teal">Voir detail</vs-button>
                                    <vs-button @click="Supprimer(l.idPers)" color='red'>Supprimer</vs-button>
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
import {HTTP} from '../../../../../http-constants'
import NavHaut from '../../../includes/Menu_haut.vue'
import NavGauche from '../../../includes/Menu_gauche.vue'

    export default{
        components:{NavGauche,NavHaut},
         data(){
            return{
                liste:[]
            }
         },
         methods:{
            Liste(){
                HTTP.get('/liste/tuteur').then((response)=>{
                     this.liste = response.data
                })
            },
            Supprimer(idPers){
              this.$swal({
                    icon:'warning',
                    text:"Voulez-vous supprimer cet enregistrement.",
                    dangerMode: true,
                    buttons:{
                        cancel:{
                            text:"Non",
                            value:false,
                            visible:true,
                            closeModal:true,
                            className:""
                        },
                        confirm:{
                            text:"Oui",
                            value:true,
                            visible:true,
                            closeModal:true,
                            className:""

                        }
                      }
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/tuteur/supprimer/tuteur/${idPers}`)
                            .then((response)=>{
                                console.log(response)
                                this.$swal("La suppression a effectuée avec succès.",
                                {icon:'success'}).then(()=>{
                                    window.location.href = '/liste_tuteur'
                                })
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
  
