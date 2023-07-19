<template>
    <div class="container-scroller">
        <NavHaut/>

        <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
            
            <div class="row">
                <div class="col-md-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">

                    <h4 class="card-title"></h4>
                    <p class="card-description">
                        Identifiant:<code>{{idPers}}</code> 
                        {{tuteur}}
                    </p>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>#</th>
                              <th>Matricule</th>
                              <th>Eleve</th>
                              <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,i) in liste" :key="l.idTuteur">
                                <td>{{i+1}}</td>
                                <td>{{(l.sexe == "Masculin") ? l.numMatricule+'G' : l.numMatricule+'F'}}</td>
                                <td>{{l.eleve}}</td>
                                <td>
                                    <button @click="Supprimer(l.idTuteur)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
      </div>
    </div>
  </template>

<script>
import {HTTP} from '../../../../../http-constants'
import NavHaut from '../../../includes/Menu_haut.vue'
import NavGauche from '../../../includes/Menu_gauche.vue'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
            tuteur:'',
            liste:[],
            sexe:'Masculin',
            profession:'',
            situationMatrimoniale:'Marié',
            adresse:'',
            email:'',
            idPers:this.$route.params.idPers,
            personne:[]
        }
    },
    methods:{
        Data(){
            HTTP.get(`/tuteur/eleve/${this.idPers}`).then((response)=>{
                this.tuteur = response.data.tuteur
                this.liste = response.data.result 
            })
        },
        Supprimer(idTuteur){
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
                           
                          HTTP.delete(`/tuteur/supprimer/eleve/${idTuteur}`)
                            .then((response)=>{
                                console.log(response)
                                this.$swal("La suppression a effectuée avec succès.",
                                {icon:'success'}).then(()=>{
                                    window.location.href = '/liste_tuteur'
                                })
                            })
                                
                        }
                    })

            /**/
        }

        /*Editer(){
            HTTP.get(`/detailTuteur/${this.idPers}`).then((response)=>{
                this.personne = response.data
            })
        },*/
        /*Modifier(nomPrenom,sexe,profession,situationMatrimoniale,adresse,email,nomUtilisateur,motDePasse){
                    const data = {
                                    nomPrenom:nomPrenom,
                                    sexe:sexe,
                                    profession:profession,
                                    situationMatrimoniale:situationMatrimoniale,
                                    adresse:adresse,
                                    email:email,
                                    nomUtilisateur:nomUtilisateur,
                                    motDePasse:motDePasse,
                                    idPers:this.idPers
                                }
                    
                            HTTP.post('/modifierPersonne',data).then((response)=>{
                                            
                                        if(response.data.msg404){
                                            this.$swal(response.data.msg404,{icon:'error'})
                                        }else if(response.data.msg200){
                                                this.$swal(response.data.msg200,{icon:'success'})
                                                this.$router.replace({name:'ListeTuteur'})
                                        }
                              })
                   
        }*/
    },
    mounted(){
        this.Data()
    }
}
</script>

