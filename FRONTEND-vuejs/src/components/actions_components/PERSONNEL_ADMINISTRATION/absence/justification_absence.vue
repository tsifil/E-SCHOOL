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
                  <h4 class="card-title">Absence non justifiee</h4>
                  <p class="card-description">
                    Horizontal form layout
                  </p>
                <form @submit.prevent="Afficher" class="forms-sample">
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
                        <selection v-model="codemat" :options="matieres"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="exampleInputMobile" class="col-sm-3 col-form-label">Date d'absence</label>
                      <div class="col-sm-9">
                        <VueDatePicker
                            class="form-control"
                            format="YYYY-MM-DD"
                            :locale="locale"
                            @onClose="isVisible = false"
                            button-validate="Ok"
                            button-cancel="Annuler"
                            validate 
                            v-model="date_Abs"
                            min-date="1000-12-12"
                        />
                      </div>
                    </div>

                    {{ msg }}

                    <button class="btn btn-info mr-2">Afficher les absences</button>

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
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import moment from 'moment'
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'

export default{
        components:{VueDatePicker,NavHaut,NavGauche},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                  this.$router.push('/connecter_personnel_administration')
            }
        },
        data(){
            return{
                locale: {
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                },
                listeClasse:[],
                idClasse:'',
                idAs:this.$store.getters.getUserAnnee.idAs,
                msg:'',
                matieres:[],
                codemat:'',
                date_Abs:moment().format("YYYY-MM-DD")
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
            Afficher(){
                const data = {
                    idClasse:this.idClasse,
                    codemat:this.codemat,
                    date_Abs:this.date_Abs,
                    idAs:this.idAs
                }
                HTTP.post('/admin/verificationAbsence',data).then((response)=>{
                    if(response.data.aucun){
                            this.msg = response.data.aucun
                    }else{
                           this.$router.replace({name:'EleveAbsent',params:{idClasse:this.idClasse,codemat:this.codemat,dateAbs:this.date_Abs}})
                    }
                })
            },
        },
        mounted(){
            this.ListeClasse()
            this.Matiere()
        }
    }
</script>