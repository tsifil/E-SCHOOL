<template>
   
    <div class="container-scroller">
  
      <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
      
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
              <div class="row">
                      
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Niveau</h4>
                  <form class="forms-sample" @submit.prevent="Ajouter()">
                    <div class="form-group">
                      <label>Libellé</label>
                      <input type="text" class="form-control" v-model.trim="$v.libelleNiv.$model" :class="{'is-invalid':$v.libelleNiv.$error,'is-valid':!$v.libelleNiv.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.libelleNiv.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>
                    </div>
                   
                    <button type="submit" class="btn btn-success mr-2">Ajouter</button>
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Annuler</a>

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
        data(){
            return{
                libelleNiv:''
            }
        },
        validations: {
      libelleNiv:{required},
    },
        methods:{

            Ajouter(){

              this.$v.$touch()

              if(this.$v.$invalid){
                  console.log("Remplir tout")
              }else{
                      const data = {
                          libelleNiv: this.libelleNiv
                      }

                      HTTP.post('/ajouterNiveau',data).then((response)=>{
                          if(response.data.msgDup404){
                            this.$swal(response.data.msgDup404,{icon:'error'})
                          }else if(response.data.msg202){
                              this.$swal(response.data.msg202,{icon:'success'})
                              this.$router.replace({name:'Niveau'})
                          }
                      })
                }

            }
           
        }
    }
</script>
