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
                        <div class="col-md-3">
                          <selection v-model="numMatricule" :options="listeEnfant"/>
                        </div>
                        <div class="col-md-2">
                          <vs-button @click="Horaire()" type='filled' color="darkblue">
                            Afficher
                          </vs-button>
                        </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            
          
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <p class="card-description">
                        Emploi du temps
                    </p>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                            <th>Horaire</th>
                            <th>Lundi</th>
                            <th>Mardi</th>
                            <th>Mercredi</th>
                            <th>Jeudi</th>
                            <th>Vendredi</th>
                        </thead>
                        <tbody>
                          <tr v-for="h in horaires" :key="h.heureMinuteD">
                              <td>{{h.heureMinuteD +' - '+ h.heureMinuteF}}</td>
                      <td>
                            <div v-for="e in emploi_du_temps" :key="e.idEns">
                              <div v-if="e.jour==2 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                                  {{e.nomMatiere}}
                              </div>
                            </div>
                      </td>
                      <td>
                            <div v-for="e in emploi_du_temps" :key="e.idEns">
                              <div v-if="e.jour==3 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                                  {{e.nomMatiere}}
                              </div>
                            </div>
                      </td>
                      <td>
                            <div v-for="e in emploi_du_temps" :key="e.idEns">
                              <div v-if="e.jour==4 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                                  {{e.nomMatiere}}
                              </div>
                            </div>
                      </td>
                      <td>
                            <div v-for="e in emploi_du_temps" :key="e.idEns">
                              <div v-if="e.jour==5 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                                  {{e.nomMatiere}}
                              </div>
                            </div>
                      </td>
                      <td>
                            <div v-for="e in emploi_du_temps" :key="e.idEns">
                              <div v-if="e.jour==6 && e.heureDebut==h.heureMinuteD && e.heureFin==h.heureMinuteF">
                                  {{e.nomMatiere}}
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
      </div>
    </div>
  </template>
  
<script>
import NavHaut from '../includes/parent/Menu_haut.vue'
import NavGauche from '../includes/parent/Menu_gauche.vue'
import {HTTP} from '../../../http-constants'
//import AuthService from '@/services/AuthParent_Service.js';

    export default{
       components:{NavHaut,NavGauche},
       data(){
        return{
            nomUsage:'',
            secretMessage:'',
            annee_scolaire:'',
            idAs:this.$store.getters.getAnneeSco.idAs,
            idPers:this.$store.getters.getParent.idPers,
            listeEnfant:[],
            numMatricule:0,
            horaires:[],
            emploi_du_temps:[]
        }
    },
    /* PROTECTION ROUTES */
    async created(){
                    if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire) {
                            this.$router.push('/')
                    }else{
                        this.nomUsage = this.$store.getters.getParent.nomUsage
                        this.annee_scolaire = this.$store.getters.getAnneeSco.libelle
           }
        },
     methods:{
        deconnexion(){
            this.$store.dispatch('logoutParent')
            this.$router.push('/')
        },
        CorpsEdt(){
            HTTP.get(`/parent/corpsEdt/${this.numMatricule}/${this.idAs}`)
            .then((response)=>{
                this.emploi_du_temps=response.data
            })
        },
        Horaire(){
            HTTP.get(`/parent/planning/${this.numMatricule}/${this.idAs}`)
            .then((response)=>{
                this.horaires=response.data
                this.CorpsEdt()
            })
        },
        Enfant(){
            HTTP.get(`/parent/listeEnfant/${this.idAs}/${this.idPers}`)
            .then((response)=>{
                this.listeEnfant = response.data.result
                this.numMatricule = response.data.numMatricule
                this.Horaire()
            })
        }
      },
      mounted(){
        //this.EnfantPremier()
        this.Enfant()
        //this.Horaire()
      }
    }
</script>