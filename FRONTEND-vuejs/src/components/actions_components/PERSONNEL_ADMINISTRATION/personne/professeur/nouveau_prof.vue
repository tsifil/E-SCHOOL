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
                          <label>Nom et Prénom(s)*</label>
                            <input 
                                 type="text" 
                                 class="form-control" 
                                 v-model.trim="$v.nomPrenom.$model"
                                :class="{'is-invalid':$v.nomPrenom.$error,'is-valid':!$v.nomPrenom.$invalid}" 
                                placeholder="votre nom complet"/>
                            <div class="valid-feedback">Vos nom complet est valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.nomPrenom.required">Veuillez remplir ce champ obligatoire</span> 
                            </div>
                    </div>
                    <div class="alert alert-danger" v-if="msg!=''">
                         {{msg}}
                    </div>
                    <div class="form-group">
                          <label>CIN*</label>
                            <input 
                                 type="number" 
                                 class="form-control" 
                                 v-model.trim="$v.cin.$model"
                                :class="{'is-invalid':$v.cin.$error,'is-valid':!$v.cin.$invalid}" 
                                placeholder="votre cin"/>
                            <div class="valid-feedback">Vos CIN est valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.cin.required">Veuillez remplir ce champ obligatoire</span> 
                                <span v-if="!$v.cin.minLength">Le numéro CIN doit comporter au moins {{ $v.cin.$params.minLength.min }} chiffres</span> 
                                <span v-if="!$v.cin.maxLength">Le numéro CIN doit avoir au maximum {{ $v.cin.$params.maxLength.max }} chiffres</span> 
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
                        <label>Adresse*</label>
                        <input class="form-control" 
                        v-model.trim="$v.adresse.$model"
                        :class="{'is-invalid':$v.adresse.$error,'is-valid':!$v.adresse.$invalid}"
                        placeholder="votre adresse actuelle"/>
                        
                        <div class="valid-feedback">L'adresse est valide !!!</div>
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
                        <label>Classification*</label>
                        <select v-model="classification" class="form-control">
                            <option value="Titulaire">Titulaire</option>
                            <option value="Vacataire">Vacataire</option>
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
import { required, minLength,maxLength} from 'vuelidate/lib/validators'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
            nomPrenom:'',
            sexe:'Masculin',           
            adresse:'',
            contact:'',
            classification:'Titulaire',
            cin:'',
            msg:''
        }
    },
    validations: {
       nomPrenom:{
        required
      },
      adresse:{
        required
      },
      cin:{
        required,
        minLength: minLength(12),
        maxLength: maxLength(12)
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
                                    adresse:this.adresse,
                                    contact:this.contact,
                                    cin:this.cin,
                                    classification:this.classification
                                }
                                HTTP.post('/ajouterProfesseur',data).then((response)=>{
                                        if(response.data.msgDup404){
                                            this.msg=response.data.msgDup404
                                        }else if(response.data.msg200){
                                                this.msg=''
                                                this.$swal(response.data.msg200,{icon:'success'})
                                                .then(()=>{
                                                  this.$router.replace({name:'ListeProf'})
                                                })
                                        }
                                })
                    }
           
        },
        Reinitialiser(){
            this.nomPrenom=''
            this.adresse=''
            this.contact=''
            this.cin=''
        }
    }
}
</script>

