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
          <form @submit.prevent="valider()">
                  <div class="form-group">
                    <label>Niveau de la classe :</label>
                      <selection v-model="idNiv" :options="niveau"/>
                     
                  </div>

                  <div class="form-group">
                    <label>Nom de la matière :</label>
                      <selection v-model="codemat" :options="matiere"/>
                  </div>

                  <div class="form-group">
                    <label>Coefficient de la matière :</label>

                    <input type="number" class="form-control" v-model.trim="$v.coefficient.$model" :class="{'is-invalid':$v.coefficient.$error,'is-valid':!$v.coefficient.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.coefficient.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>

                  </div>

                 <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
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
  import {HTTP} from '../../../../http-constants'
  import NavHaut from '../../includes/Menu_haut.vue'
  import NavGauche from '../../includes/Menu_gauche.vue'
  import { required } from 'vuelidate/lib/validators'

  export default{
       components:{NavHaut,NavGauche},
       async created(){
          if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                this.$router.push('/connecter_personnel_administration')
          }
      },
        data(){
            return{
                idNiv:'',
                codemat:'',
                coefficient:'',
                niveau:[],
                matiere:[]
            }
        },
    validations: {
      coefficient:{required},
    },
        methods:{
            ListeNiveau(){
                    HTTP.get('/professeur/niveau').then((response)=>{
                    this.niveau = response.data.result
                    this.idNiv = response.data.idNiv
              })
            },
            ListeMatiere(){
                HTTP.get('/professeur/matiere').then((response)=>{
                    this.matiere = response.data.result
                    this.codemat = response.data.codemat
                })
          },
            valider(){

              this.$v.$touch()

              if(this.$v.$invalid){
                  console.log("Remplir tout")
              }else{
                      const data = {
                          idNiv:this.idNiv,
                          codemat:this.codemat,
                          coefficient:this.coefficient

                      }
                      HTTP.post('/consulter_coefficientMatiere',data).then((response)=>{
                          console.log(response)
                          if(response.data.msg202){
                              this.msg = response.data.msg202
                              this.$swal(this.msg,{icon:'success'})
                              this.$router.replace({name:'ListeCoefficientMatiere'})
                          }
                      })
              }
          }
        },
        mounted(){
            this.ListeNiveau()
            this.ListeMatiere()
        }
    }
</script>

