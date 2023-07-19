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
                <form @submit.prevent="Inserer()" class="forms-sample">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Trimestre</label>
                      <div class="col-sm-9">
                        <select v-model="idTrimestre" class="form-control">
                            <option value="" disabled>-- Choix --</option>
                            <option v-for="t in trimestres" :key="t.idTrimestre" :value="t.idTrimestre">
                                {{t.libelle}}
                            </option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Classe</label>
                      <div class="col-sm-9">
                        <select v-model="idClasse" class="form-control">
                            <option value="" disabled>-- Veuillez choisir la classe --</option>
                            <option v-for="c in classes" :key="c.idClasse" :value="c.idClasse">
                                {{c.libelleClasse}}
                            </option>
                          </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label  class="col-sm-3 col-form-label">Matière</label>
                      <div class="col-sm-9">
                        
                        <select v-model="codemat" class="form-control">
                            <option value="" disabled>-- Choix --</option>
                            <option v-for="m in matieres" :key="m.codemat" :value="m.codemat">
                                {{m.nomMatiere}}
                            </option>
                        </select>
                      </div>
                </div>
                <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Evaluation</label>
                      <div class="col-sm-9">
                        <select v-model="idEvalua" class="form-control">
                                <option value="" disabled>-- Choix --</option>
                                <option v-for="e in evaluations" :key="e.idEvalua" :value="e.idEvalua">
                                    {{e.libelleEvalua}}
                                </option>
                        </select>
                      </div>
                </div>

                <div class="form-group row">
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
                    </div>
                    <div v-if="aff" class="alert alert-danger">
                        {{msg}}
                    </div>
                    <input class="btn btn-info mr-2" type="submit" value="Continuer l'insertion"/>
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
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import { HTTP } from '../../../../http-constants';
import moment from 'moment'
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default {
  components:{NavGauche,NavHaut,VueDatePicker},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
  data(){
    return{
      locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], },
      classes:[],
      idClasse:'',
      idAs:this.$store.getters.getAnneeScoProf.idAs,
      trimestres:[],
      idTrimestre:'',
      codemat:'',
      matieres:[],
      evaluations:[],
      idEvalua:'',
      idProf:this.$store.getters.getProf.idProf,
      dateEvalua:moment().format("YYYY-MM-DD"),
      idNiv:'',
      msg:'',
      aff:false
    }
  },
  methods:{
    Matiere(){
            
        HTTP.get(`/professeur/matiere/${this.idProf}`).then((response)=>{
              this.matieres = response.data
        })
    },
    Trimestre(){
            HTTP.get(`/professeur/trimestre/${this.idAs}`).then((response)=>{
                this.trimestres = response.data
            })
    },
     Classe(){
        
        HTTP.get(`/professeur/classe/${this.idProf}`).then((response)=>{
              this.classes = response.data
        })
     },
     Evaluation(){
            HTTP.get('/professeur/evaluation').then((response)=>{
                this.evaluations = response.data
            })
    },
    Inserer(){
       if(this.idClasse=='' || this.codemat=='' || this.idTrimestre=='' || this.idEvalua==''){
          this.aff = true 
          this.msg = "Veuillez remplir tous les champs"
       }else{

        const data = {idClasse:this.idClasse,codemat:this.codemat,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua}
        HTTP.post('/verificationNote',data).then((response)=>{
            if(response.data.msgOk){
                this.$router.replace({
                      name:'NoteGroupeeEleveVue',
                      params:{idClasse:this.idClasse,
                      idTrimestre:this.idTrimestre,
                      idNiv:response.data.idNiv,
                      codemat:this.codemat,
                      idEvalua:this.idEvalua,
                      date:this.dateEvalua
                }})
            }else if(response.data.msgNok){
               this.aff = true
               this.msg=response.data.msgNok
            }
        })
        

       }
        
    },
    
  },
  mounted(){
    this.Classe()
    this.Trimestre()
    this.Matiere()
    this.Evaluation()
    //this.Niveau()
  }
}
</script>