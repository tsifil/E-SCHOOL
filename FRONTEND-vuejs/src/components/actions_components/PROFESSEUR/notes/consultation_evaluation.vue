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
                <div class="card">
                  <div class="card-body">
                    <div class="table-responsive">

                      <vs-table 
                search
                :max-items="descriptionItems[0]"
                pagination
                :data="matiereTrimestres"
                :description-items="descriptionItems"
                description-title="Enregistrements"
                description-connector="dans"
                description-body="Pages"
               >
                    <template slot="thead">
                            <vs-th id="vs_tb">Matiere</vs-th>
                            <vs-th id="vs_tb">Trimestre</vs-th>
                            <vs-th id="vs_tb">Action</vs-th>
                     </template>
                    <template slot-scope="{data}">
                        <vs-tr :key="indextr" v-for="(tr,indextr) in data" >
                            <vs-td id="vs_tb">{{data[indextr].nomMatiere}}</vs-td>
                            <vs-td id="vs_tb">{{data[indextr].libelle}}</vs-td>
                            <vs-td id="vs_tbV">
                                <router-link class="btn btn-success btn-sm" :to="{name:'VoirNoteProf',params:{idTrimestre:data[indextr].idTrimestre,codemat:data[indextr].codemat}}">
                                  <i class="ti-eye"></i>
                                </router-link>
                            </vs-td>
                        </vs-tr>
                    </template>
              </vs-table>



                      <!--table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>Matiere</th>
                              <th>Trimestre</th>
                              <th>voir les notes</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(mt) in matiereTrimestres" :key="mt.numMatricule">
                                <td>{{mt.nomMatiere}}</td>
                                <td>{{mt.libelle}}</td>
                                <td><router-link :to="{name:'VoirNoteProf',params:{idTrimestre:mt.idTrimestre,codemat:mt.codemat}}"><i class="ti-eye"></i></router-link></td>
                           </tr>
                        </tbody>
                      </table-->
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
import NavGauche from '../../includes/professeur/Menu_gauche.vue';
import NavHaut from '../../includes/professeur/Menu_haut.vue';
import { HTTP } from '../../../../http-constants';

export default {
   components:{NavGauche,NavHaut},
   async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        },
   data(){
    return{
        matiereTrimestres:[],
        idAs:this.$store.getters.getAnneeScoProf.idAs,
        idProf:this.$store.getters.getProf.idProf,
        descriptionItems:[10,15,20]
    }
   },
   methods:{
        getMatiereTrimestre(){
            /*HTTP.get(`/professeur/matiere/trimestre/${this.idAs}`).then((response)=>{
                this.matiereTrimestres = response.data
            })*/
            HTTP.get(`/professeur/classe/matiere/trimestre/${this.idProf}/${this.idAs}`)
            .then((response)=>{
                this.matiereTrimestres = response.data
            })
        }
   },
   mounted(){
    this.getMatiereTrimestre()
   } 
}
</script>