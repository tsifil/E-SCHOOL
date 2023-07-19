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

                <form @submit.prevent="Ajouter()">

                    <div class="form-group">
                          <label>Nom d'élève*</label>
                            
                          <selection v-model="numMatricule" :options="enfant" :settings="{ width:'100%' }"/>
                    </div>

                    <div class="form-group">
                          <label>Nom du tuteur*</label>
                            
                          <selection v-model="idPers" :options="personne" :settings="{ width:'100%' }"/>

                    </div>
                    <h5 style="color:red;">{{mes}}</h5>
                    <br>
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
import {HTTP} from '../../../../../http-constants'
import NavHaut from '../../../includes/Menu_haut.vue'
import NavGauche from '../../../includes/Menu_gauche.vue'

export default{
    components:{NavHaut,NavGauche},
    data(){
        return{
          idAs:this.$store.getters.getUserAnnee.idAs,
          enfant:[],
          personne:[],
          numMatricule:'',
          idPers:'',
          mes:''
        }
    },
    methods:{
        Enfant(){
           HTTP.get(`/enfant/${this.idAs}`).then((response)=>{
              this.enfant = response.data
           })
        },
        Personne(){
           HTTP.get('/personne').then((response)=>{
              this.personne = response.data
           })
        },
        Ajouter(){
          if(this.numMatricule=='' || this.idPers==''){
              this.mes="Veuillez selectionnez le tuteur ou l'élève"
          }
          else{
                    const data = {
                    numMatricule:this.numMatricule,
                    idPers:this.idPers
                  }
                  HTTP.post('/ajouter/tuteur',data).then((response)=>{
                      console.log(response.data)
                      this.$swal('Insertion a réussi.',{icon:'success'})
                      this.$router.push('/liste_tuteur')
                  })
        }

        }
    },
    mounted(){
      this.Enfant()
      this.Personne()
    }
}
</script>

