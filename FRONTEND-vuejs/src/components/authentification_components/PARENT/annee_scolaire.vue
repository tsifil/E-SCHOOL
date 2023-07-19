<!--template>
<div>
    <p>Annee scolaire</p>
    <select v-model="anneeSco">
        <option value="2020-2021">2020-2021</option>
        <option value="2021-2022">2021-2022</option>
    </select>    
    <button @click="valider()">Valider</button>
    {{ msg }}
</div>
</template-->
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
    import AuthService from '@/services/AuthParent_Service.js';
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
                        const credentials = {idAs: this.idAs};
                        const response = await AuthService.choixAnneeParent(credentials);
                        const tokenAnneSco = response.tokenAnneSco
                        const anneeSco = response.anneeSco
                        this.$store.dispatch('anneeScoParent',{tokenAnneSco,anneeSco});
                        this.$router.replace({name:'dashboard_parent'})
    
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
