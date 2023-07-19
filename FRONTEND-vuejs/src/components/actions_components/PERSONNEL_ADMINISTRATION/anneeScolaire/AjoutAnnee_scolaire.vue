<template>
   
    <div class="container-scroller">
  
      <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
            <!-- AJOUTER ANNEE SCOLAIRE-->
           
            <div class="row">
                  
          <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <form class="forms-sample" @submit.prevent="Ajouter()">
                    <div class="form-group">
                      <label>Libellé</label>
                      <input type="text" class="form-control" v-model.trim="$v.libelle.$model"
                        :class="{'is-invalid':$v.libelle.$error,'is-valid':!$v.libelle.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.libelle.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>

                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Date de début</label>
                     
                      <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="dateDebut"
                            min-date="1000-12-12"/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Date de fin</label>
                      <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="dateFin"
                            min-date="1000-12-12"/>
                     
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Valider</button>
                    <a @click="$router.go(-1)" class="btn btn-light">Retour</a>
                  </form>
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
                dateDebut:new Date(),
                libelle:'',
                dateFin:new Date(),
                locale: {
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], 
            },
                    }
        },
    validations: {
      libelle:{required},
    },
        methods:{
            Ajouter(){

              this.$v.$touch()
                          if(this.$v.$invalid){
                            console.log("Remplir tout")
                          }else{
                              const data = {
                                  libelle:this.libelle,
                                  dateDebut:this.dateDebut,
                                  dateFin:this.dateFin
                              }

                              HTTP.post('/nouveau_anneeScolaire',data).then((response)=>{
                                  if(response.data.msgDup404){
                                      this.$swal(response.data.msgDup404,{icon:'error'})
                                  }else if(response.data.msg200){
                                      this.$router.replace({ name:"anneeScolaireListe"})  
                                      this.$swal(response.data.msg200,{icon:'success'}) 
                                  }
                              })
                  }
            }
        }
    }
</script>