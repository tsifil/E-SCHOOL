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
                            <router-link :to="{name:'VerificationAppel'}">+ Verifier l'appel deja realise</router-link>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
        <div class="card-body">
           
            <div class="table-responsive">
                <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Classe</th>
                            <th>Heure d'enregistrement</th>
                            <th>Matière</th>
                            <th>Trimestre</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="l in listes" :key="l.idAbsences">
                              <!--{{l.idClasse}}-->
                                <td>{{moment(l.dateAbs).format("YYYY-MM-DD")}}</td>
                                <td>{{l.libelleClasse}}</td>
                                <td>{{l.heureEnr}}</td>
                                <td>{{l.nomMatiere}}</td>
                                <td>{{l.libelle}}</td>
                                <td>
                                    <router-link class="btn btn-success btn-sm"
                                     :to="{name:'PresenceEleves',
                                     params:{dateAbs:moment(l.dateAbs).format('YYYY-MM-DD'),idClasse:l.idClasse,heureEnr:l.heureEnr}}">
                                     <i class="ti-eye"></i>
                                    </router-link></td>
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
  </template>

<script>
import {HTTP} from '../../../../http-constants'
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
    export default{
        components:{NavHaut,NavGauche},
        async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
        data(){
            return{
                //locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],},
                descriptionItems:[8,20,30],
                idAs:this.$store.getters.getAnneeScoProf.idAs,
                idProf:this.$store.getters.getProf.idProf,
                listes:[]
            }
        },
        methods:{
           ListeAppel(){
             HTTP.get(`/verificationAppel/${this.idAs}/${this.idProf}`).then((response)=>{
                this.listes=response.data
             })
           } 
        },
        mounted(){
            this.ListeAppel()
        }
    }
</script>