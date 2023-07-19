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
                      <div class="col-md-4">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Professeur:</label>
                          <div class="col-sm-12">
                              <selection v-model='idProf' :options="liste"/>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-4">
                            <div class="form-group row">
                                <label class="col-sm-6 col-form-label">De :</label>
                                <div class="col-sm-12">
                                    <VueDatePicker
                                        class="form-control"
                                        format="YYYY-MM-DD"
                                        :locale="locale"
                                        @onClose="isVisible = false"
                                        v-model="dateDebut"
                                        min-date="1000-12-12"/>
                                </div>
                            </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">A :</label>
                          <div class="col-sm-12">
                            <VueDatePicker
                              class="form-control"
                              format="YYYY-MM-DD"
                              :locale="locale"
                              @onClose="isVisible = false"
                              v-model="dateFin"
                              min-date="1000-12-12"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <vs-button @click="Registre()" type='filled' color='blue'>Afficher</vs-button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="registres!=''">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                        <h3>TOTAL: {{total}}</h3>
                        <br>
                        <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                            <th>DATE</th>
                            <th>HEURE DEBUT</th>
                            <th>HEURE FIN</th>
                            <th>HEURE TRAVAILLES</th>
                            <th>MATIERE</th>
                            <th>CLASSE</th>
                        </thead>
                        <tbody>
                            <tr v-for="r in registres" :key="r.idEns">
                                <td>{{r.date}}</td>
                                <td>{{r.heureD}}</td>
                                <td>{{r.heureF}}</td>
                                <td>{{r.heureF!="00:00"?r.nbr:'-'}}</td>
                                <td>{{r.nomMatiere}}</td>
                                <td>{{r.libelleClasse}}</td>
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
</div>
</template>
<script>
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import moment from 'moment'
    export default{
        components:{NavHaut,NavGauche,VueDatePicker},
        data(){
            return{
                total:[],
                idProf:'',
                liste:[],
                dateDebut:new Date(),
                dateFin:new Date(),
                registres:[],
                locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],},
            }
        },
        methods:{
                ListeProf(){
                    HTTP.get('/edt/tableProfesseur').then((response)=>{
                        this.liste = response.data.result
                        this.idProf = response.data.idProf
                    })
                },
                TotalHeure(){
                    const data={idProf:this.idProf,dateDebut:this.dateDebut,dateFin:this.dateFin}
                    HTTP.post('/edt/totalHeureTravaillee',data)
                    .then((response)=>{
                        this.total=response.data.total
                    })
                },
                Registre(){
                    const data={idProf:this.idProf,dateDebut:moment(this.dateDebut).format("YYYY-MM-DD"),dateFin:moment(this.dateFin).format("YYYY-MM-DD")}
                    HTTP.post('/registre/heureTravaille',data)
                    .then((response)=>{
                        this.registres=response.data
                        this.TotalHeure()
                    })
                }
        },
        mounted(){
            this.ListeProf()
        }
    }
</script>