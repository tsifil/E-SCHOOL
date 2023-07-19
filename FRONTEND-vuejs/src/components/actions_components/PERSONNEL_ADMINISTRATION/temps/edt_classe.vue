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
                    <!--h4 class="card-title">{{matiere}}-{{trimestre}}-{{classe}}-{{coef}}</h4-->
                    <!--p class="card-description">
                      Pour ajouter la note d'un élève<code>Veuillez choisir la classe</code>
                    </p-->
                    <div class="table-responsive">
                      <!--h3>Liste des eleves de la classe de : {{libelleClasse}}</h3-->
                      <table class="table table-bordered">
                        <thead bgcolor="skyblue">
                          <tr>
                              <th>Horaire</th>
                              <th>Lundi</th>
                              <th>Mardi</th>
                              <th>Mercredi</th>
                              <th>Jeudi</th>
                              <th>Vendredi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="h in horaires" :key="h.idEns">
                              <td>{{h.horaireD +' - '+ h.horaireF}}</td>
                              <td>
                                 <div v-for="e in emploi_du_temps" :key="e.idEns">
                                      <div v-if="e.jour==5">
                                          <div v-if="e.heureDebut==h.horaireD">
                                            <div v-if="h.horaireF==e.heureFin">
                                                 {{e.nomMatiere}}
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
                                          </div>
                                      </div>
                                 </div>
                              </td>
                              <td>
                                <div v-for="e in emploi_du_temps" :key="e.idEns">
                                      <div v-if="e.jour==6">
                                        <div v-if="e.heureDebut==h.horaireD">
                                              {{(h.horaireF==e.heureFin)?e.nomMatiere:''}}
                                          </div>
                                      </div>
                                 </div>
                              </td>
                              <td></td>
                              <td></td>
                              <td>mmmmmmmmmmmmmm</td>
                          </tr>
                          <!--caption>APRES-MIDI</caption-->
  
  
                          <!--tr v-for="e in emploi_du_temps" :key="e.idEns">
                             <td>{{moment(e.heureDebut).format("HH:mm") +' - '+ moment(e.heureFin).format("HH:mm")}}</td>
                             <td v-if="e.jour==5" id="font">
                                 {{e.nomMatiere}}
                             </td>
                             <td v-else></td>
                             <td v-if="e.jour==6" id="font">
                                {{e.nomMatiere}}
                             </td>
                             <td v-else></td>
                             <td></td>
                             <td></td>
                             <td></td>
                          </tr-->
                            <!--v-for="e in emploi_du_temps" :key="e.idEns"-->
                            <!--tr>
                                <td>07:00</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr height="10px">
                                <td>07:15</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                              <td>07:30</td>
                                <td id="font">
                                    <div  v-for="e in emploi_du_temps" :key="e.idEns">
                                      <div v-if="moment(e.heureDebut).format('HH:mm')=='07:30'">
                                                {{e.jour==5?moment(e.heureDebut).format('HH:mm') 
                                                +'-'+ moment(e.heureFin).format('HH:mm'):''}}
                                      </div>
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>07:45</td>
                                <td>
                                 
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>08:00</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>
                            <tr>
                                <td>08:15</td>  
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                              
                            </tr>
                            <tr>
                                <td>08:30</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>08:45</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>09:00</td>
                                <td>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                               <tr>
                                <td>09:30</td>
                                <td>
                                  <div v-for="e in emploi_du_temps" :key="e.idEns">
                                    <div v-if="moment(e.heureFin).format('HH:mm')=='09:30'">
                                          {{e.jour==5?e.nomMatiere:''}}
                                    </div>
                                  </div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr-->
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
  
  export default {
   components:{NavGauche,NavHaut},
   data(){
    return{
        idAs:this.$store.getters.getUserAnnee.idAs,
        idClasse:this.$route.params.idClasse,
        today:new Date(),
        emploi_du_temps:[],
        horaires:[]
    }
   },
   methods:{
    t(d){
            const date = new Date(d)
            const day = date.getDay()
            const diff = date.getDate() - day + (day === 0 ? -6 : 1 )
            return new Date(date.setDate(diff))   
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
        }
    },
   mounted(){
        this.Horaire()
        this.CorpsEdt()
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
  