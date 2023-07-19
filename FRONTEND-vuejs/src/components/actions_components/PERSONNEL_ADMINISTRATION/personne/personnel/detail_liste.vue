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
                    <!-- comm -->
            <form @submit.prevent="Modifier(p.statut,p.contact,p.nomPrenom,p.sexe,p.profession,p.situationMatrimoniale,p.adresse,p.email,p.nomUtilisateur,p.motDePasse)" 
               v-for="p in personne" :key="p.idPers">
                <div class="form-group">
                          <label>Identifiant</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model="p.idPers"
                                 readonly/>

                </div>
                    <div class="form-group">
                          <label>Nom et Prénom(s)*</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model="p.nomPrenom"
                                :class="{'is-invalid':$v.nomPrenom.$error,'is-valid':!$v.nomPrenom.$invalid}" 
                                placeholder="votre nom complet"/>
                    </div>
                    <div class="form-group">
                        <label>Genre*</label>
                        <select v-model="p.sexe" class="form-control">
                            <option>Masculin</option>
                            <option>Féminin</option>
                        </select>
                    </div>

                    <div class="form-group">
                            <label>Profession*</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model="p.profession"
                                :class="{'is-invalid':$v.profession.$error,'is-valid':!$v.profession.$invalid}" 
                                placeholder="votre profession"
                            />
                    </div>

                    <div class="form-group">
                          <label>Situation matrimoniale*</label>
                            <select v-model="p.situationMatrimoniale" class="form-control">
                                    <option value="Marié">Marié</option>
                                    <option value="Veuf">Veuf</option>
                                    <option value="Séparé">Séparé</option>
                                    <option value="Divorcé">Divorcé</option>
                                    <option value="Pacté">Pacté</option>
                                    <option value="En concubinage">En concubinage</option>
                            </select>
                    </div>
                       
                    <div class="form-group">
                        <label>Adresse*</label>
                        <input class="form-control" 
                        v-model="p.adresse"
                        :class="{'is-invalid':$v.adresse.$error,'is-valid':!$v.adresse.$invalid}"
                        placeholder="votre adresse actuelle"/>
                    </div>

                    <div class="form-group">
                          <label>Contact *</label>
                          <input type="number" class="form-control" 
                          v-model="p.contact"
                          />
                    </div>

                    <div class="form-group">
                        <label>Êtes-vous professeur chez zazatiana ou pas ? *</label>
                        <select v-model="p.statut" class="form-control">
                            <option value="0">NON</option> 
                            <option value="1">OUI</option> 
                        </select>
                    </div>
                    
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
                    <input type="submit" class="btn btn-info mr-2" value="Enregistrer la modifcation"/>

                  </form>
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
import { required,email/*, minLength, maxLength, between , sameAs , numeric, url*/ } from 'vuelidate/lib/validators'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
            nomPrenom:'',
            sexe:'Masculin',
            profession:'',
            situationMatrimoniale:'Marié',
            adresse:'',
            email:'',
            idPers:this.$route.params.idPers,
            personne:[]
        }
    },
    validations: {
       nomPrenom:{
        required
      },
      profession:{
        required
      },
      adresse:{
        required
      },
      email:{
        email
      }
    },
    methods:{
        Editer(){
            HTTP.get(`/editer/personne/${this.idPers}`).then((response)=>{
                this.personne = response.data
            })
        },
        Modifier(statut,contact,nomPrenom,sexe,profession,situationMatrimoniale,adresse,email/*,nomUtilisateur*/,motDePasse){
                    const data = {  statut:statut,
                                    contact:contact,
                                    nomPrenom:nomPrenom,
                                    sexe:sexe,
                                    profession:profession,
                                    situationMatrimoniale:situationMatrimoniale,
                                    adresse:adresse,
                                    email:email,
                                    //nomUtilisateur:nomUtilisateur,
                                    motDePasse:motDePasse,
                                    idPers:this.idPers
                                }
                    
                            HTTP.post('/modifierPersonne',data).then((response)=>{
                                            
                                        if(response.data.msg404){
                                            this.$swal(response.data.msg404,{icon:'error'})
                                        }else if(response.data.msg200){
                                                this.$swal(response.data.msg200,{icon:'success'})
                                                this.$router.replace({name:'ListeGlobalePersonnel'})
                                        }
                              })
                    /*this.$v.$touch()
                    if(this.$v.$invalid){
                       console.log("Remplir tout")
                    }else{
                }*/
        }
    },
    mounted(){
        this.Editer()
    }
}
</script>

