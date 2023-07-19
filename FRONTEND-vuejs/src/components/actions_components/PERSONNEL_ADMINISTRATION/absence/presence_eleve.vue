<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
            <div class="row">
                   <div class="form-group row">
                      <label for="exampleInputUsername2" class="col-sm-2 col-form-label">De : </label>
                      <div class="col-sm-9">
                        <VueDatePicker
                              class="form-control"
                              format="YYYY-MM-DD"
                              :locale="locale"
                              @onClose="isVisible = false"
                              v-model="dateDebut"
                              min-date="1000-12-12"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="exampleInputUsername2" class="col-sm-2 col-form-label"> A : </label>
                      <div class="col-sm-9">
                        <VueDatePicker
                              class="form-control"
                              format="YYYY-MM-DD"
                              :locale="locale"
                              @onClose="isVisible = false"
                              v-model="dateFin"
                              min-date="1000-12-12"/>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group row">
                        <div class="col-sm-12">
                            <button class="btn btn-info mr-2" @click="Afficher()">Afficher</button>
                        </div>
                      </div>
                    </div>
            </div>
<div class="col-md-12 grid-margin transparent">
    <div class="row">
        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-tale">
            <div class="card-body" v-for="r in retards" :key="r.ret">
                <p class="mb-4">En retard</p>
                    <p class="fs-30 mb-2">{{r.ret}}</p>
                    </div>
        </div>
        </div>

        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-dark-blue">
            <div class="card-body" v-for="j in justifiees" :key="j.just">
                <p class="mb-4">Absence justifiée</p>
                    <p class="fs-30 mb-2">
                        {{j.just}}
                    </p>
                    </div>
        </div>
        </div>
 
        <div class="col-md-4 mb-4 stretch-card transparent">
        <div class="card card-light-danger">
            <div class="card-body" v-for="a in injustifiees" :key="a.absInj">
                <p class="mb-4">Absence injustifiée</p>
                    <p class="fs-30 mb-2">{{a.absInj}}</p>
                    </div>
        </div>
        </div>

        </div>
        </div>
              <vs-table 
                search
                :max-items="descriptionItems[0]"
                pagination
                :data="listeAbsences"
                :description-items="descriptionItems"
                description-title="Enregistrements"
                description-connector="dans"
                description-body="Pages"
                id="table"
               >
                    <template slot="header">
                            <h3>
                                Absences
                            </h3>
                    </template>
                    <template slot="thead">

                            <vs-th>Eleve</vs-th>
                            <vs-th>Classe</vs-th>
                            <vs-th>Date</vs-th>
                            <vs-th>Matiere</vs-th>
                            <vs-th>Type d'absence</vs-th>
                            <vs-th>Est justifiee</vs-th>
                     </template>
                    <template slot-scope="{data}">                
                        <vs-tr :key="indextr" v-for="(tr,indextr) in data" >
                            <vs-td>{{data[indextr].nom}}</vs-td>
                            <vs-td>{{data[indextr].libelleClasse}}</vs-td>
                            <vs-td>{{moment(data[indextr].dateAbs).format('YYYY/MM/DD')}}</vs-td>
                            <vs-td>{{data[indextr].nomMatiere}}</vs-td>
                            <vs-td>{{data[indextr].typeAbsence}}</vs-td>
                            <vs-td>{{(data[indextr].motif=="")?'INJUSTIFIEE':'JUSTIFIEE : Motif : '+data[indextr].motif}}</vs-td>
                            <vs-td v-if="data[indextr].motif==''">
                                <div data-toggle="modal" data-target="#myModal">
                                    <vs-button @click="test(data[indextr].idAbsence,data[indextr].typeAbsence)" color="blue">
                                        Justification
                                    </vs-button>
                                </div>
                            </vs-td>
                        </vs-tr>

                    </template>
              </vs-table>    
              <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br><br>
                              <label>Type d'absence:</label>
                              <select v-model="passedData.type"  class="form-control">
                                <option value="En retard">En retard</option>
                                <option value="Absence">Absence</option>
                              </select>
                              <br>
                              <label>Motif(s):</label>
                              <textarea v-model="motifAbs" class="form-control" placeholder="Le motif d'absence"></textarea>
                              <br><br>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                                 @click="EnregistrerMotif(passedData.idAbs,passedData.type)">Enregistrer
                              </button>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                          </div>
                        </div>
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
import moment from 'moment';
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
    export default{
        components:{NavHaut,NavGauche,VueDatePicker},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        },
        data(){
            return{
                locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],},
                listeAbsences:[],
                numMatricule:'',
                dateDebut:moment(new Date()).format("YYYY-MM-DD"),
                dateFin:moment(new Date()).format("YYYY-MM-DD"),
                idClasseParams:this.$route.params.idClasse,
                heureEnr:this.$route.params.heureEnr,
                descriptionItems:[8,20,30],
                idAs:this.$store.getters.getUserAnnee.idAs,
                retards:[],
                injustifiees:[],
                justifiees:[],
                passedData:{idAbs:null,type:''},
                motifAbs:''
            }
        },
        methods:{
            test(idAbs,type){
                this.passedData={idAbs,type}
            },
            EnregistrerMotif(idAbs,type){
                const data={idAbs:idAbs,type:type,motif:this.motifAbs}
                HTTP.post('/absence/admin/justifierAbsence',data).then((response)=>{
                    if(response.data.msg200){
                         this.$swal(response.data.msg200,{icon:'success'})
                    }
                })
            },
            ListeAbsencePOST(){
                const data={idAs:this.idAs,dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/Admin/listeAbsence',data).then((response)=>{
                    this.listeAbsences=response.data
                })
            },
            NombreRetardsPOST(){
                const data={dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/Admin/nombreRetards',data).then((response)=>{
                    this.retards=response.data
                })
             },
             NombreAbsInjustifieePOST(){
                const data={dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/Admin/nombreAbsences/Injustifiee',data).then((response)=>{
                    this.injustifiees=response.data
                })
             },
             NombreAbsJustifieePOST(){
                const data={dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/Admin/nombreAbsences/justifiee',data).then((response)=>{
                    this.justifiees=response.data
                })
             },
            Afficher(){
                this.ListeAbsencePOST()
                this.NombreRetardsPOST()
                this.NombreAbsInjustifieePOST()
                this.NombreAbsJustifieePOST()
            },
             ListeAbsence(){
                    HTTP.get(`/Admin/listeAbsence/${this.idAs}/${this.dateDebut}/${this.dateFin}`)
                    .then((response)=>{
                        this.listeAbsences=response.data
                    })
             },
             NombreRetards(){
                HTTP.get(`/Admin/nombreRetards/${this.heureEnr}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.retards=response.data
                })
             },
             NombreAbsInjustifiee(){
                HTTP.get(`/Admin/nombreAbsences/Injustifiee/${this.heureEnr}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.injustifiees=response.data
                })
             },
             NombreAbsJustifiee(){
                HTTP.get(`/Admin/nombreAbsences/justifiee/${this.heureEnr}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.justifiees=response.data
                })
             }
        },
        mounted(){
            this.ListeAbsence()
            this.NombreAbsInjustifiee()
            this.NombreAbsJustifiee()
            this.NombreRetards()
        }
    }
</script>