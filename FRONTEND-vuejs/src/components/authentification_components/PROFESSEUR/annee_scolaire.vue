<template>
    <body>
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth px-0">
            <div class="row w-100 mx-0">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div class="brand-logo">
                    <!--img src="images/logo.svg" alt="logo"-->
                    <h3>ANNEE SCOLAIRE</h3>
                  </div>
                  <!--h4>Hello! let's get started</h4-->
                  <h6 class="font-weight-light">Veuillez choisir l'année scolaire*</h6>
                  <form class="pt-3" @submit.prevent="valider">
                     
                    <div class="form-group">
                      <selection v-model="idAs" :options="anneeSco"/> 
                    </div>

                    <br>
                   
                    <input type="submit" class="btn btn-success mr-2" value="Valider"/>
                    <input type="button" @click="Quitter()" class="btn btn-danger mr-2" value="Quitter"/>

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
    import {HTTP} from '../../../http-constants'
    import AuthService from '@/services/AuthProfesseur_Service.js';
    export default{
        data(){
            return{
                anneeSco:[],
                idAs:'',
                msg:''
            }
        },
        methods:{
            Quitter(){
                this.$router.push('/')
            },
            getAnnee(){
                HTTP.get('/liste_anneeScolaireChoix').then((response)=>{
                    this.anneeSco = response.data.result
                    this.idAs = response.data.idAs
                })
            },
            async valider(){
                try{
                        const credentials = {
                            idAs: this.idAs
                        };
                        const response = await AuthService.choixAnneeProf(credentials);
                        const tokenAnneeProf = response.tokenAnneeProf
                        const profAnnee = response.profAnnee
                        this.$store.dispatch('anneeScoProf',{tokenAnneeProf,profAnnee});
                        this.$router.replace({name:'DasboardProf'})
    
              }catch(error){
                    this.msg = error.response.data.msg
              }
            }
        },
        mounted(){
            this.getAnnee()
        }
    }
    
</script>