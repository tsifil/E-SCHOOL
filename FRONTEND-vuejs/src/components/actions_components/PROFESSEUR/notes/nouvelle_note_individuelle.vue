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
                    <h4 class="card-title"></h4>
                    
            <form @submit.prevent="Enregistrer()">
                
                     <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Trimestre*</label>
                          <div class="col-sm-9">
                            {{idTrimestre}}
                            <select v-model="idTrimestre" class="form-control">
                                <option value="" disabled>-- Choix --</option>
                                <option v-for="t in trimestres" :key="t.idTrimestre" :value="t.idTrimestre">
                                    {{t.libelle}}
                                </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                    <div class="col-md-6">

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Matiere</label>
                          <div class="col-sm-9">
                            {{codemat}}
                            <select v-model="codemat" class="form-control">
                                <option value="" disabled>-- Choix --</option>
                                <option v-for="m in matieres" :key="m.codemat" :value="m.codemat">
                                    {{m.nomMatiere}}
                                </option>
                            </select>
                          </div>
                        </div>
                            
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Date d'evaluation</label>
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
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Note</label>
                          <div class="col-sm-9">
                            <input class="form-control"
                             v-model="note"
                              placeholder="note"/>
                          
                           </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Evaluation</label>
                          <div class="col-sm-9">
                            {{idEvalua}}
                            <select v-model="idEvalua" class="form-control">
                                <option value="" disabled>-- Choix --</option>
                                <option v-for="e in evaluations" :key="e.idEvalua" :value="e.idEvalua">
                                    {{e.libelleEvalua}}
                                </option>
                            </select>

                          </div>
                        </div>
                      </div>

                      <!--div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Appreciations</label>
                          <div class="col-sm-9">
                            <textarea type="text" class="form-control"></textarea>
                          </div>
                        </div>
                      </div-->

                    </div>
              
                    <input type='reset' class="btn btn-danger mr-2" value="Retour"/>
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
import { HTTP } from '../../../../http-constants';
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import moment from 'moment'

export default {
    components:{VueDatePicker,NavGauche,NavHaut},
    async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
    data(){
        return{
            locale: {
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            },
            idClasse:this.$route.params.idClasse,
            numMatricule:this.$route.params.numMatricule,
            idAs:this.$store.getters.getAnneeScoProf.idAs,
            trimestres:[],
            idTrimestre:'',
            codemat:'',
            matieres:[],
            dateEvalua:moment().format("YYYY-MM-DD"),
            evaluations:[],
            idEvalua:'',
            note:''
        }
    },
    methods:{
        Trimestre(){
            HTTP.get(`/professeur/trimestre/${this.idAs}`).then((response)=>{
                this.trimestres = response.data
            })
        },
        Matiere(){
            HTTP.get('/professeur/matiere').then((response)=>{
                this.matieres = response.data
            })
        },
        Evaluation(){
            HTTP.get('/professeur/evaluation').then((response)=>{
                this.evaluations = response.data
            })
        },
        Enregistrer(){
            const data = {
                numMatricule:this.numMatricule,
                idClasse:this.idClasse,
                codemat:this.codemat,
                idTrimestre:this.idTrimestre,
                idEvalua:this.idEvalua,
                note:this.note,
                date:this.dateEvalua
            }

            HTTP.post('/ajouter/noteIndividuelle',data).then((response)=>{
                if(response.data.msg400){
                    this.$swal(response.data.msg400,{icon:'error'})
                }
                else if(response.data.msg200){
                    this.$swal(response.data.msg200,{icon:'success'})
                }
            })
        }
    },
    mounted(){
        this.Trimestre()
        this.Matiere()
        this.Evaluation()
    }
}
</script>