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
            <div class="row">
                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Nom d'élève</label>
                          <div class="col-sm-12">
                            <selection v-model="numMatricule" :options="listeEnfant"></selection>
                          </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Classe</label>
                          <div class="col-sm-12">
                             <selection v-model="idClasse" :options="classes"/>
                          </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Trimestre</label>
                          <div class="col-sm-12">
                            <select v-model="idTrimestre" class="form-control">
                                    <option value="" disabled>-- Veuillez choisir le trimestre --</option>
                                    <option v-for="l in listeTrimestre" :key="l.idTrimestre" :value="l.idTrimestre">
                                        {{l.libelle}}
                                    </option>
                              </select>
                          </div>
                        </div>
                </div>
                
                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Evaluation</label>
                          <div class="col-sm-12">
                            <select v-model="idEvalua" class="form-control">
                              <option value="" disabled>-- Choix --</option>
                              <option v-for="e in evaluations" :key="e.idEvalua" :value="e.idEvalua">
                                  {{e.libelleEvalua}}
                              </option>
                            </select>                          
                          </div>
                        </div>
                </div>
                
                </div>

                <button @click="Voir" class="btn btn-info mr-2">Voir les notes</button>

                </div>
            </div>
        </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card" v-if="eleveNotes!=''">
                <div class="card">
                  <div class="card-body">
                    <button @click="Imprimer()" class="btn btn-warning mr-2">Télécharger le relevé des notes</button>
                    <br><br>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <!-- table-bordered-->
                        <thead bgcolor="blue" style="color:white">
                          <tr> 
                              <th >MATIERE</th>
                              <th >MOYENNE</th>
                              <th >DETAIL DES EVALUATIONS</th>
                              <th >COMMENTAIRE DE PROFESSEUR</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in eleveNotes" :key="e.idPass">
                                <td>{{e.nomMatiere}}</td>
                                <td>{{ (e.public==1)?(((e.note/e.coefficient).toFixed(2))+'/20'):''}}</td>
                                <td>{{ (e.public==1)?( e.libelleEvalua +' '+ e.nomMatiere+'('+moment(e.date).format("YYYY-MM-DD") + ' ' +'Coef. '+ e.coefficient +')'+': '+ e.note+'/'+(e.coefficient*20)):''}}</td>
                                <td>{{ (e.public==1)?e.commentaire:''}}</td>
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
    </div>
  </template>

<script>
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/parent/Menu_haut.vue'
import NavGauche from '../../includes/parent/Menu_gauche.vue'
import moment from 'moment'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

    export default{
        components:{NavHaut,NavGauche},
        async created(){
                    if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire) {
                            this.$router.push('/')
                    }else{
                        this.nomUsage = this.$store.getters.getParent.nomUsage
                        this.annee_scolaire = this.$store.getters.getAnneeSco.libelle
           }
        },
        data(){
            return{
                idAs:this.$store.getters.getAnneeSco.idAs,
                idPers:this.$store.getters.getParent.idPers,
                listeEnfant:[],
                numMatricule:'',
                listeTrimestre:[],
                idTrimestre:'',
                evaluations:[],
                idEvalua:'',
                idClasse:'',
                classes:[],
                eleveNotes:[]
            }
        },
        methods:{
            Enfant(){
                HTTP.get(`/parent/listeEnfant/${this.idAs}/${this.idPers}`)
                .then((response)=>{
                    this.listeEnfant = response.data.result
                    this.numMatricule = response.data.numMatricule
                })
            },
            Classe(){
                    HTTP.get('/professeur/listeClasse').then((response)=>{
                    this.classes = response.data.result
                    this.idClasse = response.data.idClasse
                })
            },
            Trimestre(){           
                HTTP.get(`/listeTrimestre/${this.idAs}`).then((response)=>{
                     this.listeTrimestre = response.data
                })
            },
            Evaluation(){
                HTTP.get('/professeur/evaluation').then((response)=>{
                    this.evaluations = response.data
                })
            },
            Voir(){
                const data={
                    numMatricule:this.numMatricule,
                    idClasse:this.idClasse,
                    idEvalua:this.idEvalua,
                    idTrimestre:this.idTrimestre
                }

                HTTP.post('/eleveNotes',data).then((response)=>{
                    this.eleveNotes=response.data
                })
            },
            Imprimer(){
                let info = []
                this.eleveNotes.forEach((e, index, array) => {
                    info.push([e.nomMatiere,(e.public==1)?(((e.note/e.coefficient).toFixed(2))+'/20'):'',(e.public==1)?( e.libelleEvalua +' '+ e.nomMatiere+'('+moment(e.date).format("YYYY-MM-DD") + ' ' +'Coef. '+ e.coefficient +')'+': '+ e.note+'/'+(e.coefficient*20)):'', (e.public==1)?e.commentaire:''])
                    console.log(index,array)
                })
                const doc = new jsPDF()
                autoTable(doc, {
                    head: [['MATIERE', 'MOYENNE', 'DETAIL DES EVALUATIONS','COMMENTAIRE DE PROFESSEUR']],
                    body: info,
                    theme:'grid',
                    headStyles:{fillColor:'blue'}
          })

                doc.save('note.pdf')

            }
        },
        mounted(){
            this.Enfant()
            this.Trimestre()
            this.Evaluation()
            this.Classe()
        }
    }
</script>