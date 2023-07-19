<template>
<body>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
            
              <img id='logo' src="images/zazatiana3.PNG">

              <h6 id='t' class="font-weight-light">Connectez-vous pour continuer.</h6>
              <form class="pt-3" @submit.prevent="login">
                <div class="form-group">
                  <input type="email" 
                      class="form-control form-control-lg" 
                      v-model.trim="$v.nomUtilisateur.$model"  
                      :class="{'is-invalid':$v.nomUtilisateur.$error, 
                        'is-valid':!$v.nomUtilisateur.$invalid}"
                      placeholder="Email">

                        <div class="valid-feedback">Votre adresse e-mail est valide !!!</div>

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
                    v-model.trim="$v.motDePasse.$model"
                    :class="{'is-invalid':$v.motDePasse.$error, 
                    'is-valid':!$v.motDePasse.$invalid}"
                  >
                  <div class="valid-feedback">Le mot de passe est valide !!!</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.motDePasse.required">
                        Veuillez remplir ce champ obligatoire.
                      </span>        
                  </div>


                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                   
                  </div>
                  <br>
                  <label  class="auth-link text-black">
                  <input type="checkbox" id="showpassword" class="form-check-input"
                   @click="toggleShowPassword"
                   v-model="showpassword"/> Afficher le mot de passe</label>
                </div>

                <div class="alert alert-danger" v-if="msg!=''">
                      {{msg}}
                </div>
                
                <br>
                <div class="mt-3">
                  <vs-button @click="login()" color="primary" type="gradient" class="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn">SE CONNECTER</vs-button>
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
import AuthService from '@/services/AuthPersonnel_AdministrationService.js';
import { required,email} from 'vuelidate/lib/validators'
export default {
  data(){
    return {
      nomUtilisateur: '',
      motDePasse: '',
      msg: '',
      showpassword:''
    };
  },
  validations:{
    nomUtilisateur:{
      required,
      email
    },
    motDePasse:{
      required 
    }
  },
  async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
             return this.$router
      }else{
             this.$router.replace({name:'dashboard_administrateur'})
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
      async login(){

        this.$v.$touch()
        if(this.$v.$invalid){
            console.log("Erreur")
        }else{ 
          try{
              const credentials = {
                  nomUtilisateur: this.nomUtilisateur,
                  motDePasse: this.motDePasse
              };
              const response = await AuthService.login(credentials);
              this.msg = response.msg
              const token = response.token
              const user = response.user
              this.$store.dispatch('login',{token,user});
              this.$router.push({name:'anneeAdmin'})
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