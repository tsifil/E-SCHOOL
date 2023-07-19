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
                          <label class="col-sm-6 col-form-label">Trimestre</label>
                          <div class="col-sm-12">
                            <!--{{idTrimestre}}-->
                            <select v-model="idTrimestre" class="form-control">
                                    <option value="" disabled>-- Veuillez choisir le trimestre --</option>
                                    <option v-for="t in trimestres" :key="t.idTrimestre" :value="t.idTrimestre">
                                        {{t.libelle}}
                                    </option>
                            </select>                          
                        </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Classe</label>
                          <div class="col-sm-12">
                            <!--{{idClasse}}-->
                            <selection v-model="idClasse" :options="classes"/>
                          </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Niveau</label>
                          <div class="col-sm-12">
                            <!--{{idNiv}}-->
                            <selection v-model="idNiv" :options="niveaux" :settings="{width:'100%'}"/>
                          </div>
                        </div>
                </div>

                <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Evaluation</label>
                          <div class="col-sm-12">
                            <!--{{idEvalua}}-->
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
                <button @click="Eleve" class="btn btn-info mr-2">Afficher</button>
                <!--button @click="Contenir" class="btn btn-info mr-2">Contenir</button-->
                </div>
            </div>
        </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card" v-if="eleves!=''"> <!--v-if="eleveNotes!=''"-->
                <div class="card">
                  <div class="card-body">
            <!--button @click="Imprimer()" class="btn btn-warning mr-2">Telecharger le releve des notes d'une classes</button>
            <button @click="generatePDF()" class="btn btn-warning mr-2">PDF</button-->
              
                    <br><br>
                    <div class="table-responsive">
                      <table class="table table-bordered" bgcolor="WhiteSmoke">
                        <thead>
                          <tr> 
                              <th>Nom <div><br><br></div></th>
                              <th>Rang <div><br><br></div></th>
                              <th>Moyenne générale <div><br><br></div></th>
                              <th v-for="b in body" :key="b.codemat">
                                {{b.nomMatiere}}
                                <div><br>{{'coef :'+ b.coefficient}}</div>
                              </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(e) in eleves" :key="e.numMatricule">
                                <td>{{e.nom}}</td>
                                <!--td>{{(i+1==1)?(i+1+'er'):(i+1+'e')}}</td-->
                                <td v-if="moyenneDuplicates!=''">
                                    <div v-for="md in moyenneDuplicates.slice(0,1)" :key="md.moyenneEX">
                                      {{(md.moyenneEX==e.moyenneEleve)?((e.rang==1)?e.rang + ' er' + ' ex':e.rang + ' e' + ' ex') : ((e.rang==1)?e.rang + ' er':e.rang + ' e')}}
                                    </div>
                                </td>
                                <td v-else>{{(e.rang==1)?e.rang + ' er':e.rang + ' e'}}</td>
                                <!--td bgcolor="#c72a75" id='col'>{{((e.total)/(e.diviserPar)).toFixed(2)}}</td-->
                                <td bgcolor="#c72a75" id='col'>{{(e.moyenneEleve).toFixed(2)}}</td>
                                <td v-for="(b) in body" :key="b.codemat">
                                    <div v-for="c in contenus" :key="c.idEvalua">
                                      <div v-if="e.numMatricule==c.numMatricule">
                                         <div v-if="c.nomMatiere==b.nomMatiere">
                                            {{c.note}}
                                         </div>
                                      </div> 
                                    </div>
                                </td>
                           </tr>
                           <tr bgcolor="00B0D8" id='col'>
                              <td colspan="2">Moyenne classe</td>
                              <td>{{moyenneGenClasses}}</td>
                              <td v-for="(b) in body" :key="b.codemat">
                                  <div v-for="p in plusContenus" :key="p.codemat">
                                      <div v-if="b.codemat==p.codemat">
                                          <!--{{p.moyenneMatiere}}-->
                                          {{(p.moyenneMatiere).toFixed(2)}}
                                      </div>
                                  </div>
                              </td>
                           </tr>
                           <tr bgcolor="00B0D8" id='col'>
                              <td colspan="2">Note la plus haute</td>
                              <td>{{moyGeneralHaute}}</td>
                              <td v-for="(b) in body" :key="b.codemat">
                                  <div v-for="p in plusContenus" :key="p.codemat">
                                      <div v-if="b.codemat==p.codemat">
                                          {{(p.noteMax).toFixed(2)}}
                                      </div>
                                  </div>
                              </td>
                           </tr>
                           <tr bgcolor="00B0D8" id='col'>
                              <td colspan="2">Note la plus basse</td>
                              <td>{{moyGeneralBas}}</td>
                              <td v-for="(b) in body" :key="b.codemat">
                                  <div v-for="p in plusContenus" :key="p.codemat">
                                      <div v-if="b.codemat==p.codemat">
                                          {{(p.noteMin).toFixed(2)}}
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
  </template>
