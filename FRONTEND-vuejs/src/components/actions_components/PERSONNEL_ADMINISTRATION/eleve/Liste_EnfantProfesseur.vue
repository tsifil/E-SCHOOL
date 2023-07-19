<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card" >
                  <div class="card-body">
            <div class="table-responsive">
                <br><br>
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Matricule</th>
                            <th>Nom et prénoms(s) d'élève</th>
                            <th>Parent(professeur)</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in listeEnfantProf" :key="l.numMatricule">
                                <td>{{(l.sexe=='Masculin')?l.numMatricule+'G':l.numMatricule+'F'}}</td>
                                <td>{{ l.nom }}</td>
                                <td>{{ l.nomParent }}</td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
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
    export default{
        components:{NavHaut,NavGauche},
        async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
        data(){
            return{
                listeEnfantProf:[],
            }
        },
        methods:{
            Liste(){
                HTTP.get('/listeEnfantProfesseur')
                .then((response)=>{
                    this.listeEnfantProf = response.data
                })
            }
        },
        mounted(){
            this.Liste()
        }
    }
</script>

<style>
#img{
    height: 30px;
    width: 20%
}
</style>