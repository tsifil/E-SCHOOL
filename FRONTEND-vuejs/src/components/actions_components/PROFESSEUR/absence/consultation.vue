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
                  <!--h4 class="card-title">Absence non justifiee</h4>
                  <p class="card-description">
                    Horizontal form layout
                  </p-->
                <form @submit.prevent="Afficher()" class="forms-sample">
                    <div class="form-group row">
                      <label for="exampleInputUsername2" class="col-sm-3 col-form-label">Classe</label>
                      <div class="col-sm-9">
                        <select v-model="idClasse" class="form-control">
                            <option disabled value="">-- Veuillez Choisir la classe --</option>
                            <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                                {{l.libelleClasse}}
                            </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="exampleInputEmail2" class="col-sm-3 col-form-label">Matiere</label>
                      <div class="col-sm-9">
                        <!--select v-model="codemat" class="form-control">
                            <option value="" disabled>-- Veuillez choisir la matiere correspondant --</option>
                            <option v-for="m in matieres" :key="m.codemat" :value="m.codemat">
                                {{m.nomMatiere}}
                            </option>
                        </select-->
                        <selection v-model="codemat" :options="matieres" :settings="{width:'100%'}"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="exampleInputMobile" class="col-sm-3 col-form-label">Trimestre</label>
                      <div class="col-sm-9">
                        <select v-model="idTrimestre" class="form-control">
                                <option value="" disabled>-- Choix de trimestre --</option>
                                <option v-for="t in trimestres" :key="t.idTrimestre" :value="t.idTrimestre">
                                    {{t.libelle}}
                                </option>
                        </select>
                      </div>
                    </div>

                    {{ msg }}

                    <button class="btn btn-info mr-2">Afficher les absences</button>

                </form>
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
                              <th>N MATRICULE</th>
                              <th>NOM ET PRENOM(S)</th>
                              <th>NOMBRE HEURES D'ABSENCE</th>
                              <th>VOIR L'ABSENCE</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="n in nbHeures" :key="n.idAbsence">
                                <td>{{(n.sexe=='Masculin')?n.numMatricule+'G':n.numMatricule+'F'}}</td>
                                <td>{{n.nom}}</td>
                                <td bgcolor="pink">{{n.nbr}}</td>
                                <td><button @click="detail()"><i class="ti-eye"></i></button></td>
                           </tr>
                        </tbody>
                      </table>
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
import NavHaut from '../../includes/professeur/Menu_haut.vue'
import NavGauche from '../../includes/professeur/Menu_gauche.vue'
import moment from 'moment'

export default{
        components:{NavHaut,NavGauche},
        async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
        data(){
            return{
                listeClasse:[],
                idClasse:'',
                idAs:this.$store.getters.getAnneeScoProf.idAs,
                msg:'',
                matieres:[],
                codemat:'',
                date_Abs:moment().format("YYYY-MM-DD"),
                trimestres:[],
                idTrimestre:'',
                nbHeures:[]
            }
        },
        methods:{
            Matiere(){
                HTTP.get('/professeur/matiere').then((response)=>{
                    this.matieres = response.data
                })
            },
            ListeClasse(){
                 
                 HTTP.get('/listeClasse').then((response)=>{
                    this.listeClasse = response.data
                 })
            },
            Trimestre(){
                HTTP.get(`/professeur/trimestre/${this.idAs}`).then((response)=>{
                    this.trimestres = response.data
                    console.log(this.idAs)
                })
            },
            Afficher(){
                const data = {
                    idClasse:this.idClasse,
                    codemat:this.codemat,
                    idTrimestre:this.idTrimestre,
                    idAs:this.idAs
                }
                HTTP.post('/professeur/nombreHeureAbsence',data).then((response)=>{
                    this.nbHeures = response.data
                })
            },
        },
        mounted(){
            this.ListeClasse()
            this.Matiere()
            this.Trimestre()
        }
    }
</script>