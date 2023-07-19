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
                  <h4 class="card-title">Editer</h4>
                  <form class="forms-sample" @submit.prevent="valider()">
                    <div class="form-group">
                      <label>Libellé</label>
                      <input type="text" class="form-control" v-model="libelleClasse">
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
  
  export default{
       components:{NavHaut,NavGauche},
       async created(){
          if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                this.$router.push('/connecter_personnel_administration')
          }
      },
        data(){
            return{
                idClasse:this.$route.params.idClasse,
                niveau:[],
                libelleClasse:this.$route.params.libelle,
                idNiv:this.$route.params.idNiv
            }
        },
        methods:{
            ListeNiveau(){
                HTTP.get('/listeNiveau').then((response)=>{
                    this.niveau = response.data
                })
            },
            valider(){
                const  data={
                    idClasse:this.idClasse,
                    libelleClasse:this.libelleClasse,
                    idNiv:this.idNiv
                }
                HTTP.post('/modifierClasse',data).then((response)=>{
                  if(response.data.msgDup404){
                    this.$swal(response.data.msgDup404,{icon:'error'})
                  }
                   else if(response.data.msg200){
                       this.$swal(response.data.msg200,{icon:'success'})
                       this.$router.replace({name:'listeClasse'})
                    }
                })
            }
        },
        mounted(){
                this.ListeNiveau()
        }
    }
</script>
