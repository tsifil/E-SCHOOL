<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              
            <router-link :to="{path:'/note_groupee'}">Retour</router-link>
            <br><br>

        <div class="col-lg-12 grid-margin stretch-card">
            
              <div class="card" id='co'>
                <div class="card-body">
                    <!--div class="form-group row">
                      <div class="col-sm-9">
                        {{libelle}}-{{libelleClasse}}-{{libelleNiv}}-{{nomMatiere}}-{{coefficient}}-{{date}}
                      </div>
                    </div-->
                    <div  class="row">
                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{nomMatiere}}</h4>
                        <h5 class="col-sm-12">
                            {{libelle}}
                        </h5>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{libelleClasse+'('+libelleNiv+')'}}</h4>
                        <h5 class="col-sm-12">
                            {{libelleEvalua}}
                        </h5>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{date}}</h4>
                        <h5 class="col-sm-12">
                            Coefficient:{{coefficient}}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>Photo</th>
                              <th>Nom et prenom(s)</th>
                              <th>N° matricule</th>
                              <th>Commentaire</th>
                              <th>Note/{{coefficient*20}}</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(e,i) in eleves" :key="e.numMatricule">
                                <td class="py-1"><img :src="e.photo" alt="image"/></td>
                                <td>{{e.nom}}</td>
                                <td>{{(e.sexe=='Masculin')?e.numMatricule+'G':e.numMatricule+'F'}}</td>
                                <td><textarea v-model="commentaire[i]" class="form-control"></textarea></td><td>
                                    <input class="form-control" placeholder="note d'élève" v-model="notes[i]"/>
                                    <input type="hidden" v-bind:value="e.numMatricule" v-bind:input="mat[i]=e.numMatricule"/>
                                </td>
                           </tr>
                        </tbody>
                      </table>
                      <br>
                      <button class="btn btn-success mr-2" @click="Enregistrer()">Enregistrer les notes</button>
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
            idClasse:this.$route.params.idClasse,
            idTrimestre:this.$route.params.idTrimestre,
            idNiv:this.$route.params.idNiv,
            codemat:this.$route.params.codemat,
            idEvalua:this.$route.params.idEvalua,
            date:this.$route.params.date,
            eleves:[],
            idAs:this.$store.getters.getAnneeScoProf.idAs,
            libelle:'',
            libelleClasse:'',
            libelleNiv:'',
            nomMatiere:'',
            coefficient:'',
            commentaire:[],
            notes:[],
            mat:[],
            public:0,
            libelleEvalua:''
        }
    },
    methods:{
        StructureNote(){
            HTTP.get(`/structure/enregistrementNote/${this.idEvalua}/${this.idClasse}/${this.idTrimestre}/${this.idNiv}/${this.codemat}`)
            .then((response)=>{
                this.libelle=response.data.libelle
                this.libelleClasse=response.data.libelleClasse
                this.libelleNiv=response.data.libelleNiv
                this.nomMatiere=response.data.nomMatiere
                this.coefficient=response.data.coefficient
                this.libelleEvalua=response.data.libelleEvalua
            })
        },
        Eleve(){
                HTTP.get(`/professeur/listeEleve/${this.idClasse}/${this.idNiv}/${this.idAs}`)
                .then((response)=>{
                    this.eleves = response.data.result
                })
        },
        NV_bulletin(){
          const data2={codemat:this.codemat,idEvalua:this.idEvalua,idTrimestre:this.idTrimestre,idClasse:this.idClasse,date:this.date}
            HTTP.post('/ajoutBulletin',data2).then((response)=>{
              console.log(response)
            })
        },
        Enregistrer(){
        const data={mat:this.mat,notes:this.notes,codemat:this.codemat,idEvalua:this.idEvalua,date:this.date,idTrimestre:this.idTrimestre,idClasse:this.idClasse,commentaire:this.commentaire,public:this.public}
        HTTP.post('/Ajouter/noteGroupee',data).then((response)=>{
            console.log(response)
        })        
        this.$router.replace({name:'VoirNoteProf',params:{idTrimestre:this.idTrimestre,codemat:this.codemat}})
      }
    },
    mounted(){
        this.StructureNote()
        this.Eleve()
    }
}
</script>
<style>
  #co{
    background-color:rosybrown;
    color:white;
  }
</style>