<template>
    <div class="container-scroller">
      <NavHaut/>
      <div class="container-fluid page-body-wrapper">   
      <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
                    <br><br>
                    <h4 class="card-title">{{matiere}} / {{trimestre}} / Classe : {{classe}} / coefficient : {{coef}}</h4>
                   
                    <div class="table-responsive">
                      <table class="table table-bordered"  bgcolor="WhiteSmoke">
                      <thead>
                        <tr>
                            <th>N° matricule</th>
                            <th>Nom et prénom(s)</th>
                            <th>Rang</th>
                            <th>Moyenne</th>
                            <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!--<div v-for="nd in noteDuplicates.slice(0,1)" :key="nd.noteEX">
                                   {{(nd.noteEX==n.note)?((n.rang==1)?n.rang + ' er' + ' ex':n.rang + ' e' + ' ex') : ((n.rang==1)?n.rang + ' er':n.rang + ' e')}}
                          </div>-->
                          <tr v-for="(n) in notes" :key="n.numMatricule">
                              <td>{{(n.sexe == 'Masculin') ? n.numMatricule+'G' : n.numMatricule+'F'}}</td>
                              <td>{{n.nom}}</td>
                              <!--td>{{(n.rang==1)?n.rang + ' er':n.rang + ' e'}}</td-->
                              <td v-if="noteDuplicates!=''">
                                <div v-for="nd in noteDuplicates.slice(0,1)" :key="nd.noteEX">
                                   {{(nd.noteEX==n.note)?((n.rang==1)?n.rang + ' er' + ' ex':n.rang + ' e' + ' ex') : ((n.rang==1)?n.rang + ' er':n.rang + ' e')}}
                                </div>
                              </td>
                              <td v-else>
                                  {{(n.rang==1)?n.rang + ' er':n.rang + ' e'}}
                              </td>
                              <td bgcolor="yellow">{{(n.moyenne).toFixed(2)}}</td>
                              <td>{{n.note}}</td>
                         </tr>
                         <tr id="couleur" bgcolor="00B0D8">
                              <td colspan="2">Moyenne classes</td>
                              <td colspan="3">{{moyenneMatiere}}</td>
                         </tr>
                         <tr id="couleur" bgcolor="00B0D8">
                              <td colspan="2">Note la plus haute</td>
                              <td colspan="3">{{max}}</td>
                         </tr>
                         <tr id="couleur" bgcolor="00B0D8">
                              <td colspan="2" >Note la plus basse</td>
                              <td colspan="3" >{{min}}</td>
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
        notes:[],
        matiere:[],
        trimestre:[],
        classe:[],
        coef:this.$route.params.coef,
        idTrimestre:this.$route.params.idTrimestre,
        codemat:this.$route.params.codemat,
        idClasse:this.$route.params.idClasse,
        idEvalua:this.$route.params.idEvalua,
        coefficient:[],
        idAs:this.$store.getters.getAnneeScoProf.idAs, 
        moyenneMatiere:'',
        max:'',
        min:'',
        noteDuplicates:[]
    }
   },
 methods:{
   Notes(){
          HTTP.get(`/professeur/afficherNoteEleve/${this.coef}/${this.idTrimestre}/${this.codemat}/${this.idClasse}/${this.idEvalua}/${this.idAs}`).then((response)=>{
              this.notes = response.data.result
              this.matiere = response.data.matiere
              this.trimestre =  response.data.trimestre 
              this.classe = response.data.classe
          })
      },
  MoyenneMatiere(){
        HTTP.get(`/moyenneMatiere/classe/${this.coef}/${this.idClasse}/${this.idEvalua}/${this.idTrimestre}/${this.codemat}/${this.idAs}`)
        .then((response)=>{
           this.moyenneMatiere=(response.data.moyenneMatiere).toFixed(2)
        })
  },
  NotePlusHaut(){
    HTTP.get(`/note/plusHaut/${this.idClasse}/${this.idEvalua}/${this.idTrimestre}/${this.codemat}`)
    .then((response)=>{
      this.max=(response.data.max).toFixed(2)
    })
  },
  NotePlusBasse(){
    HTTP.get(`/note/plusBasse/${this.idClasse}/${this.idEvalua}/${this.idTrimestre}/${this.codemat}`)
    .then((response)=>{
      this.min=(response.data.min).toFixed(2)
    })
  },
  NoteDuplicate(){
    HTTP.get(`/professeur/noteDuplicate/${this.idClasse}/${this.idEvalua}/${this.idTrimestre}/${this.codemat}`)
    .then((response)=>{
          this.noteDuplicates=response.data
    })
  }

 },
 mounted(){
  this.Notes()
  this.MoyenneMatiere()
  this.NotePlusBasse()
  this.NotePlusHaut()
  this.NoteDuplicate()
 } 
}
</script>

<style scoped>
  #couleur{
    color: white;
  }
</style>