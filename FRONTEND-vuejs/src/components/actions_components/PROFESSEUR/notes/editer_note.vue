<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
              <div class="card" id='co'>
                <div class="card-body">
                    
              <div  class="row" v-for="(p) in plusInfos.slice(0,1)" :key="p.nomMatiere">
                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{p.nomMatiere}}</h4>
                        <h5 class="col-sm-12">
                            {{p.libelle}}
                        </h5>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{p.libelleClasse}}</h4>
                        <h5 class="col-sm-12">
                            {{p.libelleEvalua}}
                        </h5>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group row">
                        <h4 class="col-sm-6">{{moment(p.date).format("YYYY-MM-DD")}}</h4>
                        <h5 class="col-sm-12">
                            Coefficient:{{coef}}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">


                <!--div class="form-group row">
                    <label class="col-sm-3 col-form-label">Date</label>
                      <div class="col-sm-9">
                        <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="dateEvalua"
                            min-date="1000-12-12"
                        />
                      </div>
                </div-->
                
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>Photo</th>
                              <th>Nom et prenom(s)</th>
                              <th>N matricule</th>
                              <th>Commentaire</th>
                              <th>Note/{{coef*20}}</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(e,i) in eleves" :key="e.numMatricule">
                                <td class="py-1"><img :src="e.photo" alt="image"/></td>
                                <td>
                                    <input type="hidden" :value="e.idPass" :input="clefs[i]=e.idPass"/>
                                    {{e.nom}}
                                </td>
                                <td>{{(e.sexe=='Masculin')?e.numMatricule+'G':e.numMatricule+'F'}}</td>
                                <td><textarea v-model.lazy="e.commentaire" :input="commentaire[i]=e.commentaire" class="form-control"></textarea></td>
                                <td>
                                    <input v-model="e.note" 
                                    :input="notes[i]=e.note" class="form-control" placeholder="note d'élève"/>
                                    <input type="hidden" :value="e.numMatricule" :input="mat[i]=e.numMatricule"/>
                                </td>
                           </tr>
                        </tbody>
                      </table>
                      <br>
                      <button class="btn btn-success mr-2" @click="Enregistrer()">
                           Enregistrer la modification
                      </button>
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
//import {VueDatePicker} from '@mathieustan/vue-datepicker'
//import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
  components:{NavGauche,NavHaut/*,VueDatePicker*/},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
  data(){
    return{
        mat:[],
        clefs:[],
        notes:[],
        locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D']},
        classes:[],
        idClasse:this.$route.params.idClasse,
        idAs:this.$store.getters.getAnneeScoProf.idAs,
        eleves:[],
        idTrimestre:this.$route.params.idTrimestre,
        codemat:this.$route.params.codemat,
        idEvalua:this.$route.params.idEvalua,
        dateEvalua:this.$route.params.date,
        public:this.$route.params.public,
        msg:'',
        commentaire:[],
        matieres:[],
        trimestres:[],
        evaluations:[],
        coef:this.$route.params.coef,
        plusInfos:[],
    }
  },
  methods:{
    Matiere(){
            HTTP.get('/professeur/matiere').then((response)=>{
                this.matieres = response.data
            })
    },
    Trimestre(){
            HTTP.get(`/professeur/trimestre/${this.idAs}`).then((response)=>{
                this.trimestres = response.data
            })
    },
    Classe(){
        HTTP.get('/professeur/listeClasse').then((response)=>{
          this.classes = response.data
        })
     },
     Evaluation(){
            HTTP.get('/professeur/evaluation').then((response)=>{
                this.evaluations = response.data
            })
    },
    PlusInfo(){
      HTTP.get(`/professeur/editer/note/plusInfo/${this.idClasse}/${this.idTrimestre}/${this.codemat}/${this.idEvalua}`)
      .then((response)=>{
          this.plusInfos = response.data
      })
    },
    Eleve(){
        //HTTP.get(`/professeur/afficherNoteEleve/${this.coef}/${this.idTrimestre}/${this.codemat}/${this.idClasse}/${this.idEvalua}/${this.idAs}`)
        HTTP.get(`/professeur/editer/noteEleve/${this.idClasse}/${this.idTrimestre}/${this.codemat}/${this.idEvalua}/${this.idAs}`)
        .then((response)=>{
             this.eleves = response.data
        })
    },
    Enregistrer(){
        const data={
            idPass:this.clefs,
            mat:this.mat,
            idClasse:this.idClasse,
            codemat:this.codemat,
            idTrimestre:this.idTrimestre,
            idEvalua:this.idEvalua,
            notes:this.notes,
            date:this.dateEvalua,
            commentaire:this.commentaire,
            public:this.public
        }
        HTTP.post('/Modifier/noteGroupee',data)
        this.$swal('La modification a effectuée avec succès',{icon:'success'}).then(()=>{
         this.$router.replace({name:'VoirNoteProf',params:{idTrimestre:this.idTrimestre,codemat:this.codemat}})
      })
          // //-:coef-:idClasse-:idEvalua-:idTrimestre-:codemat-:public-:date
         //this.$router.replace({name:'VoirNoteProf',params:{idTrimestre:this.idTrimestre,codemat:this.codemat}})
        //this.msg='Notes ajoutés avec succès.'
    }
  },
  mounted(){
    this.Classe()
    this.Trimestre()
    this.Matiere()
    this.Evaluation()
    this.Eleve()
    this.PlusInfo()
  }
}
</script>
<style>
  #co{
    background-color:rosybrown;
    color:white;
  }
</style>