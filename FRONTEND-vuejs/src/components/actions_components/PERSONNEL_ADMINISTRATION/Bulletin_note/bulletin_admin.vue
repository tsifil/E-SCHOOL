<template>
  <div id='bull'>
    <br>
    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
    <!--vs-button @click='Imprimer()'>Imprimer</vs-button-->

    <div id="page">
          <form class="page page-1" v-for="(tete) in infoEleves" :key="tete.numMatricule">

            <br><br>

            <div class="row">
                    <div class="col-md-9">
                      <div class="form-group">
                        <label>Nom : {{tete.nom}}</label>
                        <br>
                        <label>Prénom(s) : {{tete.prenom}}</label>
                        <br>
                        <label>Né(e) le     : {{moment(tete.dateNaissance).format("YYYY-MM-DD")}}</label>
                        <br>
                        <label>Classe    :{{tete.libelleClasse}}</label>
                          <br>
                        <label>Année scolaire  : {{annee}}</label>  
                      </div> 
                    </div>
                    <div class="col-md-3">
                        <img src="images/zazatiana3.PNG" id='p'/>
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
                  <div>
                  <table class="table table-bordered" cellspacing="0" rules="all" style="width:90%;border-collapse:collapse">
                    <thead>
                      <tr>
                          <th rowspan="2">Discipline</th>
                          <th rowspan="2">Coef</th>
                          <th colspan="2">Moyennes</th>
                          <th colspan="2">Notes Extrêmes</th>
                          <th rowspan="2">
                            Appréciations générales
                          </th>
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
              Moyenne trimestrielle:<label id='m'>{{(tete.moyenneTri).toFixed(2)}}</label>/20   
              <div v-if="moyenneDuplicates!=''">
                  <div v-for="md in moyenneDuplicates" :key="md.moyenneEX">
                    Rang:  {{(md.moyenneEX==tete.moyenneTri)?((tete.rang==1)?tete.rang + ' er élève' + ' ex':tete.rang + ' e élève' + ' ex') : ((tete.rang==1)?tete.rang + ' er élève':tete.rang + ' e élève')}}
                  </div>
              </div>
              <div v-else>
                   Rang: {{tete.rang==1 ? tete.rang+''+'er élève': tete.rang +''+'e élève.'}}
              </div>
              <br>
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

                  <br><br><br><br><br>
              </div>
          </form>
    </div>
   
  </div>
</template>

<script>
import { HTTP } from '../../../../http-constants';
import html2PDF from 'jspdf-html2canvas'
//import jsPDF from 'jspdf'

export default {
  async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
            this.$router.push('/connecter_personnel_administration')
      }
  },
  data(){
      return{
          annee:this.$store.getters.getUserAnnee.libelle,
          idAs:this.$store.getters.getUserAnnee.idAs,
          idClasse:this.$route.params.idClasse,
          idTrimestre:this.$route.params.idTrimestre,
          idEvalua:this.$route.params.idEvalua,
          infoEleves:[],
          corps:[],
          sumNoteBas:'',
          sumNoteHaut:'',
          sumMoyenneClasse:'',
          plusInfo:[],
          moyenneDuplicates:[],
          legendes:[],
          imprimer:false,
      }
  },
  methods:{
    Imprimer(){

      let page = document.getElementsByClassName('page')
      let a4=[595.28,841.89]
      html2PDF(page,{
          watermark:{
            handler({pdf,imgNode}){
              pdf.addImage(imgNode,'jpeg',0,0,40,40)
            }
          },
          html2canvas:{
              imageTimeout:15000,
              allowTaint:true,
              width:1250,
              scale:2
          },
          image:{type:'jpeg',quality:0.98},
          jsPDF:{unit:'mm',format:a4},
          margin:{top:30,right:5,bottom:5,left:5},
          output:'bulletin.pdf',
          init:function(){},
          success:function(pdf){pdf.save(this.output)}        
      })
                        
    },
    Legende(){
                HTTP.get(`/legendeBulletin/${this.idEvalua}/${this.idTrimestre}`)
                .then((response)=>{
                    this.legendes=response.data
                })
            },
      MoyenneDuplicate(){
        HTTP.get(`/moyenne/duplicate/${this.idClasse}/${this.idEvalua}/${this.idTrimestre}`)
        .then((response)=>{
          this.moyenneDuplicates=response.data
        })
        },
      InfoEleve(){
              HTTP.get(`/infoEleve_BulletinParClasse/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
              .then((response)=>{
                    this.infoEleves = response.data  
                })
          },
        Corps(){
              HTTP.get(`/bulletinAdmin/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
              .then((response)=>{
                    this.corps = response.data.result 
                    this.sumNoteBas = response.data.sumNoteBas
                    this.sumNoteHaut = response.data.sumNoteHaut
                    this.sumMoyenneClasse = response.data.sumMoyenneClasse
                })
          },
        PlusInfo(){
            HTTP.get(`/appreciation/et/moyenneEleve/${this.idEvalua}/${this.idTrimestre}/${this.idClasse}`)
            .then((response)=>{
                this.plusInfo=response.data
            })
          }
        },
        mounted(){
            this.InfoEleve()
            this.Corps()
            this.PlusInfo()
            this.MoyenneDuplicate()
            this.Legende()
        }
}
</script>
<style>
#pic{
  width:70%;
  height:90%;
}
#m{
  color:blue;
  font-style:italic;
}
#p{
  max-width:100%;
  height:auto;
}
#bull{
  margin-left:70px;
}
</style>

