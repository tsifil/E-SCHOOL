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
                    <div class="form-group row">
                      <div class="col-sm-9">
                            <router-link :to="{name:'NouveauAbsence'}">+ Faire l'appel</router-link>
                            <br><br>
                            <router-link :to="{name:'VerificationAppel'}">+ Verifier l'appel déjà réalisé</router-link>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
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

                            <vs-td>
                                <vs-button @click="Supprimer(data[indextr].idAbsence)" v-if="data[indextr].motif==''" color="red">
                                    Supprimer
                                </vs-button>
                            </vs-td>
                            <router-view/>

                            </vs-tr>

                    </template>
              </vs-table>    
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
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import moment from 'moment';
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
    export default{
        components:{NavHaut,NavGauche,VueDatePicker},
        async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
        data(){
            return{
                locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],},
                listeAbsences:[],
                numMatricule:'',
                dateDebut:(this.$route.params.idClasse==null)?moment(new Date()).format("YYYY-MM-DD"):this.$route.params.dateAbs,
                dateFin:(this.$route.params.idClasse==null)?moment(new Date()).format("YYYY-MM-DD"):this.$route.params.dateAbs,
                idClasseParams:this.$route.params.idClasse,
                heureEnr:this.$route.params.heureEnr,
                descriptionItems:[4,8,12],
                idAs:this.$store.getters.getAnneeScoProf.idAs,
                retards:[],
                injustifiees:[],
                justifiees:[],
                idProf:this.$store.getters.getProf.idProf,
            }
        },
        methods:{
            ListeAbsencePOST(){
                const data={idAs:this.idAs,dateDebut:this.dateDebut,dateFin:this.dateFin,idProf:this.idProf}
                HTTP.post('/listeAbsence',data).then((response)=>{
                    this.listeAbsences=response.data
                })
            },
            NombreRetardsPOST(){
                const data={idProf:this.idProf,dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/nombreRetards',data).then((response)=>{
                    this.retards=response.data
                })
             },
             NombreAbsInjustifieePOST(){
                const data={idProf:this.idProf,dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/nombreAbsences/Injustifiee',data).then((response)=>{
                    this.injustifiees=response.data
                })
             },
             NombreAbsJustifieePOST(){
                const data={idProf:this.idProf,dateDebut:this.dateDebut,dateFin:this.dateFin}
                HTTP.post('/nombreAbsences/justifiee',data).then((response)=>{
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
                    HTTP.get(`/listeAbsence/${this.heureEnr}/${this.idClasseParams}/${this.idAs}/${this.dateDebut}/${this.dateFin}/${this.idProf}`)
                    .then((response)=>{
                        this.listeAbsences=response.data
                    })
             },
             NombreRetards(){
                HTTP.get(`/nombreRetards/${this.idProf}/${this.idClasseParams}/${this.heureEnr}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.retards=response.data
                })
             },
             NombreAbsInjustifiee(){
                HTTP.get(`/nombreAbsences/Injustifiee/${this.idProf}/${this.heureEnr}/${this.idClasseParams}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.injustifiees=response.data
                })
             },
             NombreAbsJustifiee(){
                HTTP.get(`/nombreAbsences/justifiee/${this.idProf}/${this.heureEnr}/${this.idClasseParams}/${this.dateDebut}/${this.dateFin}`)
                .then((response)=>{
                    this.justifiees=response.data
                })
             },
             Supprimer(idAbsence){
                this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/absence/supprimer/${idAbsence}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href='/presence_eleve'
                                  })
                                }
                            }) 
                        }
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