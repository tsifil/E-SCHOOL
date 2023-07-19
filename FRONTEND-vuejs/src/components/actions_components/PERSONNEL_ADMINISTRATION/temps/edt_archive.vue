<template>
    <div class="container-scroller">
        <NavHaut/>
        <div class="container-fluid page-body-wrapper">
        <NavGauche/>
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
                <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="form-group">
                          <label>Classe de:</label>
                          <selection v-model="idClasse" :options="classes"/>
                  </div>
                  
                <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body" >
                                <label>Jour</label>
                                <VueDatePicker
                                    class="form-control"
                                    format="dddd"
                                    :locale="locale"
                                    @onClose="isVisible = false"
                                    v-model="jour"
                                />
                              <br>
                              <label>Date du cours</label>
                              <VueDatePicker
                                    class="form-control"
                                    format="YYYY-MM-DD"
                                    :locale="locale"
                                    @onClose="isVisible = false"
                                    v-model="jour"
                                />
  
                              <br>
  
                              <label>Heure du debut du cours</label>
                                <input type="time" v-model="heureD" class="form-control"/>
                                <br>
                              <label>Heure de fin du cours</label>
                              <input type="time" v-model="heureF" class="form-control"/>
  
                                <br>
                              <!--input type="datetime-local" v-model="jour"/>
                              <label>Date et heure du debut du cours</label>
                              <input  class="form-control" v-model="jour" step="1" type="datetime-local"/>
                              
                              <br>
                              <label>Date et heure du fin du cours</label>
                              <input  class="form-control" v-model="dateHeurePlanFin"  step="1" type="datetime-local"/>
                              <br-->
                              <!--label>Classe de :</label>
                              <selection v-model="idClasse" :options="classes"/-->
                              <label>Nom de la matiere</label>
                              <selection v-model="codemat" :options="matieres" :settings="{width:'100%'}"/>
                              <br>
                              <label>Nom de professeur</label>
                              <selection v-model="idProf" :options="profs" :settings="{width:'100%'}"/>
                              <br>
                              <button @click="Sauvegarder()" type="button" class="btn btn-success mr-2" data-dismiss="modal">Sauvegarder</button>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                            </div>
                          </div>
                        </div>
                      </div>
  
                  <button @click="Afficher" class="btn btn-info mr-2"><i class="ti-eye"></i></button>
                    <!--router-link :to="{name:'listeEdtClasse',params:{idClasse:idClasse}}"
                       class="btn btn-info mr-2">Afficher</router-link
                      -->
                  <br><br>
                  <div data-toggle="modal" data-target="#myModal">
                     <button v-if="aff" @click="Afficher" class="btn btn-warning mr-2">Creation du planning</button>
                  </div>
                  <br><br>  
  
                  <div id="dateReel" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body" >
                              <label>Date du cours</label>
                              <VueDatePicker
                                    class="form-control"
                                    format="YYYY-MM-DD"
                                    :locale="locale"
                                    @onClose="isVisible = false"
                                    v-model="jour"
                              />
                              <!--input type='date' class="form-control" format="YYYY-MM-DD" v-model='jour' readonly/-->
                              <br>
                              <label>Reel debut:</label>
                              <input type="time" v-model="heureD" class="form-control"/>
                              <br>
                              <label>Reel Fin:</label>
                              <input type="time" v-model="heureD" class="form-control"/>
                              <br>
                              <button @click="Sauvegarder()" type="button" class="btn btn-success mr-2" data-dismiss="modal">Sauvegarder</button>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  <div class="table-responsive" v-if='aff'>
                    <!--h3>Liste des eleves de la classe de : {{libelleClasse}}</h3-->
                        <table class="table table-bordered">
                          <thead bgcolor="skyblue">
                            <tr>
                                <th>Horaire </th>
                                <th>Lundi   {{j1}}</th>
                                <th>Mardi   {{j2}}</th>
                                <th>Mercredi  {{j3}}</th>
                                <th>Jeudi   {{j4}}</th>
                                <th>Vendredi  {{j5}}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="h in horaires" :key="h.idEns">
                                <!--td>{{h.horaireD +' - '+ h.horaireF}}</td-->
                                <td>{{h.heureMinuteD +' - '+ h.heureMinuteF}}</td>
                                <td>
                                   <div v-for="e in emploi_du_temps" :key="e.idEns">
                                        <div v-if="moment(e.jour).format('DD/MM')==j1">
                                          <!--{{(h.horaireF==e.heureFin)?e.nomMatiere:''}}--> 
                                          <div v-if="e.heureDebut==h.horaireD">
                                               <div v-if="h.horaireF==e.heureFin">
                                                   {{e.nomMatiere}}
                                                   <!--{{(e.sexe=='Masculin')? 'Mr '+ ' '+e.nomPrenom:'Mme' + ' ' +e.nomPrenom}}
                                                   <br>-->
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                        <button data-toggle="modal" data-target="#dateReel" class="btn btn-info btn-sm">
                                                          <input @click="test(e.heureDebut,e.heureFin)" type="checkbox">
                                                        </button>
                                                        <!--button class="btn btn-info btn-sm"><input type="checkbox"></button-->
                                                        <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                               </div>
                                            </div> 
                                          <!--div v-if="e.heureDebut==h.horaireD">
                                              <div v-if="h.horaireF==e.heureFin">
                                                   <br><br>
                                                   {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                                                   <br>
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                              <button class="btn btn-outline-success btn-sm"><input type="checkbox"></button>
                                                              Debut
                                                              <button class="btn btn-outline-success btn-sm"><input type="checkbox"></button>
                                                              Fin
                                                              <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                              </div>
                                            </div-->
                                        </div>
                                   </div>
                                </td>
                                <td>
                                  <div v-for="e in emploi_du_temps" :key="e.idEns">
                                        <div v-if="moment(e.jour).format('DD/MM')==j2">
                                          <div v-if="e.heureDebut==h.horaireD">
                                               <div v-if="h.horaireF==e.heureFin">
                                                   {{e.nomMatiere}}
                                                   <!--{{(e.sexe=='Masculin')? 'Mr '+ ' '+e.nomPrenom:'Mme' + ' ' +e.nomPrenom}}
                                                   <br>-->
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                        <button data-toggle="modal" data-target="#dateReel" class="btn btn-info btn-sm">
                                                          <input type="checkbox" v-model='e.dateReelDebut'>
                                                        </button>
                                                        <!--button class="btn btn-info btn-sm">
                                                          <input type="checkbox" v-model='e.dateReelFin'>
                                                        </button-->
                                                        <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                   </div>
                                </td>
                                <td>
                                  <div v-for="e in emploi_du_temps" :key="e.idEns">
                                        <div v-if="moment(e.jour).format('DD/MM')==j3">
                                          <!--div v-if="e.heureDebut==h.horaireD">
                                                {{(h.horaireF==e.heureFin)?e.nomMatiere:''}}
                                            </div-->
                                            <div v-if="e.heureDebut==h.horaireD">
                                               <div v-if="h.horaireF==e.heureFin">
                                                   {{e.nomMatiere}}
                                                   <!--{{(e.sexe=='Masculin')? 'Mr '+ ' '+e.nomPrenom:'Mme' + ' ' +e.nomPrenom}}
                                                   <br>-->
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                        <button class="btn btn-info btn-sm"><input type="checkbox"></button>
                                                        <!--button class="btn btn-info btn-sm"><input type="checkbox"></button-->
                                                        <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                   </div>
                                </td>
                                <td>
                                  <div v-for="e in emploi_du_temps" :key="e.idEns">
                                        <div v-if="moment(e.jour).format('DD/MM')==j4">
                                          <div v-if="e.heureDebut==h.horaireD">
                                               <div v-if="h.horaireF==e.heureFin">
                                                   {{e.nomMatiere}}
                                                   <!--{{(e.sexe=='Masculin')? 'Mr '+ ' '+e.nomPrenom:'Mme' + ' ' +e.nomPrenom}}
                                                   <br>-->
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                        <button class="btn btn-info btn-sm"><input type="checkbox"></button>
                                                        <!--button class="btn btn-info btn-sm"><input type="checkbox"></button-->
                                                        <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                   </div>
                                </td>
                                <td>
                                  <div v-for="e in emploi_du_temps" :key="e.idEns">
                                        <div v-if="moment(e.jour).format('DD/MM')==j5">
                                          <div v-if="e.heureDebut==h.horaireD">
                                               <div v-if="h.horaireF==e.heureFin">
                                                   {{e.nomMatiere}}
                                                   <!--{{(e.sexe=='Masculin')? 'Mr '+ ' '+e.nomPrenom:'Mme' + ' ' +e.nomPrenom}}
                                                   <br>-->
                                                   <div class="form-check form-check-success">
                                                      <label>
                                                        <button class="btn btn-info btn-sm">
                                                          <input type="checkbox">
                                                        </button>
                                                        <!--button class="btn btn-info btn-sm"><input type="checkbox"></button-->
                                                        <button class="btn btn-info btn-sm"><i class="ti-pencil"></i></button>
                                                      </label>
                                                </div>
                                               </div>
                                            </div>
                                        </div>
                                   </div>
                                </td>
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
  import NavHaut from '../../includes/Menu_haut.vue'
  import NavGauche from '../../includes/Menu_gauche.vue'
  import moment from 'moment'
  import { HTTP } from '../../../../http-constants';
  import {VueDatePicker} from '@mathieustan/vue-datepicker'
  import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
  
  export default {
   components:{NavGauche,NavHaut,VueDatePicker},
   data(){
    return{
        locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D']},
        //jour:moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        jour:new Date(),
        heureD:'',
        heureF:'',
        idAs:this.$store.getters.getUserAnnee.idAs,
        idClasse:'',
        classes:[],
        today:new Date(),
        emploi_du_temps:[],
        horaires:[],
        aff:false,
        idProf:'',
        codemat:'',
        profs:[],
        matieres:[],
        j1:'',
        j2:'',
        j3:'',
        j4:'',
        j5:''
    }
   },
   methods:{
    Sauvegarder(){
       const data={
        dateheurePlanD:moment(this.jour).format("YYYY-MM-DD") + ' '+this.heureD,//moment(this.jour+''+this.heureD).format("YYYY-MM-DD HH:mm"),
        dateheurePlanF:moment(this.jour).format("YYYY-MM-DD") + ' '+this.heureF,//moment(this.jour+''+this.heureF).format("YYYY-MM-DD HH:mm"),
        idClasse:this.idClasse,
        codemat:this.codemat,
        idProf:this.idProf
       }
       //console.log(data)
      HTTP.post('/ajouterEdt',data).then((response)=>{
          if(response.data.msg404){
              this.$swal(response.data.msg404,{icon:'error'})
          }else{
             this.$swal(response.data.msg200,{icon:'success'})
          }
      })
    },
    Matiere(){
              HTTP.get(`/professeur/matiereClasse/${this.idClasse}`)
              .then((response)=>{
                  this.matieres = response.data
              })
          },
    Professeur(){
          HTTP.get('/professeur/liste').then((response)=>{
                this.profs = response.data
          })
    },
    Classe(){
              HTTP.get('/professeur/listeClasse').then((response)=>{
                  this.classes = response.data
              })
    },
    t(d){
            const date = new Date(d)
            const day = date.getDay()
            const diff = date.getDate() - day + (day === 0 ? -6 : 1 )
            return new Date(date.setDate(diff))   
        },
        Semaine(){
             const firstDay = this.t(this.today)
  
             const secondDay = new Date(firstDay)
             secondDay.setDate(secondDay.getDate() + 1)
  
             const thirdDay = new Date(firstDay)
             thirdDay.setDate(thirdDay.getDate() + 2)
  
             const fourDay = new Date(firstDay)
             fourDay.setDate(fourDay.getDate() + 3)
  
             const lastDay = new Date(firstDay)
             lastDay.setDate(lastDay.getDate() + 4)
  
             this.j1=moment(firstDay).format("DD/MM")
             this.j2=moment(secondDay).format("DD/MM")
             this.j3=moment(thirdDay).format("DD/MM")
             this.j4=moment(fourDay).format("DD/MM")
             this.j5=moment(lastDay).format("DD/MM")
        },
        CorpsEdt(){
             const firstDay = this.t(this.today)
             const lastDay = new Date(firstDay)
             lastDay.setDate(lastDay.getDate() + 4)
             const p=moment(firstDay).format("YYYY-MM-DD")
             const d=moment(lastDay).format("YYYY-MM-DD")           
             //console.log(p,d)
             HTTP.get(`/edt/${p}/${d}/${this.idClasse}`).then((response)=>{
                this.emploi_du_temps=response.data
             })
        },
        Horaire(){
            const firstDay = this.t(this.today)
             const lastDay = new Date(firstDay)
             lastDay.setDate(lastDay.getDate() + 4)
             const p=moment(firstDay).format("YYYY-MM-DD")
             const d=moment(lastDay).format("YYYY-MM-DD")
          HTTP.get(`/horaire/${p}/${d}/${this.idClasse}`).then((response)=>{
                this.horaires=response.data
             })
        },
        Afficher(){
            this.aff=true
            this.Horaire()
            this.CorpsEdt()
            this.Matiere()
        }
    },
   mounted(){
        this.Classe()
        //this.Matiere()
        this.Professeur()
        this.Semaine()
   } 
  }
  </script>
  <style scoped>
    #font{
      color: white;
      background-color: black;
      background-size:0vmax;
    }
  </style>
  