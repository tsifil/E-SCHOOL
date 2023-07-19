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

                <div class="col-md-4">
                        <div class="form-group row">
                          <label class="col-sm-6 col-form-label">Nom d'élève</label>
                          <div class="col-sm-12">
                            <selection v-model="numMatricule" :options="listeEnfant" :settings="{width:'100%'}"></selection>
                          </div>
                        </div>
                </div>                          
                </div>

                <button @click="Afficher()" class="btn btn-info mr-2">Afficher la liste</button>


                </div>
            </div>
        </div>
        </div>
        <div class="col-lg-12 grid-margin stretch-card" v-if="matieres!=''">
                <div class="card">
                  <div class="card-body">
                    classe de: {{classe}}
                    <br>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <!-- table-bordered-->
                        <thead>
                          <tr> 
                              <th bgcolor="skyblue">NOM DE LA MATIERE</th>
                              <th bgcolor="skyblue">COEFFICIENT</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="m in matieres" :key="m.codemat">
                                <td>{{m.nomMatiere}}</td>
                                <td>{{m.coefficient}}</td>
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
import NavHaut from '../../includes/parent/Menu_haut.vue'
import NavGauche from '../../includes/parent/Menu_gauche.vue'

export default {
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
            numMatricule:'',
            listeEnfant:[],
            idPers:this.$store.getters.getParent.idPers,
            idAs:this.$store.getters.getAnneeSco.idAs,
            matieres:[],
            classe:''
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
        Afficher(){
            const data={numMatricule:this.numMatricule,idAs:this.idAs}
            HTTP.post('/eleveMatieres',data).then((response)=>{
                this.matieres=response.data.result2
                this.classe=response.data.classe

            })
        }
    },
    mounted(){
        this.Enfant()
    }
}
</script>

