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
                 
          <form @submit.prevent="Afficher()">
                  
                  <div class="row">
                    <div class="col-md-4">
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
                    
                    <div class="col-md-4">
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

                    <div class="col-md-4">
                      <div class="form-group row">
                        <label class="col-sm-5 col-form-label">Date</label>
                        <div class="col-sm-12">
                          <VueDatePicker
                              class="form-control"
                              format="YYYY-MM-DD"
                              :locale="locale"
                              @onClose="isVisible = false"
                              button-validate="Ok"
                              button-cancel="Annuler"
                              validate 
                              v-model="date_Abs"
                              min-date="1000-12-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="submit" class="btn btn-success mr-2" value="Faire l'appel"/>
                </form>
                </div>
              </div>
              </div>
           </div>

            <div class="col-lg-12 grid-margin stretch-card" v-if="eleves!=''">
                <div class="card">
                  <div class="card-body">
                  <div class="col-md-3">
                      <div class="form-group row">
                        <!--label class="col-sm-6 col-form-label">Nom de la matiere</label-->
                        <div class="col-sm-12">
                            <select v-model.trim="$v.codemat.$model" class="form-control" :class="{'is-invalid':$v.codemat.$error,'is-valid':!$v.codemat.$invalid}" >
                                  <option value="" disabled>-- choix de la matière --</option>
                                  <option v-for="m in matieres" :key="m.id" :value="m.id">
                                      {{m.text}}
                                  </option>
                           </select>


                                              </div>
                          </div>
                    </div>
                    
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr v-for="(e,i) in eleves" :key="e.numMatricule">
                            <td class="py-1"><img :src="e.photo" alt=""/></td>
                            <td>{{(e.sexe=='Masculin')?e.numMatricule+'G' : e.numMatricule+'F'}}</td>
                            <td>{{e.nom}}</td>
                            <input type="hidden" v-bind:input="typeAbsence[i]"/>
                            <td><button class="btn btn-info mr-2" @click="present(i)">{{(e.sexe=='Masculin')?'Présent':'Présente'}}</button></td>
                            <td><button class='btn btn-outline-danger mr-2' @click="absent(i,e.numMatricule)">{{(e.sexe=='Masculin')?'Absent':'Absente'}}</button></td>
                            <input type="hidden" v-bind:value="e.numMatricule" v-bind:input="mat[i]=e.numMatricule"/>
                            <td>
                                <div v-for="t in testAbs" :key="t.numMatricule">
                                   {{(t.numMatricule==e.numMatricule&&t.type=='Absence')?'x':''}}
                                </div>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
                <br>

                <div class="alert alert-danger" v-if="msg">
                  <span>{{msg}}</span> 
                </div>

              <button @click="Enregistrer()" class="btn btn-success mr-2">Enregistrer</button>
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
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import {VueDatePicker} from '@mathieustan/vue-datepicker'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import {HTTP} from '../../../../http-constants';
import moment from 'moment';
import {required} from 'vuelidate/lib/validators'

export default{
  components:{NavHaut,NavGauche,VueDatePicker},
  async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
  data(){
      return{
          im:[],
          locale: {lang: 'fr',weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],},
          listeClasse:[],
          listeTrimestre:[],
          idClasse:'',
          idTrimestre:'',
          codemat:'',
          matieres:[],
          date_Abs:new Date(),
          idProf:this.$store.getters.getProf.idProf,
          idAs:this.$store.getters.getAnneeScoProf.idAs,
          eleves:[],
          typeAbsence:[],
          mat:[],
          HeureEnr:moment(new Date()).format("HH:mm ss"),
          testAbs:[],
          msg:''
      }
  },
  validations: {
       codemat:{
         required
      },
  },
  methods:{
      Classe(){
          /*HTTP.get('/listeClasse').then((response)=>{
              this.listeClasse = response.data
          })*/
          HTTP.get(`/professeur/classe/${this.idProf}`).then((response)=>{
              this.listeClasse = response.data
          })
      },  
      Trimestre(){           
              HTTP.get(`/listeTrimestre/${this.idAs}`).then((response)=>{
                   this.listeTrimestre = response.data
              })
      },
      Matiere(){
        
          HTTP.get(`/professeur/matiereClasse/${this.idClasse}/${this.idProf}`)
            .then((response)=>{
                this.matieres = response.data
            })
      },
      absent(i,im){
        this.typeAbsence[i]='Absence'
        this.im[i]=im
        //console.log(this.typeAbsence,this.im)
        const data={type:this.typeAbsence,mat:this.mat}
        HTTP.post('/absence/testAbs',data).then((response)=>{
            this.testAbs=response.data.resultat
        })
      },
      present(i){
        //this.typeAbsence[i]=''
        this.typeAbsence[i]=null
        this.im[i]=null
        //console.log(this.typeAbsence,this.im)
        //console.log(im)
        const data={type:this.typeAbsence,mat:this.mat}
        HTTP.post('/absence/testAbs',data).then((response)=>{
            this.testAbs=response.data.resultat
        })
      },
      Enregistrer(){
        this.$v.$touch()
        if(this.$v.$invalid){
            console.log("Remplir tout")
            this.msg='Veuillez selectionnez la matière'
        }else{
            const data={
                codemat:this.codemat,
                motif:'',
                idTrimestre:this.idTrimestre,
                date_Abs:this.date_Abs,
                mat:this.mat,
                im:this.im,
                typeAbsence:this.typeAbsence,
                HeureEnr:this.HeureEnr
            }
            HTTP.post('/professeur/ajoutAbsence',data).then((response)=>{
                
                if(response.data.error){
                     this.msg=response.data.error  
                }else if(response.data.valid){
                    this.$router.replace({name:"PresenceEleve"})
                }
            })
        }
      },
      Eleve(){
        const data = {
            idClasse:this.idClasse,
            idAs:this.idAs
          }
          HTTP.post('/professeur/fichePresence',data)
                .then((response)=>{
                  this.eleves = response.data
          })
      },
      Afficher(){
          this.Matiere()
          this.Eleve()
      }
},
mounted(){
  this.Classe()
  this.Trimestre()
  //this.Matiere()
 }
}
</script>
<style>
  #button1 {
  background-color: green;
}
</style>