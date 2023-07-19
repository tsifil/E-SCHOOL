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
                   
            <form @submit.prevent="EleveListe()">
                    
                    <div class="row">
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
                                <label class="col-sm-6 col-form-label">Année scolaire</label>
                                <div class="col-sm-12">
                                  <input class="form-control" :value="anneeScolaire" readonly/>
                                </div>
                            </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Classe</label>
                          <div class="col-sm-12">
                            <select v-model="idClasse" class="form-control">
                              <option value="" disabled>-- Veuillez choisir la classe --</option>
                              <option v-for="c in listeClasse" :key="c.idClasse" :value="c.idClasse">
                                  {{c.libelleClasse}}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-5 col-form-label">Evaluation</label>
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
                    <input type="submit" class="btn btn-success mr-2" value="Afficher"/>
                  </form>
<div v-if="eleves!=''" >
                <vs-table 
                search
                :max-items="descriptionItems[0]"
                pagination
                :data="eleves"
                :description-items="descriptionItems"
                description-title="Enregistrements"
                description-connector="dans"
                description-body="Pages"
               >
                    <template slot="thead">
                            <vs-th>Matricule</vs-th>
                            <vs-th>Nom et prénom(s)</vs-th>
                            <vs-th>Etre</vs-th>
                            <vs-th>Action</vs-th>
                     </template>

                    <template slot-scope="{data}">
                
                        <vs-tr :key="indextr" v-for="(tr,indextr) in data" >

                            <vs-td>{{(data[indextr].sexe=='Masculin')?data[indextr].numMatricule+'G':data[indextr].numMatricule+'F'}}</vs-td>
                            <vs-td>{{data[indextr].nom}}</vs-td>
                            <vs-td v-if="data[indextr].valider==1">
                                <button class="btn btn-outline-success btn-sm">VALIDE</button>
                            </vs-td>
                            <vs-td v-if="data[indextr].valider==0">
                                <button class="btn btn-outline-warning btn-sm">EN COURS</button>
                            </vs-td>
                            <vs-td>
                              <vs-button @click="Devalider(data[indextr].numMatricule)" v-if="data[indextr].valider==1" color="red" icon="pending"></vs-button>
                              <vs-button @click="Valider(data[indextr].numMatricule)" color='green' icon='verified' v-else></vs-button>
                            </vs-td>
                        </vs-tr>
                    </template>
              </vs-table>
              <button type="submit" @click="Afficher()" class="btn btn-outline-info mr-2">Voir les bulletins</button>
              <button data-toggle="modal" data-target="#myModal" class="btn btn-outline-info mr-2">Valider les bulletins</button>
              </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->

      <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Valider les bulletins</h4>
            </div>
              <div class="modal-body" >
                <div class="alert alert-warning">
                      <strong>Attention !!! </strong> Après la validation,
                       le bulletin sera disponible et 
                       vous ne pouvez plus modifier ni les notes ni les 
                       commentaires qui sont sur le bulletin.
              </div>
              <br>
                  <button class="btn btn" data-dismiss="modal">NON, MERCI</button>
                  <button @click="ValiderBulletin()" class="btn btn-info mr-2" data-dismiss="modal">VALIDER LES BULLETINS</button>
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

export default{
    components:{NavHaut,NavGauche},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
    },
    data(){
        return{
            listeClasse:[],
            listeTrimestre:[],
            idAs:this.$store.getters.getUserAnnee.idAs,
            anneeScolaire:this.$store.getters.getUserAnnee.libelle,
            evaluations:[],
            idEvalua:'',
            idClasse:'',
            idTrimestre:'',
            eleves:[],
            descriptionItems:[4,8,12],
        }
    },
    methods:{
        Classe(){
            HTTP.get('/listeClasse').then((response)=>{
                this.listeClasse = response.data
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
        EleveListe(){
           const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua}
            HTTP.post('/eleveListe',data).then((response)=>{
              this.eleves=response.data
            })
        },
        Afficher(){
                this.$router.replace({
                        name:'BulletinAdmin',
                        params:{idClasse:this.idClasse,idTrimestre:
                                this.idTrimestre,idEvalua:this.idEvalua}
                   })
        },
        Devalider(numMatricule){
                const data={
                  numMatricule:numMatricule,
                  idTrimestre:this.idTrimestre,
                  idEvalua:this.idEvalua,
                  idClasse:this.idClasse
                }
            HTTP.post('/devalider',data)
      },
      Valider(numMatricule){
        const data={
                  numMatricule:numMatricule,
                  idTrimestre:this.idTrimestre,
                  idEvalua:this.idEvalua,
                  idClasse:this.idClasse
                }
            HTTP.post('/valider',data)
      },
      ValiderBulletin(){
          const data={
                idClasse:this.idClasse,
                idTrimestre:this.idTrimestre,
                idEvalua:this.idEvalua
          }
          HTTP.post('/validerBulletin',data)
          .then((response)=>{
              console.log(response)
          })
      }
  },
  mounted(){
    this.Classe()
    this.Trimestre()
    this.Evaluation()
  }
}
</script>

