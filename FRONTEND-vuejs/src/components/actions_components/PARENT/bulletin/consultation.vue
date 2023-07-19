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
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Nom d'élève</label>
                          <div class="col-sm-12">
                            <selection v-model="numMatricule" :options="listeEnfant"></selection>
                          </div>
                        </div>
                </div>
                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Classe</label>
                          <div class="col-sm-12">
                             <selection v-model="idClasse" :options="classes"/>
                          </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Trimestre</label>
                          <div class="col-sm-12">
                            <select v-model="idTrimestre" class="form-control">
                                    <option value="" disabled>-- Veuillez choisir le trimestre --</option>
                                    <option v-for="l in listeTrimestre" :key="l.idTrimestre" :value="l.idTrimestre">
                                        {{l.libelle}}
                                    </option>
                              </select>
                          </div>
                        </div>
                </div>
                
                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Evaluation</label>
                          <div class="col-sm-12">
                            <select v-model="idEvalua" class="form-control">
                              <option value="" disabled>-- Choix --</option>
                              <option v-for="e in evaluations" :key="e.idEvalua" :value="e.idEvalua">
                                  {{e.libelleEvalua}}
                              </option>
                            </select>                          
                          </div>
                        </div>
                </div>
                
                </div>

                  <div class="alert alert-danger" v-if="msg">
                    <span>Aucun bulletin disponible pour le moment !</span> 
                  </div>
                  <button @click="Voir" class="btn btn-info mr-2">Afficher</button>

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
import NavHaut from '../../includes/parent/Menu_haut.vue'
import NavGauche from '../../includes/parent/Menu_gauche.vue'

    export default{
        components:{NavHaut,NavGauche},
        async created(){
                    if(!this.$store.getters.isLoggedInParent || !this.$store.getters.isAnneeScolaire) {
                            this.$router.push('/')
                    }else{
                        this.nomUsage = this.$store.getters.getParent.nomUsage
                        this.annee_scolaire = this.$store.getters.getAnneeSco.libelle
           }
        },
        data(){
            return{
                idAs:this.$store.getters.getAnneeSco.idAs,
                idPers:this.$store.getters.getParent.idPers,
                listeEnfant:[],
                numMatricule:'',
                listeTrimestre:[],
                idTrimestre:'',
                evaluations:[],
                idEvalua:'',
                idClasse:'',
                classes:[],
                msg:false
            }
        },
        methods:{
            Enfant(){
                HTTP.get(`/parent/listeEnfant/${this.idAs}/${this.idPers}`)
                .then((response)=>{
                    this.listeEnfant = response.data.result
                    this.numMatricule = response.data.numMatricule
                })
            },
            Classe(){
                    HTTP.get('/professeur/listeClasse').then((response)=>{
                      this.classes = response.data.result
                      this.idClasse = response.data.idClasse
                })
            },
            Trimestre(){           
                HTTP.get(`/listeTrimestre/${this.idAs}`).then((response)=>{
                     this.listeTrimestre = response.data
                })
            },
            Evaluation(){
                HTTP.get('/professeur/evaluation').then((response)=>{
                    this.evaluations = response.data
                })
            },
            Voir(){
                const data={numMatricule:this.numMatricule,idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua}
                HTTP.post('/parent/verfierBulletin',data).then((response)=>{
                  if(response.data.msg404){
                      this.msg=true
                  }else if(response.data.msg200){
                     this.$router.replace({name:'AfficherBulletinE',params:{numMatricule:this.numMatricule,idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua}})
                  }
                })
            },
        },
        mounted(){
            this.Enfant()
            this.Trimestre()
            this.Evaluation()
            this.Classe()
        }
    }
</script>