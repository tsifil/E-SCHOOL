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
                      <!--h3>Liste des eleves de la classe de : {{libelleClasse}}</h3-->
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                              <th>Classe</th>
                              <th>Date</th>
                              <th>Professeur</th>
                              <th>Evaluation</th>
                              <th>Coefficient</th>
                              <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(n) in notes" :key="n.libelleClasse">
                                <td>{{n.libelleClasse}}</td>
                                <td>{{moment(n.date).format("YYYY-MM-DD")}}</td>
                                <td>{{nomProf}}</td>
                                <td>{{n.libelleEvalua}}</td>
                                <td>{{n.coefficient}}</td>
                                <td>
                                    <router-link :to="{name:'AfficherNoteEleve',params:{coef:n.coefficient,idClasse:n.idClasse,idEvalua:n.idEvalua,idTrimestre:idTrimestre,codemat:codemat}}" class="btn btn-success btn-sm"><i class="ti-eye"></i></router-link>
                                    <router-link :to="{name:'EditerNotesProf',params:{coef:n.coefficient,idClasse:n.idClasse,idEvalua:n.idEvalua,idTrimestre:idTrimestre,codemat:codemat,public:n.public,date:moment(n.date).format('YYYY-MM-DD')}}" class="btn btn-info btn-sm"><i class="ti-pencil"></i></router-link>
                                    <button v-if="n.public==0" @click="Supprimer(n.idEvalua,n.idClasse)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
        notes:[],
        idTrimestre:this.$route.params.idTrimestre,
        codemat:this.$route.params.codemat,
        idProf:this.$store.getters.getProf.idProf,
        nomProf:this.$store.getters.getProf.nomPrenom,
    }
   },
   methods:{
     VoirNote(){
            /*HTTP.get(`/professeur/voirNote/${this.idTrimestre}/${this.codemat}`).then((response)=>{
                this.notes = response.data
            })*/
            HTTP.get(`/professeur/classe/voirNote/${this.idProf}/${this.idTrimestre}/${this.codemat}`)
            .then((response=>{
                this.notes=response.data
            }))
        },
        Supprimer(idEvalua,idClasse){
            this.$swal({icon:'warning',text:"Voulez-vous supprimer tous l’enregistrement concernant ette évaluation ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/professeur/supprimer/passerEvaluation/${idEvalua}/${idClasse}/${this.idTrimestre}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href = '/professeur_consultationEvaluation'
                                  })
                                }
                            }) 
                        }
                    })
        }
   },
   mounted(){
    this.VoirNote()
   } 
}
</script>
