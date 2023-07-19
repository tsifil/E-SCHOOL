<template>
    <body>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <img id='logo' src="images/zazatiana3.PNG">
                  <form class="pt-3" @submit.prevent="valider()">
                    <div class="form-group">
                        <input type="number" 
                            class="form-control form-control-lg" 
                            v-model.trim="$v.id.$model"  
                            :class="{'is-invalid':$v.id.$error, 
                                'is-valid':!$v.id.$invalid}"
                            placeholder="Votre identifiant"
                        />
                        <div class="valid-feedback">Ce champ valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.id.required">
                                    Veuillez remplir ce champ obligatoire.
                                </span>        
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="text" 
                            class="form-control form-control-lg" 
                            v-model.trim="$v.nomPrenom.$model"  
                            :class="{'is-invalid':$v.nomPrenom.$error, 
                                'is-valid':!$v.nomPrenom.$invalid}"
                            placeholder="Votre nom"
                        />
                        <div class="valid-feedback">Ce champ valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.nomPrenom.required">
                                    Veuillez remplir ce champ obligatoire.
                                </span>        
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="email" 
                            class="form-control form-control-lg" 
                            v-model.trim="$v.nomUtilisateur.$model"  
                            :class="{'is-invalid':$v.nomUtilisateur.$error, 
                                'is-valid':!$v.nomUtilisateur.$invalid}"
                            placeholder="Votre email"
                        />
    
                        <div class="valid-feedback">Ce champ valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.nomUtilisateur.required">
                                    Veuillez remplir ce champ obligatoire.
                                </span>        
                        </div>


                     <div class="invalid-feedback">
                              <span v-if="!$v.nomUtilisateur.email">
                                  Veuillez remplir ce champ correctement.
                              </span>        
                      </div>

                    </div>

                    <div class="form-group">
                      <input 
                        type="password" 
                        id="password"
                        class="form-control form-control-lg" 
                        placeholder="Mot de passe"
                        v-model.trim="$v.motDepasse.$model"
                        :class="{'is-invalid':$v.motDepasse.$error, 
                        'is-valid':!$v.motDepasse.$invalid}"
                      >
                      <div class="valid-feedback">Ce champ est valide !!!</div>
                      <div class="invalid-feedback">
                          <span v-if="!$v.motDepasse.required">Veuillez remplir ce champ obligatoire.</span>
                          <span v-if="!$v.motDepasse.minLength">{{$v.motDepasse.$params.minLength.min}}caractères minium</span>         
                      </div>
                    </div>
                   
                    <div class="form-group">
                      <input 
                        type="password" 
                        class="form-control form-control-lg" 
                        placeholder="Retapez vos mot de passe"
                        v-model.trim="$v.retape_motDepasse.$model"
                        :class="{'is-invalid':$v.retape_motDepasse.$error, 
                        'is-valid': (motDepasse != '') ? !$v.retape_motDepasse.$invalid : ''}"
                      >
                      <div class="valid-feedback">Votre mot de passe est identique !!!</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.retape_motDepasse.sameAsPassword">Les mots de passe doivent être identiques.</span> 
                    </div>
                </div>

                    <div class="my-2 d-flex justify-content-between align-items-center">
                        <div class="form-check"></div>
                      <label  class="auth-link text-black">
                      <input type="checkbox" id="showpassword" class="form-check-input"
                       @click="toggleShowPassword"
                       v-model="showpassword"/> Afficher le mot de passe</label>
                    </div>
    
                    <div class="alert alert-danger" v-if="msg!=''">
                          {{msg}}
                    </div>
    
                    <div class="mt-3">
                      <input type='submit' class="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn" value='Se connecter'/>
                    </div>
    
                    <div class="text-center mt-4 font-weight-light">
                        Vous avez déjà un compte ? <router-link class="text-primary" :to="{name:'connecter_professeur'}">Connectez-vous</router-link>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
      </div>
    </body>
    </template>
<script>

import AuthService from '@/services/AuthProfesseur_Service.js';
import { required,sameAs,minLength,email } from 'vuelidate/lib/validators'

export default {
    data(){
        return{
            id:'',
            nomPrenom:'',
            nomUtilisateur:'',
            email:'',
            motDepasse:'',
            retape_motDepasse:'',
            msg:'',
            showpassword:''
        }
    },
    validations:{
        id:{
            required
        },
        nomPrenom:{
            required
        },
        nomUtilisateur:{
            required,
            email
        },
        motDepasse:{
            required,
            minLength: minLength(8)

        },
        retape_motDepasse:{
            sameAsPassword: sameAs('motDepasse')
        }
    },
    methods: {
    async valider(){
        this.$v.$touch()
        if(this.$v.$invalid){
            console.log("Erreur")
        }else{
            try {
                const credentials = {
                id: this.id,
                nomPrenom: this.nomPrenom,
                email:this.nomUtilisateur,
                motDepasse: this.motDepasse
                };
                const response = await AuthService.creationcompteProf(credentials);
                this.msg = response.msg;

                this.$router.push("/connecter_professeur")

            } catch (error){
                this.msg = error.response.data.msg;
            }
    }
    },
    toggleShowPassword() {
        var show = document.getElementById('password')
        if(this.showpassword == false){
          this.showpassword = true
          show.type = 'text'
        }else{
           this.showpassword = false
           show.type = 'password'
        }
     },
  }
    
}
</script>
<style scoped>
#logo{
    margin-left:70px;
    width:45%;
    height:55%;
}
</style>
