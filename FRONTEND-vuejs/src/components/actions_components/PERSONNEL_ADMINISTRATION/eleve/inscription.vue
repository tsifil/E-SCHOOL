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
                  
            <form @submit.prevent="Enregistrer()">
                    <p class="card-description">
                      Information personnel(le)
                    </p>
                     <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Nom*</label>
                          <div class="col-sm-9">
                            <input type="text"
                                v-model.trim="$v.nom.$model"
                                :class="{'is-invalid':$v.nom.$error,'is-valid':!$v.nom.$invalid}" 
                                class="form-control" placeholder="Nom d'élève"/>

                               <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                                <div class="invalid-feedback">
                                  <span v-if="!$v.nom.required">Veuillez remplir ce champ obligatoire.</span> 
                               </div>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Prénom(s)</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="prenom"  placeholder="Prenom(s) d'élève"/>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6">
                            <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Votre photo*</label>
                            <div class="col-sm-9">
                                <img :src="image" alt="" style="height:130px"/>
                                <label style="display:block;width:200px; height:45px;" 
                                  class="btn btn-info"
                                  onclick="document.getElementById('getFile').click()">Choisir la photo d’élève</label>
                                <input type='file' id="getFile" style="display:none" @change="onFileChange($event)">
                            </div>
                            </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Né(e) le*</label>
                            <div class="col-sm-9">
                                <VueDatePicker
                                class="form-control"
                                format="YYYY-MM-DD"
                                :locale="locale"
                                @onClose="isVisible = false"
                                button-validate="Ok"
                                button-cancel="Annuler"
                                validate 
                                v-model="dateNaissance"
                                min-date="1000-12-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">à*</label>
                          <div class="col-sm-9">
                            <input class="form-control"
                             v-model.trim="$v.lieuNaissance.$model"
                             :class="{'is-invalid':$v.lieuNaissance.$error,'is-valid':!$v.lieuNaissance.$invalid}"
                              placeholder="Lieu de naissance"/>

                              <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                              <div class="invalid-feedback">
                                <span v-if="!$v.lieuNaissance.required">Veuillez remplir ce champ obligatoire.</span> 
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Nationalité*</label>
                          <div class="col-sm-9">
                            <select v-model="nationalite" class="form-control">
                                <option value="Malgache">Malgache</option>
                                <option value="Français">Français</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Genre*</label>
                          <div class="col-sm-4">
                            <div class="form-check">
                              <label>
                                <input type="radio" v-model="sexe" value="Masculin"/> <label> Masculin</label>
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label>
                                <input type="radio" v-model="sexe" value="Féminin"/> <label> Féminin</label>
                              </label>
                            </div>
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
                          <label class="col-sm-3 col-form-label">Allergies</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="allergie" placeholder="aliments et médicaments "/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Vient de l'école</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="ancienEcole" placeholder="ancien école"/>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="row">
                      
                      <div class="col-md-6">

                      <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Classe*</label>
                          <div class="col-sm-9">
                            <select 
                             v-model="idClasse"
                             :class="{'is-invalid':$v.idClasse.$error,'is-valid':!$v.idClasse.$invalid}"
                             class="form-control">
                                <option disabled value="">Veuillez Choisir la classe</option>
                                <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                                    {{l.libelleClasse}}
                                </option>
                            </select>
                            <!--  -->
                            <div class="valid-feedback">
                                  ce champ est valide.
                               </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.idClasse.required">Veuillez remplir ce champ obligatoire.</span> 
                            </div>

                          </div>
                        </div>

                        </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Inscription a l'ecole partir du</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="dateIncription" readonly/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Fille/Fils de*</label>
                          <div class="col-sm-9">
                            <selection v-model="idPers_etre_pere" :options="pere" :settings="{ width:'100%' }"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Et*</label>
                          <div class="col-sm-9">
                            <selection v-model="idPers_etre_mere" :options="mere" :settings="{ width:'100%' }"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p class="card-description">
                      Protection  
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Personne à contacter en cas d’urgence*</label>
                          <div class="col-sm-9">
                            <selection v-model="idPers" :options="personne" :settings="{ width:'100%' }"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Porteur d'enfant</label>
                          <div class="col-sm-9">
                            <textarea class="form-control" v-model="porteur"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description">
                      Autorisation 
                    </p>
                <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Autoriser l'enfant à avoir la mesure d’urgence</label>
                          <div class="col-sm-9">
                            <select 
                              v-model="mesureUrgence" class="form-control">
                              <option value="OUI">OUI</option>
                              <option value="NON">NON</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Autoriser l'enfant à être filmer et ou photographier<!--Autoriser l'enfant à être photographier et ou filmer--></label>
                          <div class="col-sm-9">
                            <select v-model="autorisationCamera" class="form-control">
                              <option value="OUI">OUI</option>
                              <option value="NON">NON</option>
                            </select>                          
                          </div>
                        </div>
                    </div>
                </div>
                    <input type="button" @click="Reinitialiser()" class="btn btn-danger mr-2" value="Réinitialiser"/>
                    <input type="submit" class="btn btn-success mr-2" value="Enregistrer"/>
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
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import moment from 'moment'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import { required } from 'vuelidate/lib/validators'