<script>
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import { HTTP } from '../../../../http-constants'
//import jsPDFInvoiceTemplate from 'jspdf-invoice-template'
import jsPDFInvoiceTemplate, {OutputType} from 'jspdf-invoice-template'


var propsObject = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "images/zazatiana.PNG",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "images/zazatiana.PNG",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#", 
            style: {width: 10 } 
          }, 
          { 
            title: "Title",
            style: {width: 30} 
          }, 
          { 
            title: "Description",
            style: {
              width: 80
            } 
          }, 
          { title: "Price"},
          { title: "Quantity"},
          { title: "Unit"},
          { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            "m2",
            400.5
        ])),
        additionalRows: [{
            col1: 'Total:',
            col2: '145,250.50',
            col3: 'ALL',
            style: {
                fontSize: 14 //optional, default 12
            }
        },
        {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        }],
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};


export default {
    components:{NavHaut,NavGauche},
    data(){
        return{
          moyenneGenClasses:'',
            classes:[],
            idClasse:'',
            idNiv:'',
            niveaux:[],
            idAs:this.$store.getters.getUserAnnee.idAs,
            trimestres:[],
            idTrimestre:'',
            idEvalua:'',
            evaluations:[],
            body:[],
            contenus:[],
            eleves:[],
            plusContenus:[],
            moyGeneralHaute:'',
            moyGeneralBas:'',
            moyenneDuplicates:[]
        }
    },
    methods:{
        generatePDF(){
          //var pdfObject = jsPDFInvoiceTemplate.default(propsObject);
          var pdfObject = jsPDFInvoiceTemplate(propsObject);
          console.log("Object created !!!",pdfObject)
        },
        Imprimer(){

        },
        Classe(){
            HTTP.get('/professeur/listeClasse').then((response)=>{
                this.classes = response.data.result
                this.idClasse=response.data.idClasse
            })
        },
        Niveau(){
            HTTP.get('/professeur/niveau').then((response)=>{
                this.niveaux = response.data.result
                this.idNiv= response.data.idNiv
        })
      },
     Trimestre(){
            HTTP.get(`/listeTrimestre/${this.idAs}`).then((response)=>{
                this.trimestres = response.data
            })
    },
    Evaluation(){
            HTTP.get('/professeur/evaluation').then((response)=>{
                this.evaluations = response.data
            })
    },
    Afficher(){
        const data={idClasse:this.idClasse}
        HTTP.post('/professeur/afficher/tableauMoyenne',data)
        .then((response)=>{
            this.body=response.data
        })
    },
    Contenir(){
        HTTP.get(`/professeur/tableauMoyenne/contenus/${this.idTrimestre}/${this.idNiv}/${this.idEvalua}/${this.idClasse}/${this.idAs}`)
        .then((response)=>{
            this.contenus=response.data
        })
    },
    PlusContenus(){
      const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
        HTTP.post('/professeur/contenus/consultationMoyenne',data)
        .then((response)=>{
          this.plusContenus=response.data
        })
    },
    MoyenneGenClasse(){
      const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
      HTTP.post('/professeur/MoyenneGeneraleClasse',data)
      .then((response)=>{
          this.moyenneGenClasses=(response.data.moyGeneralClasse).toFixed(2)
        })
    },
    MoyenneGenHaut(){
      const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
      HTTP.post('/professeur/MoyenneGeneralHaut',data)
      .then((response)=>{
          this.moyGeneralHaute=(response.data.moyGeneralHaute).toFixed(2)
        })
    },
    MoyenneGenBas(){
      const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
      HTTP.post('/professeur/MoyenneGeneralBas',data)
      .then((response)=>{
          this.moyGeneralBas=(response.data.moyGeneralBas).toFixed(2)
        })
    },
    MoyenneDuplicate(){
       const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
       HTTP.post('/professeur/moyenneDuplicate',data)
       .then((response)=>{
            this.moyenneDuplicates=response.data
       })
    },
    Eleve(){
        //const data={idClasse:this.idClasse,idAs:this.idAs}
        const data={idClasse:this.idClasse,idTrimestre:this.idTrimestre,idEvalua:this.idEvalua,idNiv:this.idNiv}
        HTTP.post('/professeur/moyenneEleve',data)
        .then((response)=>{
          this.eleves=response.data
          this.Afficher()
          this.Contenir()
          this.PlusContenus()
          this.MoyenneGenClasse()
          this.MoyenneGenHaut()
          this.MoyenneGenBas()
          this.MoyenneDuplicate()
        })
    }
  },
  mounted(){
    this.Classe()
    this.Niveau()
    this.Trimestre()
    this.Evaluation()
  }
}


</script>
<style>
  #col{
    color:white;
  }
</style>