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
    <vs-tabs alignment="fixed">
      <vs-tab label="Dossier scolaire">
            <div>
                <form
                         @submit.prevent="Enregistrer(e.idInscri,e.photo,e.porteur,e.mesureUrgence,e.autorisationCamera,
                         e.dateInscription,e.idPers,e.idClasse,idAs,numMatricule)" 
                         v-for="e in eleve" :key="e.idInscri">
                         
                    <p class="card-description">
                      Information personnel(le)
                    </p>
                    
                     <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Nom et Prénom(s)*</label>
                          <div class="col-sm-9">
                                <input type="text" v-model="e.nom" class="form-control" readonly/>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">N° matricule</label>
                          <div class="col-sm-9">
                                <input type="text" class="form-control" :value="(e.sexe=='Masculin') ? numMatricule+'G':numMatricule+'F'"  readonly/>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Classe*</label>
                            <div class="col-sm-9">
                                <select v-model="e.idClasse" class="form-control">
                                    <option disabled value="">Veuillez Choisir la classe</option>
                                    <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                                        {{l.libelleClasse}}
                                    </option>
                                </select>
                            </div>
                        </div>

                      </div>
                      
                      <div class="col-md-6">
                            <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Votre photo*</label>
                            <div class="col-sm-9">
                                <img :src="file != '' ? image  : e.photo" alt="">
                                <!--input type="file" @change="onFileChange($event)" accept="image/*"/-->
                                <label style="display:block;width:200px; height:45px;" 
                                  class="btn btn-info"
                                  onclick="document.getElementById('getFile').click()">Nouvelle photo</label>
                                <input type='file' id="getFile" style="display:none" @change="onFileChange($event)">
                            </div>
                            </div>
                      </div>
                    </div>

                    <p class="card-description">
                      Autre 
                    </p>
                 
                    <div class="row">
                      <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Année scolaire</label>
                            <div class="col-sm-9">
                               <input type="text" class="form-control" v-model="libelleAs" readonly/>
                            </div>
                        </div>
                      </div>

                        <div class="col-md-6">
                            <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Inscription à l'école partir du</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" :value="moment(e.dateInscription).format('YYYY/MM/DD')" readonly/>
                            </div>
                            </div>
                        </div>
                        </div>
                  
                    <p class="card-description">
                      Protection et autorisation 
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Personne à contacter en cas d’urgence*</label>
                          <div class="col-sm-9">
                              <selection v-model="e.idPers" :options="personne" :settings="{ width:'100%' }"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Porteur d'enfant*</label>
                          <div class="col-sm-9">
                            <textarea class="form-control" v-model="e.porteur"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Autoriser l'enfant à avoir la mesure d’urgence</label>
                          <div class="col-sm-9">
                            <select 
                              v-model="e.mesureUrgence" class="form-control">
                              <option value="OUI">OUI</option>
                              <option value="NON">NON</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Autoriser l'enfant à être filmer et ou photographier</label>
                          <div class="col-sm-9">
                            <select v-model="e.autorisationCamera" class="form-control">
                              <option value="OUI">OUI</option>
                              <option value="NON">NON</option>
                            </select>                          
                          </div>
                        </div>
                    </div>
                </div>
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
                    <input type="submit" class="btn btn-success mr-2" value="Enregistrer"/>
            </form>
        </div>
      </vs-tab>
      <vs-tab label="Feuille de présence">
        <div>
              <feuillePresence_eleve></feuillePresence_eleve>
        </div>
      </vs-tab>
      
      <!--vs-tab label="Notes">
        <div>

        </div>
      </vs-tab-->

      <vs-tab label="Personne autorisé/à contacter">
        <div>
            <personneContacterVue></personneContacterVue>
        </div>
      </vs-tab>
    </vs-tabs>                
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
import feuillePresence_eleve from './feuillePresence_eleve.vue'
import personneContacterVue from './personneContacter.vue'

export default{
    components:{NavHaut,NavGauche,feuillePresence_eleve,personneContacterVue},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
    data(){
        return{
            eleve:[],
            numMatricule:this.$route.params.numMatricule,
            idAs:this.$store.getters.getUserAnnee.idAs,
            libelleAs:this.$store.getters.getUserAnnee.libelle,
            image:'',
            file:'',
            personne:[],
            listeClasse:[],
            listeAnnee:[],
        }
    },
    methods:{
        AnneeScolaire(){
            HTTP.get('/detail/liste/anneeScolaire')
            .then(response=>{
                    this.listeAnnee = response.data
            })
        },
        onFileChange(event){
                    this.file = event.target.files[0]
                    this.image = URL.createObjectURL(this.file)
        },
        Classe(){
            HTTP.get('/listeClasse').then((response)=>{
                this.listeClasse = response.data
            })
        },
        Personne(){
          HTTP.get('/listePersonnel').then((response)=>{
             this.personne = response.data
          })
        },
        EleveQui(){
            HTTP.get(`/detailEleveInscrit/${this.numMatricule}/${this.idAs}`).then((response)=>{
                this.eleve = response.data
            })
        },
        Enregistrer(idInscri,photoActuelle,porteur,mesureUrgence,autorisationCamera,
                    dateInscription,idPers,idClasse,idAs,numMatricule){

                    const data = new FormData();
                                  data.append("idInscri",idInscri)
                                  data.append("photoActuelle",photoActuelle)
                                  data.append("file",this.file);                                  
                                  data.append("porteur",porteur)
                                  data.append("mesureUrgence",mesureUrgence)
                                  data.append("autorisationCamera",autorisationCamera)
                                  data.append("dateInscription",dateInscription)
                                  data.append("idPers",idPers)
                                  data.append("idClasse",idClasse);
                                  data.append("idAs",idAs)
                                  data.append("numMatricule",numMatricule)

                    HTTP.post('/modifierEleveInscrit',data).then((response)=>{
                                if(response.data.msg404){
                                        this.$swal(response.data.msg40,{icon:"error"})
                                }else if(response.data.msg200){
                                         this.$router.replace({ name: "EleveListeInscrit"})   
                                         this.$swal(response.data.msg200,{icon:"success"})
                                }
                })
        }
    },
    mounted(){
        this.Classe()
        this.EleveQui()
        this.Personne()
        this.AnneeScolaire()
    }
}
</script>
