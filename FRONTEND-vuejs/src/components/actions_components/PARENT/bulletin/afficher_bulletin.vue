<template>
    <div id="bull">
            <div class="row">  
                <div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
            <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
            <!--button class="btn btn-info mr-2">Imprimer</button-->
    <br><br><br>
    <div v-if="infos!=''">
            <form id='tete' v-for="(tete) in infos" :key="tete.numMatricule">
                     <div class="row">
                      <div class="col-md-9">
                        <div class="form-group">
                          <label>Nom       : {{tete.nom}}</label>
                          <br>
                          <label>Prénom(s) : {{tete.prenom}}</label>
                          <br>
                          <label>Né(e) le     : {{moment(tete.dateNaissance).format("YYYY-MM-DD")}}</label>
                          <br>
                          <label>Classe    : {{tete.libelleClasse}}</label>
                          <br>
                          <label>Année scolaire  : {{annee}}</label>
                        </div>                        
                      </div>
                      
                        <div class="col-md-3">
                                <img src="images/zazatiana3.PNG" id='pic'/>
                      </div>
                    </div>
                     
        <div class="row">
            <div class="col-md-12" id='leg'>
                <div class="form-group">
                    <div v-for="l in legendes.slice(0,1)" :key="l.libelleEvalua">
                            <h3>{{l.libelleEvalua + ' du '+ l.libelle}}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
           <div class="table-responsive pt-3">
            <div class="col-md-12">
                    <table class="table table-bordered" cellspacing="0" rules="all" style="width:90%;border-collapse:collapse">
                      <thead>
                        <tr>
                            <th rowspan="2">Discipline</th>
                            <th rowspan="2">Coef</th>
                            <th colspan="2">Moyennes</th>
                            <th colspan="2">Notes Extrêmes</th>
                            <th rowspan="2" width="80px">Appréciations générales</th>
                        </tr>
                        <tr>
                            <th>Elève </th>
                            <th>Classe</th>
                            <th>-</th>
                            <th>+</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="c in corps" :key="c.codemat">
                            <td>{{c.nomMatiere}}</td>
                            <td>{{c.coefficient}}</td>
                            <td><div v-for="p in plusInfo" :key="p.idPass">
                                {{(c.codemat==p.codemat)&&(tete.numMatricule==p.numMatricule)?p.moyEleve:''}}
                            </div></td>
                            <td>{{c.MoyenneClasse}}</td>
                            <td>{{c.noteHaut}}</td>
                            <td>{{c.noteBas}}</td>
                            <td><div v-for="p in plusInfo" :key="p.idPass">
                                {{(c.codemat==p.codemat)&&(tete.numMatricule==p.numMatricule)?p.commentaire:''}}
                            </div></td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{{tete.totalCoeff}}</td>
                            <td>{{tete.totalMoyenneEleve}}</td>
                            <td>{{sumMoyenneClasse}}</td>
                            <td>{{sumNoteHaut}}</td>
                            <td>{{sumNoteBas}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                <br>
                <div v-for="r in rang" :key="r.numMatricule">
                    <label v-if="r.numMatricule == tete.numMatricule">
                        Moyenne trimestrielle:<label id='m'>{{(tete.moyenneTri).toFixed(2)}}</label>/20  
                        <div v-if="moyenneDuplicates!=''">
                              <div v-for="md in moyenneDuplicates" :key="md.moyenneEX">
                                Rang:  {{(md.moyenneEX==tete.moyenneTri)?((r.rang==1)?r.rang + ' er élève' + ' ex':r.rang + ' e élève' + ' ex') : ((r.rang==1)?r.rang + ' er élève':r.rang + ' e élève')}}
                              </div>
                        </div>
                        <div v-else>Rang: {{(r.rang==1)?r.rang + ' er élève':r.rang + ' e élève'}}</div>
                        <!--Rang: {{r.rang==1 ? r.rang+''+'er élève': r.rang+''+' e élève.'}}-->
                    </label>
               </div>   
               <br>
        </div>
            </div> 
            
            <div class='row'>
                    <div class="col-lg-12 grid-margin stretch-card">
                          <div class="col-md-4">
                              <h4>Vie Scolaire</h4>
                              Absence(s):
                              <br>
                              Retards:
                              <br><br>
                              <h4>Observation du conseil de classe : </h4>
                              <br><br><br><br>
                              <h6>Visa du professeur principal : </h6>

                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                                   <i class="ti-control-stop"/>  Félicitation
                              </div>
                              <div class="form-group">
                                   <i class="ti-control-stop"/>  Encouragements
                              </div>
                              <div class="form-group">
                                   <i class="ti-control-stop"/>  Doit progresser
                              </div>
                              <div class="form-group">
                                  <i class="ti-control-stop"/>   Manque de travail
                              </div>
                              <div class="form-group">
                                <i class="ti-control-stop"/>     Avertissement
                              </div>
                        </div>
                          <div class="col-md-4">
                                <label>Visa du chef de l'etablissement</label>
                                <br><br><br><br><br>
                                <label>Signature des parents</label>
                                <br><br><br><br><br>
                          </div>
                    </div>
                    <br><br><br>
                  </div>
                  </form>
                </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
  </template>

<script>
import {HTTP} from '../../../../http-constants'

export default{
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
                numMatricule:this.$route.params.numMatricule,
                idEvalua:this.$route.params.idEvalua,
                idTrimestre:this.$route.params.idTrimestre,
                idClasse:this.$route.params.idClasse,
                annee:this.$store.getters.getAnneeSco.libelle,
                infos:[],
                corps:[],
                sumNoteBas:'',
                sumNoteHaut:'',
                sumMoyenneClasse:'',
                plusInfo:[],
                rang:[],
                moyenneDuplicates:[],
                legendes:[]
            }
        },
        methods:{
            Legende(){
                HTTP.get(`/legendeBulletin/${this.idEvalua}/${this.idTrimestre}`)
                .then((response)=>{
                    this.legendes=response.data
                })
            },
            InfoEleve(){
                HTTP.get(`/infoEleve_BulletinEleve/${this.numMatricule}/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
                .then((response)=>{
                    this.infos=response.data
                })
            },
            Corps(){
                HTTP.get(`/bulletinEleve/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
                .then((response)=>{
                        this.corps = response.data.result 
                        this.sumNoteBas = response.data.sumNoteBas
                        this.sumNoteHaut = response.data.sumNoteHaut
                        this.sumMoyenneClasse = response.data.sumMoyenneClasse
                    })
            },
            PlusInfo(){
                HTTP.get(`/parent/appreciation/et/moyenneEleve/${this.numMatricule}/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
                .then((response)=>{
                    this.plusInfo=response.data
                })
            },
            MoyenneDuplicate(){
                HTTP.get(`/parent/moyenneDuplicate/${this.idClasse}/${this.idTrimestre}/${this.idEvalua}`)
                .then((response)=>{
                    this.moyenneDuplicates = response.data
                })
            },
            Rang(){
                HTTP.get(`/parent/rang/${this.idClasse}/${this.idTrimestre}/${this.idEvalua}`)
                .then((response)=>{
                    this.rang = response.data
                })
            }
        },
        mounted(){
            this.InfoEleve()
            this.Legende()
            this.Corps()
            this.PlusInfo()
            this.Rang()
            this.MoyenneDuplicate()
        }
    }
</script>
<style>
  #leg{
    text-align:center;
    color:blue;
    font-style:italic;
  }
#pic{
 max-width:100%;
  height:auto;
}

#bull{
  margin-left:70px;
  width:100%
}
</style>