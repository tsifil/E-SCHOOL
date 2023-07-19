<template>   
    <div class="container-scroller">
        <NavHaut/>
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
        <div class="card" >
            <div class="card-body">
            <div class="table-responsive">
                     <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>MATRICULE</th>
                            <th>NOM ET PRENOM(S)</th>
                            <th>HEURE DE DEBUT</th>
                            <th>HEURE DE FIN</th>
                            <th>JUSTIFIEE ?</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(e) in eleve" :key="e.idAbsence">
                                <td>{{ e.sexe == 'Masculin' ? e.numMatricule+'G' : e.numMatricule+'F'}}</td>
                                <td>{{ e.nom }}</td>
                                <td>{{ e.heureDebut }}</td>
                                <td>{{ e.heureFin }}</td>
                                <td>{{ (e.motif!='')?'Justifiee':'Non justifiee'}}</td>
                                <td v-if="e.motif==''">
                                      <div data-toggle="modal" data-target="#myModal">
                                        <button class="btn btn-info btn-sm" @click="test({idAbs:e.idAbsence})">
                                          Justification
                                        </button>
                                      </div>                  
                                </td> 
                    <!-- Modal -->
                    <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br><br>
                              <label>Motif(s) {{passedData.idAbs}}:</label>
                              <textarea v-model="motifAbs" class="form-control" placeholder="Le motif d'absence"></textarea>
                              <br><br>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                                 @click="EnregistrerMotif(passedData.idAbs)">Enregistrer
                              </button>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                          </div>
                        </div>
                      </div>
                    </div>
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
                idClasse:this.$route.params.idClasse,
                codemat:this.$route.params.codemat,
                dateAbs:this.$route.params.dateAbs,
                eleve:[],
                motifAbs:'',
                passedData:{idAbs:null}
            }
        },
        methods:{
            test(idAbs){
                this.passedData=idAbs
            },
            Eleve(){
                HTTP.get(`/admin/eleveAbsent/${this.idClasse}/${this.codemat}/${this.dateAbs}`)
                .then((response)=>{
                    this.eleve = response.data
                })
            },
            EnregistrerMotif(idAbs){
                 const data={motifAbs:this.motifAbs,idAbs:idAbs}
                 HTTP.post('/Admin/justifierAbsence',data).then((response)=>{
                    if(response.data.msg){
                      this.$swal(response.data.msg,{icon:'success'})
                    }
                 })
            }
        },
        mounted(){
            this.Eleve()
        }
    }
</script>