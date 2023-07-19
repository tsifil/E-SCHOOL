<template>
   
    <div class="container-scroller">

        <NavHaut/>
  
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
            
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card">
                  <div class="card-body">
                    <!--h4 class="card-title">Ajout d'un note individuelle</h4-->
                    <p class="card-description">
                      Pour ajouter la note d'un élève<code>Veuillez choisir la classe</code>
                    </p>
                    <selection v-model="idClasse" :options="classes" @keyup.enter.prevent="affichage='eleveInd'" :settings="{ width:'40%'}"/>
                    <br>
                    <button @click="EleveInd()" class="btn btn-success">OK</button>
                    <!--input v-model="idClasse"  @keyup.exact="affichage='eleveInd'"/-->
                    <!--select v-model="idClasse" @keyup.exact.prevent="affichage='eleveInd'">
                       <option v-for="c in classes" :key="c.id" :value="c.id"  @keyup.exact="affichage='eleveInd'">{{c.text}}</option>
                    </select-->
                    <div class="table-responsive">
                      <h3>Liste des eleves de la classe de : {{libelleClasse}}</h3>
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>N D'ORDRE</th>
                              <th>NOM</th>
                              <th>PRENOM(S)</th>
                              <th>SEXE</th>
                              <!--th>DATE DE NAISSANCE</th-->
                              <th>MATRICULE</th>
                              <th>CLASSE</th>
                              <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(e,i) in eleves" :key="e.numMatricule">
                                <td>{{i+1}}</td>
                                <td>{{e.nom}}</td>
                                <td>{{e.prenom}}</td>
                                <td>{{e.sexe}}</td>
                                <!--td>{{moment(e.dateNaissance).format("YYYY-MM-DD")}}</td-->
                                <td>{{ (e.sexe=='Masculin') ? e.numMatricule+'G' : e.numMatricule+'F'}}</td>
                                <td>{{e.libelleClasse}}</td>
                                <td><router-link :to="{name:'NouvelleNoteIndividuelle',params:{numMatricule:e.numMatricule,idClasse:e.idClasse}}" class="btn btn-warning btn-sm">Nouvelle Note</router-link></td>
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
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import { HTTP } from '../../../../http-constants';

export default {
  components:{NavGauche,NavHaut},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
  data(){
    return{
      classes:[],
      idClasse:'',
      idAs:this.$store.getters.getAnneeScoProf.idAs,
      eleves:[],
      libelleClasse:'',
      affichage:''
    }
  },
  methods:{
     Classe(){
        HTTP.get('/professeur/listeClasse').then((response)=>{
          this.classes = response.data
        })
     },
     EleveInd(){
        const data = {
          idClasse:this.idClasse,
          idAs:this.idAs
        }
        HTTP.post('/professeur/eleveInd',data).then((response)=>{
            this.eleves = response.data.result
            this.libelleClasse = response.data.classe
        })
     }
  },
  mounted(){
    this.Classe()
  },
  computed:{
    getEleve(){
                if(this.affichage == 'eleveInd'){

                        this.EleveInd()
                        return this.eleves                   
                }else{
                    return '' 
                }
            }
        }
}
</script>