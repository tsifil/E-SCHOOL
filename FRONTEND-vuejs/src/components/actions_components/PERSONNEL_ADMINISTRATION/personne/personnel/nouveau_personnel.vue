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
            <form @submit.prevent="Ajouter()">
                    <div class="form-group">
                          <label>Nom et prénom(s)*</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model.trim="$v.nomPrenom.$model"
                                :class="{'is-invalid':$v.nomPrenom.$error,'is-valid':!$v.nomPrenom.$invalid}" 
                                placeholder="votre nom complet"/>
                            <div class="valid-feedback">Votre nom et prénom est valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.nomPrenom.required">Veuillez remplir ce champ obligatoire</span> 
                            </div>
                    </div>

                    <div class="form-group">
                        <label>Genre*</label>
                        <select v-model="sexe" class="form-control">
                            <option>Masculin</option>
                            <option>Féminin</option>
                        </select>
                    </div>

                    <div class="form-group">
                            <label>Profession*</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model.trim="$v.profession.$model"
                                :class="{'is-invalid':$v.profession.$error,'is-valid':!$v.profession.$invalid}" 
                                placeholder="votre profession"
                            />
                            <div class="valid-feedback">Votre profession est valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.profession.required">Veuillez remplir ce champ obligatoire</span> 
                            </div>
                    </div>
                    <div class="form-group">
                          <label>Situation matrimoniale*</label>
                            <select v-model="situationMatrimoniale" class="form-control">
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
                        v-model.trim="$v.adresse.$model"
                        :class="{'is-invalid':$v.adresse.$error,'is-valid':!$v.adresse.$invalid}"
                        placeholder="votre adresse actuelle"/>
                        <div class="valid-feedback">Votre adresse est valide !!!</div>
                        <div class="invalid-feedback">
                                <span v-if="!$v.adresse.required">Veuillez remplir ce champ obligatoire</span> 
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Contact *</label>
                        <input type="number" 
                        class="form-control" 
                        v-model.trim="$v.contact.$model"
                        :class="{'is-invalid':$v.contact.$error, 'is-valid':!$v.contact.$invalid}"
                        />

                        <div class="valid-feedback">Votre numéro téléphone est valide !!!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.contact.required">Veuillez remplir ce champ obligatoire</span> 
                            <span v-if="!$v.contact.minLength">Le numéro téléphone doit comporter au moins {{ $v.contact.$params.minLength.min }} chiffres</span> 
                            <span v-if="!$v.contact.maxLength">Le numéro téléphone doit avoir au maximum {{ $v.contact.$params.maxLength.max }} chiffres</span> 
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Êtes-vous professeur chez zazatiana ou pas ? *</label>
                        <select v-model="statut" class="form-control">
                            <option value="0">NON</option> 
                            <option value="1">OUI</option> 
                        </select>
                    </div>

                    
                    <input type="button" @click="Reinitialiser()" class="btn btn-danger mr-2" value="Réinitialiser"/>
                    <input type="submit" class="btn btn-success mr-2" value="Enregistrer"/>

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
import { required,email,minLength,maxLength} from 'vuelidate/lib/validators'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
            statut:"0",
            nomPrenom:'',
            sexe:'Masculin',
            profession:'',
            situationMatrimoniale:'Marié',
            adresse:'',
            email:'',
            contact:''
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
      },
      contact:{
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      }
    },
    methods:{
        Ajouter(){
                    this.$v.$touch()
                    if(this.$v.$invalid){
                       console.log("Remplir tout")
                    }else{
                                const data = {
                                    nomPrenom:this.nomPrenom,
                                    sexe:this.sexe,
                                    profession:this.profession,
                                    situationMatrimoniale:this.situationMatrimoniale,
                                    adresse:this.adresse,
                                    contact:this.contact,
                                    statut:this.statut
                                }

                                HTTP.post('/ajouterPersonne',data).then((response)=>{
                                        if(response.data.msg404){
                                            this.$swal(response.data.msg404,{icon:'error'})
                                        }else if(response.data.msg200){
                                                this.$swal(response.data.msg200,{icon:'success'})
                                                this.$router.replace({name:'ListeGlobalePersonnel'})
                                        }
                                })
                    }
        },
        Reinitialiser(){
            this.nomPrenom=''
            this.profession=''
            this.adresse=''
            this.contact=''
        }
    }
}
</script>

