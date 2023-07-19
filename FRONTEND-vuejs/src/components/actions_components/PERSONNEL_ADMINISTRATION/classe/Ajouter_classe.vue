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
                  <h4 class="card-title">Enregistrement</h4>
                  <form class="forms-sample" @submit.prevent="valider()">
                    <div class="form-group">
                      <label>Libellé</label>

                        <input type="text" class="form-control" v-model.trim="$v.libelleClasse.$model" :class="{'is-invalid':$v.libelleClasse.$error,'is-valid':!$v.libelleClasse.$invalid}">
                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.libelleClasse.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>
                    </div>

                    <div class="form-group">
                      <label>Niveau</label>
                      <select v-model="idNiv" class="form-control">
                        <option value="" disabled>-- Veuillez choisir le niveau --</option>
                        <option v-for="n in niveau" :key="n.idNiv" :value="n.idNiv">
                            {{n.libelleNiv}}
                        </option>
                      </select>
                    </div>
                    <button type="submit" class="btn btn-info mr-2">Sauvegarder</button>
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
                niveau:[],
                libelleClasse:'',
                idNiv:''
            }
        },
    validations: {
      libelleClasse:{required},
    },
        methods:{
            ListeNiveau(){
                HTTP.get('/listeNiveau').then((response)=>{
                    this.niveau = response.data
                })
            },
            valider(){
              
            this.$v.$touch()

              if(this.$v.$invalid){
                  console.log("Remplir tout")
              }else{
                      const  data={
                          libelleClasse:this.libelleClasse,
                          idNiv:this.idNiv
                      }
                      HTTP.post('/ajouterClasse',data).then((response)=>{
                        if(response.data.msgDup404){
                            this.$swal(response.data.msgDup404,{icon:'error'})
                        }else if(response.data.msg200){
                              this.$router.replace({name:'listeClasse'})
                          }
                      })
                  }
            }
        },
        mounted(){
                this.ListeNiveau()
        }
    }
</script>
