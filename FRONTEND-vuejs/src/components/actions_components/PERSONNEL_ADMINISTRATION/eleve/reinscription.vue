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
                    <h4 class="card-title">Reinscription de : {{nom}}</h4>
                    <!-- comm -->
            <form @submit.prevent="Reinscription(r.porteur,r.idPers,r.mesureUrgence,r.autorisationCamera)" v-for="r in EleveReinscrit" :key="r.numMatricule">
                     <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Matricule*</label>
                          <div class="col-sm-9">
                            <input type="text" :value="(r.sexe == 'Masculin') ? numMatricule+'G' : numMatricule+'F'" class="form-control" readonly/>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Classe*</label>
                          <div class="col-sm-9">
                            <select v-model="idClasse" :class="{'is-invalid':$v.idClasse.$error,'is-valid':!$v.idClasse.$invalid}"
                             class="form-control">
                                <option disabled value="">Veuillez Choisir la classe</option>
                                <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                                    {{l.libelleClasse}}
                                </option>
                            </select>

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
                            <label class="col-sm-3 col-form-label">Votre photo actuelle*</label>
                            <div class="col-sm-9">
                                <img :src="image" alt="" style="height:130px"/>
                                <!--input type="file" @change="onFileChange($event)" accept="image/*"/-->
                           
                                <label style="display:block;width:200px; height:45px;" 
                                  class="btn btn-info"
                                  onclick="document.getElementById('getFile').click()">
                                  Choisir la photo d’élève
                                </label>
                                <input type='file' id="getFile" style="display:none" @change="onFileChange($event)">
                            
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
                            <selection v-model="r.idPers" :options="personne" :settings="{ width:'100%' }"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Porteur d'enfant*</label>
                          <div class="col-sm-9">
                            <textarea class="form-control" v-model="r.porteur"></textarea>
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
                            <select v-model="r.mesureUrgence" class="form-control">
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
                            <select v-model="r.autorisationCamera" class="form-control">
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
import moment from 'moment'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import {HTTP} from '../../../../http-constants'
import { required } from 'vuelidate/lib/validators'

export default {
    components:{NavHaut,NavGauche},
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
            libelleanneeSco:this.$store.getters.getUserAnnee.libelle,
            idAs:this.$store.getters.getUserAnnee.idAs,
            dateInscription:moment().format("YYYY-MM-DD"),
            listeClasse:[],
            idClasse:'',
            EleveReinscrit:[],
            numMatricule:this.$route.params.numMatricule,
            idAsParams:this.$route.params.idAs,
            file:'',
            personne:[],
            nom:'',
            image:'images/b3.PNG',
        }
    },
    validations:{
      idClasse:{
           required
      }
    },
    methods:{
        onFileChange(event){
                    this.file = event.target.files[0]
                    this.image = URL.createObjectURL(this.file)
        },
        Liste(){
            HTTP.get('/listeClasse').then((response)=>{
                this.listeClasse = response.data
            })
        },
        Personne(){
          HTTP.get('/listePersonnel').then((response)=>{
             this.personne = response.data
          })
        },
        Eleve(){
            HTTP.get(`/ficheReinscripion/${this.numMatricule}/${this.idAsParams}`).then((response)=>{
                this.EleveReinscrit = response.data.result
                this.nom = response.data.nom
            })
        },
        Reinscription(porteur,idPers,mesureUrgence,autorisationCamera){
          this.$v.$touch()
                if(this.$v.$invalid){
                      console.log("Remplir tout")
                }else{
                        const data = new FormData()
                        data.append("file",this.file)
                        data.append("image",this.image)
                        data.append("porteur",porteur)
                        data.append("mesureUrgence",mesureUrgence)
                        data.append("autorisationCamera",autorisationCamera)
                        data.append("dateInscription",this.dateInscription)
                        data.append("personneContacter",idPers)
                        data.append("idClasse",this.idClasse)
                        data.append("idAs",this.idAs)
                        data.append("numMatricule",this.numMatricule)

                        HTTP.post('/reinscription',data).then((response)=>{
                            if(response.data.msg200){
                                this.$swal(response.data.msg200,{icon:'success'})
                                this.$router.replace({name:'listeEleve'})
                            }
                        })
            }

        }
    },
    mounted(){
        this.Liste()
        this.Eleve()
        this.Personne()
    }
}
</script>

<style>
  .container-flex{
    display: flex;
    flex-direction:column;
    align-items:center;
  }
  img{
    width:150px;
    height:125px;
    margin-bottom:20px;
    object-fit:cover;
  }
</style>


