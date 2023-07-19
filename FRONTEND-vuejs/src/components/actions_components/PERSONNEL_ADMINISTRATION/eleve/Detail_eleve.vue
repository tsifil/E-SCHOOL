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
                    
            <form v-for="e in eleve" :key="e.numMatricule"
                  @submit.prevent="Enregistrer(e.nom,e.prenom,e.sexe,e.dateNaissance,e.lieuNaissance,e.nationalite,
                                        e.allergie,e.ancienEcole,e.idPers_etre_pere,e.idPers_etre_mere)" 
            >
                <p class="card-description">
                      Information personnel(le)  
                </p>

                     <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Nom*</label>
                          <div class="col-sm-9">
                            <input type="text" v-model="e.nom" class="form-control" placeholder="Nom d'eleve"/>                               
                          </div>
                        </div>

                      </div>
                      
                      <div class="col-md-6">

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Prénom(s)</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="e.prenom"  placeholder="Prenom(s) d'eleve"/>
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
                                v-model="e.dateNaissance"
                                min-date="1000-12-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">a*</label>
                          <div class="col-sm-9">
                            <input class="form-control"
                             v-model="e.lieuNaissance"
                              placeholder="Lieu de naissance"/>
                          
                           </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Nationalité*</label>
                          <div class="col-sm-9">
                            <select v-model="e.nationalite" class="form-control">
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
                                <input type="radio" v-model="e.sexe" value="Masculin"/> <label> Masculin</label>
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label>
                                <input type="radio" v-model="e.sexe" value="Féminin"/> <label> Féminin</label>
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
                            <input type="text" class="form-control" v-model="e.allergie" placeholder="aliments et médicaments "/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Vient de l'école</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="e.ancienEcole" placeholder="ancien école"/>
                          </div>
                        </div>

                      </div>
                    </div>
                   
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Fille/Fils de*</label>
                          <div class="col-sm-9">
                            <selection :options="pere" :settings="{ width:'100%' }" v-model="e.idPers_etre_pere"/>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Et*</label>
                          <div class="col-sm-9">
                            <selection :options="mere" :settings="{ width:'100%' }" v-model="e.idPers_etre_mere"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="aff">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Tuteur</label>
                          <div class="col-sm-9" v-for="t in tuteur" :key="t.tuteur">
                            <textarea v-model="t.tuteur" class="form-control" readonly></textarea>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        
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
import {HTTP} from '../../../../http-constants'
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'

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
            eleve:[],
            numMatricule:this.$route.params.numMatricule,
            tuteur:'',
            aff:false,
            pere:[],
            mere:[]
        }
    },
    methods:{
        Tuteur(){
          HTTP.get(`/tuteurEleve/${this.numMatricule}`).then((response)=>{
              this.tuteur = response.data
              if(this.tuteur!=""){
                this.aff = true
              }else{
                  this.aff = false 
              }
          })
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
        EleveQui(){
            HTTP.get(`/detailEleve/${this.numMatricule}`).then((response)=>{
                this.eleve = response.data
            })
        },
        Enregistrer(nom,prenom,sexe,dateNaissance,lieuNaissance,nationalite,
                    allergie,ancienEcole,idPers_etre_pere,idPers_etre_mere){
                    
                    const data = {
                        numMatricule:this.numMatricule,
                        nom:nom,
                        prenom:prenom,
                        sexe:sexe,
                        dateNaissance:dateNaissance,
                        lieuNaissance:lieuNaissance,
                        nationalite:nationalite,
                        allergie:allergie,
                        ancienEcole:ancienEcole,
                        idPers_etre_pere:idPers_etre_pere,
                        idPers_etre_mere:idPers_etre_mere,
                    }
                           
                    HTTP.post('/modifierEleve',data).then((response)=>{
                                if(response.data.msg404){
                                        this.$swal(response.data.msg40,{icon:"error"})
                                }else if(response.data.msg200){
                                         this.$router.replace({ name: "listeEleve"})   
                                         this.$swal(response.data.msg200,{icon:"success"})
                                }  
                    })
        }
    },
    mounted(){
        this.PereEleve()
        this.MereEleve()
        this.EleveQui()
        this.Tuteur()
    }
}
</script>
