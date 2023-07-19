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
                    <a @click="$router.go(-1)" class="btn btn-warning mr-2">Retour</a>
                    <br><br>
                    <div class="form-group row" v-for="(n) in notes.slice(0,1)" :key="n.libelleClasse">
                        <h4 class="col-sm-6">{{n.nomMatiere}}</h4>
                        <h5 class="col-sm-12">
                            {{n.libelle}}
                        </h5>
                      </div>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>Classe</th>
                              <th>Date</th>
                              <th>Professeur</th>
                              <th>Evaluation</th>
                              <th>Coefficient</th>
                              <th>Publier les notes</th>
                              <th>Voir les notes</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(n) in notes" :key="n.libelleClasse">
                                <td>{{n.libelleClasse}}</td>
                                <td>{{moment(n.date).format("YYYY-MM-DD")}}</td>
                                <td>{{n.nomPrenom}}</td>
                                <td>{{n.libelleEvalua}}</td>
                                <td>{{n.coefficient}}</td>
                                <td>
                                    <vs-switch 
                                         color="success"
                                         v-model="n.public" 
                                         @change="Test(n.public,n.idClasse,n.idEvalua)"
                                    >
                                        <span slot="on" >OUI</span>
                                        <span slot="off">NON</span>
                                    </vs-switch>
                                </td>
                                <td>
                                  <router-link :to="{name:'AfficherNotesAdmin',
                                    params:{coef:n.coefficient,idClasse:n.idClasse,idEvalua:n.idEvalua,idTrimestre:idTrimestre,codemat:codemat}}" class="btn btn-success btn-sm">
                                    <i class="ti-eye"></i></router-link>
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
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </template>

<script>
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import { HTTP } from '../../../../http-constants';

export default {
   components:{NavGauche,NavHaut},
   data(){
    return{
        notes:[],
        idTrimestre:this.$route.params.idTrimestre,
        codemat:this.$route.params.codemat,
    }
   },
   methods:{
     VoirNote(){
            HTTP.get(`/professeur/voirNote/${this.idTrimestre}/${this.codemat}`).then((response)=>{
                this.notes = response.data
            })
        },
      Test(publier,idClasse,idEvalua){
          if(publier==false){
              const data = {pub:0,idTrimestre:this.idTrimestre,codemat:this.codemat,idClasse:idClasse,idEvalua:idEvalua}
                HTTP.post('/Admin/publier_Note',data)/*.then((response)=>{
                    console.log(response.data)
                })*/
          }else if(publier==true){
               const data = {pub:1,idTrimestre:this.idTrimestre,codemat:this.codemat,idClasse:idClasse,idEvalua:idEvalua}
                HTTP.post('/Admin/publier_Note',data)/*.then((response)=>{
                  console.log(response.data)
              })*/
          }
      }
   },
   mounted(){
        this.VoirNote()

   } 
}
</script>