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
                  <div class="form-group row">
                      <div class="col-md-4">
                          <label>Classe:</label>
                          <selection v-model="idClasse" :options="classes"/>                      
                      </div>
                      <div class="col-md-2">
                        <br>                        
                        <vs-button type="filled" color="teal"  @click="Afficher()">
                            Afficher
                        </vs-button>
                      </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
          <div class="row" v-if="aff">
              <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                <div data-toggle="modal" data-target="#myModal">
                   <vs-button  @click="Afficher" type='filled' color='teal'>
                    + Creation du planning
                   </vs-button>
                </div>

                <br><br> 
                
              <div class="alert alert-success" v-if="affMsg">
                    <strong>Génial !!! </strong>l’opération est exécutée avec succès.
              </div>

                <div id="dateReel" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                            <br>
                            <label>Date du cours:</label>
                            <br>
                            <input :value="moment(passedData.jD).format('YYYY-MM-DD')" class="form-control" readonly>
                            <br>
                            <label>réelle debut :</label>
                            <br>
                            <input type='time' v-model="passedData.heureReelDebut"
                             class="form-control" />
                             <br>
                            <label>réelle fin :</label>
                            <br>
                            <input type='time' v-model="passedData.heureReelFin" class="form-control"/>
                            <br><br>
                            <button 
                                 @click="ModifierDateReel(passedData.dateReel,passedData.codemat,passedData.idProf,passedData.jD,passedData.heureReelDebut,passedData.heureReelFin)" 
                                 v-if="passedData.dateReelDebutCours==passedData.jD&&passedData.heureReelFinCours!='00:00'" 
                                 type="button"
                                 class="btn btn-success mr-2" 
                                 data-dismiss="modal">
                                 Enregistrer la modification
                            </button>
                            <button 
                                 v-else 
                                 @click="EnregistrerDateReel(passedData.codemat,passedData.idProf,passedData.idEns,passedData.jD,passedData.heureReelDebut,passedData.heureReelFin)" 
                                 type="button" 
                                 class="btn btn-success mr-2" 
                                 data-dismiss="modal">
                                 Sauvegarder
                            </button>
                            <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                <div class="table-responsive">
                  <!--h3>Liste des eleves de la classe de : {{libelleClasse}}</h3-->
                      <table 
                      id="example" 
                      class="table-bordered display expandable-table" 
                      style="width:100%">
                        <thead>
                          <tr>
                              <th width="120px">Horaire</th>
                              <th width="150px">Lundi    {{j1}}</th>
                              <th width="150px">Mardi    {{j2}}</th>
                              <th width="150px">Mercredi {{j3}}</th>
                              <th width="150px">Jeudi    {{j4}}</th>
                              <th width="150px">Vendredi  {{j5}}</th>
                          </tr>
                        </thead>
                <tbody>
                  <tr v-for="h in horaires" :key="h.idEns">
                      <td>{{h.heureMinuteD +' - '+ h.heureMinuteF}}</td>
                      <td>
                        <div v-for="e in emploi_du_temps" :key="e.idEns">
                          <div v-if="e.jour==2 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                               {{e.nomMatiere}}
                               <br><br>
                               {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                               <div class="form-check form-check-success">
                                  <label>
                                    <button @click="FairePointageDebut(e.dateReel,e.codemat,e.idProf,e.dateReelDebutCours,e.heureReelFin,e.idEns,jD1,e.heureReelDebut,e.heureReelFin)" class="btn btn btn-sm" data-toggle="modal" data-target="#dateReel">
                                        <input type="checkbox" :checked="(e.jourMoisReelDebut==j1&&e.heureReelFin!='00:00')?true:false" disabled>
                                        <!--&&moment(e.dateReelFin).format('DD/MM')==j1-->
                                    </button>
                                    <button v-if="e.jourMoisReelDebut!=j1" @click="Modifier(e.idEns,jD1,e.heureDebut,e.heureFin,e.nomMatiere,e.nomPrenom)" class="btn btn btn-sm" data-toggle="modal" data-target="#upd">
                                      <i class="ti-pencil" id='modif'></i>
                                    </button>
                                    <button v-if="e.jourMoisReelDebut!=j1" @click="Supprimer(e.idEns)" class="btn btn btn-sm"><i class="ti-trash" id='su'></i></button>
                                </label>
                              </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div v-for="e in emploi_du_temps" :key="e.idEns">
                          <div v-if="e.jour==3 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                               {{e.nomMatiere}}
                               <br><br>
                               {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                               <div>
                                  <label>
                                    <button @click="FairePointageDebut(e.dateReel,e.codemat,e.idProf,e.dateReelDebutCours,e.heureReelFin,e.idEns,jD2,e.heureReelDebut,e.heureReelFin)" class="btn btn btn-sm" data-toggle="modal" data-target="#dateReel">
                                      <input type="checkbox" :checked="(e.jourMoisReelDebut==j2&&e.heureReelFin!='00:00')?true:false" disabled>
                                      <!--&&moment(e.dateReelFin).format('DD/MM')==j2-->
                                    </button>
                                    <button v-if="e.jourMoisReelDebut!=j2" @click="Modifier(e.idEns,jD2,e.heureDebut,e.heureFin,e.nomMatiere,e.nomPrenom)" class="btn btn btn-sm" data-toggle="modal" data-target="#upd">
                                      <i class="ti-pencil" id='modif'></i>
                                    </button>
                                    <button class="btn btn btn-sm" v-if="e.jourMoisReelDebut!=j2" @click="Supprimer(e.idEns)"><i class="ti-trash" id='su'></i></button>
                                </label>
                              </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div v-for="e in emploi_du_temps" :key="e.idEns">
                          <div v-if="e.jour==4 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                               {{e.nomMatiere}}
                               <br><br>
                               {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                               <div class="form-check form-check-success">
                                <label>
                                    <button @click="FairePointageDebut(e.dateReel,e.codemat,e.idProf,e.dateReelDebutCours,e.heureReelFin,e.idEns,jD3,e.heureReelDebut,e.heureReelFin)" class="btn btn btn-sm" data-toggle="modal" data-target="#dateReel">
                                      <input type="checkbox" :checked="(e.jourMoisReelDebut==j3&&e.heureReelFin!='00:00')?true:false" disabled>
                                      <!---&&moment(e.dateReelFin).format('DD/MM')==j3-->
                                    </button>
                                    <button v-if="e.jourMoisReelDebut!=j3" @click="Modifier(e.idEns,jD3,e.heureDebut,e.heureFin,e.nomMatiere,e.nomPrenom)" class="btn btn btn-sm" data-toggle="modal" data-target="#upd">
                                      <i class="ti-pencil" id='modif'></i>
                                    </button>
                                    <button class="btn btn btn-sm" v-if="e.jourMoisReelDebut!=j3" @click="Supprimer(e.idEns)"><i class="ti-trash" id='su'></i></button>
                                </label>
                              </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div v-for="e in emploi_du_temps" :key="e.idEns">
                          <div v-if="e.jour==5 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                               {{e.nomMatiere}}
                               <br><br>
                               {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                               <div class="form-check form-check-success">
                                  <label>
                                      <button @click="FairePointageDebut(e.dateReel,e.codemat,e.idProf,e.dateReelDebutCours,e.heureReelFin,e.idEns,jD4,e.heureReelDebut,e.heureReelFin)" class="btn btn btn-sm" data-toggle="modal" data-target="#dateReel">
                                        <input type="checkbox" :checked="(e.jourMoisReelDebut==j4&&e.heureReelFin!='00:00')?true:false" disabled>
                                        <!--&&moment(e.dateReelFin).format('DD/MM')==j4-->
                                      </button>
                                      <button v-if="e.jourMoisReelDebut!=j4" @click="Modifier(e.idEns,jD4,e.heureDebut,e.heureFin,e.nomMatiere,e.nomPrenom)" class="btn btn btn-sm" data-toggle="modal" data-target="#upd">
                                        <i class="ti-pencil"  id='modif'></i>
                                      </button>
                                      <button class="btn btn btn-sm" v-if="e.jourMoisReelDebut!=j4" @click="Supprimer(e.idEns)"><i class="ti-trash" id='su'></i></button>
                                  </label>
                              </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div v-for="e in emploi_du_temps" :key="e.idEns">
                          <div v-if="e.jour==6 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                               {{e.nomMatiere}}
                               <br><br>
                               {{e.sexe=='Masculin' ? 'Mr '+e.nomPrenom:'Mme '+e.nomPrenom}}
                               <div class="form-check form-check-success">
                                  <label>
                                    <button @click="FairePointageDebut(e.dateReel,e.codemat,e.idProf,e.dateReelDebutCours,e.heureReelFin,e.idEns,jD5,e.heureReelDebut,e.heureReelFin)" class="btn btn btn-sm" data-toggle="modal" data-target="#dateReel">
                                    <input type="checkbox" :checked="(e.jourMoisReelDebut==j5&&e.heureReelFin!='00:00')?true:false" disabled>
                                    <!-- &&moment(e.dateReelFin).format('DD/MM')==j5 -->
                                  </button>
                                    <button v-if="e.jourMoisReelDebut!=j5" @click="Modifier(e.idEns,jD5,e.heureDebut,e.heureFin,e.nomMatiere,e.nomPrenom)" class="btn btn btn-sm" data-toggle="modal" data-target="#upd">
                                      <i class="ti-pencil" id='modif'></i>
                                    </button>
                                    <button class="btn btn btn-sm" v-if="e.jourMoisReelDebut!=j5" @click="Supprimer(e.idEns)"><i class="ti-trash" id='su'></i></button>
                                  </label>
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
    <!-- MODIFICATION -->
    <div id="upd" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <label>Jour</label>
                <VueDatePicker v-model="passedDataModif.dateHeurePlanDebut" class="form-control" 
                format="dddd" :locale="locale" @onClose="isVisible=false"/>
                <br>
                <label>Date du cours</label>
                <VueDatePicker v-model="passedDataModif.dateHeurePlanDebut" class="form-control" format="YYYY-MM-DD" :locale="locale" @onClose="isVisible = false" />
                <br>
                <label>Heure du debut du cours</label>
                <input type="time" v-model="passedDataModif.heureDebut" class="form-control"/>
                <br>
                <label>Heure de fin du cours</label>
                <input type="time" v-model="passedDataModif.heureFin" class="form-control"/>
                <br>
                <label>Nom de la matiere</label>
                <input v-model="passedDataModif.nomMatiere" class="form-control" readonly/>
                <br>
                <label>Nom de professeur</label>
                <input v-model="passedDataModif.nomPrenom" class="form-control" readonly/>
                <br>
                <button @click="EnregistrerModif(passedDataModif.idEns,passedDataModif.dateHeurePlanDebut,passedDataModif.heureDebut,passedDataModif.heureFin)" type="button" class="btn btn-success mr-2" data-dismiss="modal">Sauvegarder</button>
                <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                </div>
              </div>
            </div>
    </div>

    <!-- AJOUTER -->
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body" >
              <label>Jour</label>
                <VueDatePicker :allowed-dates='allowedDates'  v-model="jour" class="form-control" format="dddd" :locale="locale" @onClose="isVisible=false" />
              <br>
              <label>Date du cours</label>
              <VueDatePicker v-model="jour" class="form-control" format="YYYY-MM-DD" :locale="locale" @onClose="isVisible = false" />
              <br>
              <label>Heure du debut du cours</label>
              <input type="time" v-model="heureD" class="form-control"/>
              <br>
              <label>Heure de fin du cours</label>
              <input type="time" v-model="heureF" class="form-control"/>
              <br>
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
      locale: {lang: 'fr',endDay:'6',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D']},
      allowedDates:val=>![0,6].includes(new Date(val).getDay()),
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
      jD1:'',
      j2:'',
      jD2:'',
      j3:'',
      jD3:'',
      j4:'',
      jD4:'',
      j5:'',
      jD5:'',
      //passedData:{dateReelDebutCours:'',idEns:'',jD:'',heureReelDebut:'',heureReelFin:''},
      passedData:{dateReel:'',codemat:'',idProf:'',dateReelDebutCours:'',heureReelFinCours:'',idEns:'',jD:'',heureReelDebut:'',heureReelFin:''},
      passedDataModif:{idEns:'',dateHeurePlanDebut:'',heureDebut:'',heureFin:'',nomMatiere:'',nomPrenom:''},
      affMsg:false
  }
 },
 methods:{
  FairePointageDebut(dateReel,codemat,idProf,dateReelDebutCours,heureReelFinCours,idEns,jD,heureReelDebut,heureReelFin){
      if(dateReelDebutCours==jD){
          if(heureReelFin=='00:00'){
            this.passedData={dateReel,codemat,idProf,dateReelDebutCours,heureReelFinCours,idEns,jD,heureReelDebut,heureReelFin:''}
          }else{
            this.passedData={dateReel,codemat,idProf,dateReelDebutCours,heureReelFinCours,idEns,jD,heureReelDebut,heureReelFin}
          }
      }else{
          const hrd=''
          const hrf=''
          this.passedData={codemat:codemat,idProf:idProf,dateReelDebutCours:dateReelDebutCours,heureReelFinCours:heureReelFinCours,idEns:idEns,jD:jD,heureReelDebut:hrd,heureReelFin:hrf}
      }
  },
  ModifierDateReel(dateReel,codemat,idProf,jD,heureReelDebut,heureReelFin){
      const data={dateReel:dateReel,idClasse:this.idClasse,codemat:codemat,idProf:idProf,dateReelDebut:jD+' '+heureReelDebut,dateReelFin:jD+' '+heureReelFin}
      HTTP.post('/modifierDateReel',data).then((response)=>{
        if(response.data.msg200){
           this.$swal(response.data.msg200,{icon:'success'})
        }
      })
  },
  Supprimer(idEns){
      this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/supprimer/planning/${idEns}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href='/planning'
                                  })
                                }
                            })
                        }
                    })
  },
  EnregistrerDateReel(codemat,idProf,idEns,jD,heureReelDebut,heureReelFin){
      //console.log(dateHeurePlanDebut,dateHeurePlanFin,codemat,idProf,dateReelDebutCours,idEns,jD,heureReelDebut,heureReelFin)    
      const data={idEns:idEns,dateReelDebut:jD+' '+heureReelDebut,dateReelFin:jD+' '+heureReelFin}
      HTTP.post('/enregistrerdateReel',data).then((response)=>{console.log(response)})
      if(heureReelFin!=''){
        const data={idClasse:this.idClasse,idProf:idProf,codemat:codemat,dateReelDebut:jD+' '+heureReelDebut,dateReelFin:jD+' '+heureReelFin}
        HTTP.post('/archiveHeureTravaille',data).then((response)=>{console.log(response)})
      }

      this.affMsg=true
  },
  Modifier(idEns,dateHeurePlanDebut,heureDebut,heureFin,nomMatiere,nomPrenom){
    this.passedDataModif={idEns,dateHeurePlanDebut,heureDebut,heureFin,nomMatiere,nomPrenom}
  },
  Sauvegarder(){
     const data={
      dateheurePlanD:moment(this.jour).format("YYYY-MM-DD") + ' '+this.heureD,//moment(this.jour+''+this.heureD).format("YYYY-MM-DD HH:mm"),
      dateheurePlanF:moment(this.jour).format("YYYY-MM-DD") + ' '+this.heureF,//moment(this.jour+''+this.heureF).format("YYYY-MM-DD HH:mm"),
      idClasse:this.idClasse,
      codemat:this.codemat,
      idProf:this.idProf,
      heureD:this.heureD
     }
    HTTP.post('/ajouterEdt',data).then((response)=>{
        if(response.data.msg404){
            this.$swal(response.data.msg404,{icon:'error'})
        }else{
           this.$swal(response.data.msg200,{icon:'success'})
           this.heureD=''
           this.heureF=''
        }
    })
  },
  Matiere(){
            HTTP.get(`/professeur/matiereClasse/${this.idClasse}`)
            .then((response)=>{
                this.matieres = response.data.result
                this.codemat=response.data.codemat
            })
        },
  Professeur(){
        HTTP.get('/professeur/liste').then((response)=>{
              this.profs = response.data.result
              this.idProf = response.data.idProf
        })
  },
  Classe(){
            HTTP.get('/professeur/listeClasse').then((response)=>{
                this.classes = response.data.result
                this.idClasse = response.data.idClasse
            })
  },
  EnregistrerModif(idEns,dateHeurePlan,heureDebut,heureFin){
        const data={
          idEns:idEns,
          dateHeurePlanDebut:moment(dateHeurePlan).format("YYYY-MM-DD")+ ' '+heureDebut,
          dateHeurePlanFin:moment(dateHeurePlan).format("YYYY-MM-DD")+ ' '+heureFin,
        }
        HTTP.post('/edt/modifier',data).then((response)=>{
            if(response.data.msg200){
                this.$swal(response.data.msg200,{icon:'success'})
            }
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
           this.jD1=moment(firstDay).format("YYYY/MM/DD")
           this.j2=moment(secondDay).format("DD/MM")
           this.jD2=moment(secondDay).format("YYYY/MM/DD")
           this.j3=moment(thirdDay).format("DD/MM")
           this.jD3=moment(thirdDay).format("YYYY/MM/DD")
           this.j4=moment(fourDay).format("DD/MM")
           this.jD4=moment(fourDay).format("YYYY/MM/DD")
           this.j5=moment(lastDay).format("DD/MM")
           this.jD5=moment(lastDay).format("YYYY/MM/DD")
      },
      CorpsEdt(){
           const firstDay = this.t(this.today)
           const lastDay = new Date(firstDay)
           lastDay.setDate(lastDay.getDate() + 4)
           const p=moment(firstDay).format("YYYY-MM-DD")
           const d=moment(lastDay).format("YYYY-MM-DD")           
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
          HTTP.get(`/horaire/${p}/${d}/${this.idClasse}`)
          .then((response)=>{
              this.horaires=response.data
           })
      },
      Afficher(){
          this.aff=true
          this.Horaire()
          this.CorpsEdt()
          this.Matiere()
          this.affMsg=false
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
    /*background-size:0vmax;*/
  }
  #fait{
    color:green;
  }
  #nonfait{
    color:red
  }
  #modif{
    color:blue;
  }
  #su{
    color:red;
  }
  /*input[type="checkbox"][disabled]{
    accent-color:blue;
    outline:1px solid black;
    
     }*/
    
</style>
