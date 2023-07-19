<template>   
    <div class="container-scroller">
        <NavHaut/>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <NavGauche/>  
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card" >
                  <div class="card-body">
                    <!--h4 class="card-title">Contact Disponible</h4>
                    <p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->

    <form @submit.prevent="Eleve">
       <select v-model="idClasse" class="form-control">
            <option disabled value="">Veuillez Choisir la classe</option>
            <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                {{l.libelleClasse}}
            </option>
        </select>
        <br>
        <select v-model="idTrimestre" class="form-control">
            <option disabled value="">Veuillez Choisir le trimestre</option>
            <option v-for="l in trimestres" :key="l.idTrimestre" :value="l.idTrimestre">
                {{l.libelle}}
            </option>
        </select>

        <br>
        <button type="submit" class="btn btn-info">Afficher les absences</button>
    </form>
    {{ msg }}
    <br>
                <div class="table-responsive">

                     <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>N matricule</th>
                            <th>Nom et prenom(s)</th>
                            <th>Date d'absence</th>
                            <th>Heure de debut</th>
                            <th>Heure de fin</th>
                            <th>Matiere</th>
                            <th>Etat</th>
                            <!--th>Motif</th-->
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in eleve" :key="e.idAbsence">
                                <td>{{ e.sexe == 'Masculin' ? e.numMatricule+'G' : e.numMatricule+'F'}}</td>
                                <td>{{ e.nom }}</td>
                                <td>{{ moment(e.dateAbs).format("YYYY-MM-DD") }}</td>
                                <!--td>{{ moment(e.heureDebut).format("HH:MM") }}</td-->
                                <td>{{ e.heureDebut }}</td>
                                <td>{{ e.heureFin }}</td>
                                <td>{{ e.nomMatiere}} </td>
                                <td>{{ (e.motif!='')?'Justifiee':'Non justifiee'}}</td>
                                <td>{{ e.motif }}</td>                            
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
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
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
                idClasse:'',
                idAs:this.$store.getters.getUserAnnee.idAs,
                eleve:[],
                afficher:false,
                msg:'',
                trimestres:[],
                idTrimestre:''
            }
        },
        methods:{
        Trimestre(){
            HTTP.get(`/professeur/trimestre/${this.idAs}`).then((response)=>{
                this.trimestres = response.data
            })
        },
            ListeClasse(){
                 
                 HTTP.get('/listeClasse').then((response)=>{
                    this.listeClasse = response.data
                 })
            },
            Eleve(){
                const data = {
                    idAs:this.idAs,
                    idClasse:this.idClasse,
                    idTrimestre:this.idTrimestre
                }
                HTTP.post('/admin/consultationAbsence',data).then((response)=>{
                    this.eleve = response.data
                    this.afficher = true
                   /*if(response.data.msg){
                            this.afficher = false
                            this.msg = response.data.msg
                        }else{
                            this.listeParClasse = response.data
                            this.afficher = true
                            this.msg=''
                        }*/
                })
            },
        },
        mounted(){
            this.ListeClasse()
            this.Trimestre()
        }
    }
</script>