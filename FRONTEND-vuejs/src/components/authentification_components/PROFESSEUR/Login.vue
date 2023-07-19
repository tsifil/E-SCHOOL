<template>
    <body>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <img id='logo' src="images/zazatiana3.PNG">
                  <h6 class="font-weight-light" id="t">
                    Connectez-vous pour continuer.
                  </h6>
                  <form class="pt-3" @submit.prevent="loginProf">
                    <div class="form-group">
                        <input type="text" 
                            class="form-control form-control-lg" 
                            v-model.trim="$v.utilisateur.$model"  
                            :class="{'is-invalid':$v.utilisateur.$error, 
                                'is-valid':!$v.utilisateur.$invalid}"
                            placeholder="Identifiant ou email"
                        />
                        <div class="valid-feedback">Ce champ valide !!!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.utilisateur.required">
                                    Veuillez remplir ce champ obligatoire.
                                </span>        
                        </div>

                    <div class="invalid-feedback">
                              <span v-if="!$v.utilisateur.email">
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
                        v-model.trim="$v.motDePasse.$model"
                        :class="{'is-invalid':$v.motDePasse.$error, 
                        'is-valid':!$v.motDePasse.$invalid}"
                      >
                      <div class="valid-feedback">Ce champ est valide !!!</div>
                      <div class="invalid-feedback">
                          <span v-if="!$v.motDePasse.required">
                            Veuillez remplir ce champ obligatoire.
                          </span>        
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
                      <!--input type='submit' class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn" value='Se connecter'/-->
                      <vs-button @click="loginProf()" color="primary" type="gradient" class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn">SE CONNECTER</vs-button>
                    </div>
                  
                    
                    <br><br>
                    <div class="text-center mt-4 font-weight-light">
                      Vous n’avez pas de compte ?  <router-link class="text-primary" :to="{name:'CreationCompteProf'}">Créer</router-link>
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
import { required,email} from 'vuelidate/lib/validators'

export default {
  data(){
    return {
      utilisateur: '',
      motDePasse: '',
      msg: '',
      showpassword:''
    };
  },
  validations:{
    utilisateur:{
        required,
        email
    },
    motDePasse:{
        required
    }
  },
  async created(){
      if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
             return this.$router
      }else{
             this.$router.replace({name:'DasboardProf'})
      }
  },
  methods:{
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
    async loginProf(){
        
        this.$v.$touch()
        if(this.$v.$invalid){
            console.log("Erreur")
        }else{
          try{
              const credentials = {
                  utilisateur: this.utilisateur,
                  motDePasse: this.motDePasse
              };
              const response = await AuthService.loginProf(credentials);
              this.msg = response.msg

              const tokenProf = response.tokenProf
              const prof = response.prof

              this.$store.dispatch('loginProf',{tokenProf,prof});
              //this.$router.push('/dashboard_administrateur')
              this.$router.replace({name:'AnneeScolaireProf'})
              
          }catch(error){
              this.msg = error.response.data.msg
          }
      }
  }
 }
}
</script>

<style scoped>
#t{
  margin-left:50px;
}
#logo{
  margin-left:70px;
  width:45%;
  height:55%;
}
</style>
