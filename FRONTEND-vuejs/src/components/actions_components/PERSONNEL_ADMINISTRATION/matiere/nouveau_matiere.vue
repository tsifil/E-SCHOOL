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
                  <h4 class="card-title">Matière</h4>
                  <form class="forms-sample" @submit.prevent="valider()">
                    <div class="form-group">
                      <label>Libellé</label>
                      <input type="text" class="form-control" v-model.trim="$v.libelle.$model" :class="{'is-invalid':$v.libelle.$error,'is-valid':!$v.libelle.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.libelle.required">Veuillez remplir ce champ obligatoire.</span> 
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
                libelle:'',
                msg:''
            }
        },
        validations: {
      libelle:{required},
    },
        methods:{

            valider(){
           
           this.$v.$touch()

              if(this.$v.$invalid){
                  console.log("Remplir tout")
              }else{
                      const data = {libelle:this.libelle}
                      HTTP.post('/ajouterMatiere',data).then((response)=>{
                        if(response.data.msgDup404){
                          this.$swal(response.data.msgDup404,{icon:'error'})
                        }else if(response.data.msg202){
                              this.msg = response.data.msg202
                              this.$swal(this.msg,{icon:'success'})
                              this.$router.replace({name:'ListeMatiere'})
                          }
                      })
              }
          }
           
        }
    }
</script>