export default{
    components:{VueDatePicker,NavHaut,NavGauche},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
    data(){
        return{
          myOptions: ['op1', 'op2', 'op3'],
            locale: {
                lang: 'fr',
                weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            },
            idPers:'',
            idPers_etre_pere:'4',
            idPers_etre_mere:'5',
            pere:[],
            mere:[],
            /*selectPere:'connu',
            selectMere:'connue',*/
            personne:[],
            idClasse:'',
            nomPrenom1:'',
            idAs:this.$store.getters.getUserAnnee.idAs,
            dateIncription:moment().format("YYYY-MM-DD"),
            ancienEcole:'',
            nom:'',
            prenom:'',
            image:'images/b3.PNG',
            file:'',
            dateNaissance:moment().format("YYYY-MM-DD"),
            lieuNaissance:'',
            sexe:'Féminin',
            nationalite:'Malgache',
            allergie:'',
            porteur:'',
            activer:false,
            mesureUrgence:'OUI',
            autorisationCamera:'OUI',
            listeClasse:[],
        }
    },
    validations: {
      nom:{
        required
      },
      lieuNaissance:{
        required
      },
      idClasse:{
        required
      },
      idPers_etre_pere:{
        required
      },
      idPers_etre_mere:{
        required
      },
      idPers:{
        required
      },
      mesureUrgence:{
        required
      },
      autorisationCamera:{
        required
      }
    },
    methods:{
        Liste(){
            HTTP.get('/listeClasse').then((response)=>{
                this.listeClasse = response.data
            })
        },
       onFileChange(event){
                    this.file = event.target.files[0]
                    this.image = URL.createObjectURL(this.file)
        },
        PereEleve(){
          HTTP.get('/personnePere').then((response)=>{
             this.pere = response.data
          })
        },
        MereEleve(){
          HTTP.get('/personneMere').then((response)=>{
             this.mere = response.data
          })
        },
        Personne(){
          HTTP.get('/listePersonnelContacter').then((response)=>{
             this.personne = response.data.result
             this.idPers = response.data.idPers
          })
        },
        vider(){
            //this.idPers_etre_pere=''
            //this.idPers_etre_mere=''
            //this.idPers=''
            this.idClasse=''
            this.ancienEcole=''
            this.nom=''
            this.prenom=''
            this.lieuNaissance=''
            this.allergie=''
            this.porteur=''
        },
        Reinitialiser(){
             this.vider()
        },
        Enregistrer(){
                      this.$v.$touch()
                          if(this.$v.$invalid){
                            console.log("Remplir tout")
                          }else{
                        const data = new FormData();
                        
                                  data.append("idPers_etre_pere",this.idPers_etre_pere)
                                  data.append("idPers_etre_mere",this.idPers_etre_mere)
                                  data.append("image",this.image)
                                  //data.append("selectPere",this.selectPere)
                                  //data.append("selectMere",this.selectMere)
                                  data.append("idPers",this.idPers)
                                  data.append("idClasse",this.idClasse)
                                  data.append("idAs",this.idAs)
                                  data.append("dateInscription",this.dateIncription)
                                  data.append("ancienEcole",this.ancienEcole)
                                  data.append("nom",this.nom);
                                  data.append("prenom",this.prenom)
                                  data.append("file",this.file);                                  
                                  data.append("dateNaissance",this.dateNaissance)
                                  data.append("lieuNaissance",this.lieuNaissance)
                                  data.append("sexe",this.sexe)
                                  data.append("nationalite",this.nationalite)
                                  data.append("allergie",this.allergie)
                                  data.append("porteur",this.porteur)
                                  data.append("mesureUrgence",this.mesureUrgence)
                                  data.append("autorisationCamera",this.autorisationCamera)

                            HTTP.post('/ajouterEleve',data,{headers:{"Content-Type":"multipart/form-data"}}).then((response)=>{
                                    if(response.data.msg404){
                                        this.$swal(response.data.msg404)
                                    }else if(response.data.msg202){
                                        this.vider()
                                         this.$router.replace({ name: "EleveListeInscrit"})   
                                         this.$swal(response.data.msg202,{icon:"success"})
                                    }  
                            })

                    }
          }
    },
    mounted(){
        this.Liste()
        this.PereEleve()
        this.MereEleve()
        this.Personne()
    }
}
</script>
