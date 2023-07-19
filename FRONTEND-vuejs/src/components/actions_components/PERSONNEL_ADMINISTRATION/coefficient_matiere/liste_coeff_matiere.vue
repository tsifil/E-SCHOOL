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
                    
                    <p class="card-description">

            <router-link :to="{name:'NouveauCoefficientMatiere'}">
                  <i class="ti-plus btn-icon-append"></i>
                  Création des coefficients par matières
           </router-link>
           <br><br>  

                <label>Cliquez ici pour consulter les matières d'un autre niveau</label>
                <selection v-model="idNiv" :options="checkNiveau" :settings="{width:'35%'}"></selection>
                <br>
                
                <button @click="ConsulterCoeffNiveau()" class="btn btn-success">Afficher</button>

                <!--select v-model="idNiv" class="form-control-sm">
                    <option value="" disabled>Cliquez ici pour consulter les coefficients d'un autre niveau</option>
                    <option v-for="c in checkNiveau" :key="c.idNiv" :value="c.idNiv">
                                {{c.libelleNiv}}
                    </option>
                </select-->


                       <br><br>
                    <!--Niveau de : <code>{{ niveau }}</code>-->
                    </p>
                    <div class="table-responsive pt-3">
                      <table class="table table-bordered" bgcolor="whitesmoke">
                        <thead>
                          <tr>
                            <th width="70px">Action</th>
                            <th width="260px">Nom de la matiere</th>
                            <th bgcolor="#c72a75" width="130px" id='col'>Coefficient</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l) in liste" :key="l.idAssoc">
                                    <td>
                                        <vs-button @click="Edit(l.idAssoc,l.nomMatiere,l.coefficient)" data-toggle="modal" data-target="#myModal" color='blue' icon='edit'></vs-button>
                                        <vs-button @click="Supprimer(l.idAssoc)" color='red' icon='delete'></vs-button>
                                        <!--button class="btn btn-danger">Supprimer</button-->
                                    </td>
                                    <td>{{l.nomMatiere}}</td>
                                    <td bgcolor="#c72a75" id='col'>{{l.coefficient}}</td>
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

      <!-- MODAL -->
      <div id="myModal" class="modal fade" role="dialog">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-body" >
                              <br>
                              <label>Nom de la matiere :</label>
                              <br><br>
                              <input type="text" class="form-control"  
                               v-model="passedData.nomMatiere" readonly>
                              <br><br>
                              <label>Coefficient :</label>
                              <br><br>
                              <input type='number' class="form-control" v-model="passedData.coeff"/>
                              <br><br>
                              <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Annuler</button>
                              <button class="btn btn-info mr-2" data-dismiss="modal"
                              @click="Modifier(passedData.idAssoc,passedData.coeff)">
                                  Modifier
                              </button>
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
        components:{NavGauche,NavHaut},
        async created(){
            if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                    this.$router.push('/connecter_personnel_administration')
            }
        },
        data(){
            return{
                niveau:'',
                liste:[],
                idNiv:'',
                checkNiveau:[],
                affichage:'',
                passedData:{idAssoc:'',nomMatiere:'',coeff:''}
            }
        },
        methods:{
            getListe(){
                    HTTP.get('/listeCoefficientMatiere')
                    .then((response)=>{
                            this.liste = response.data.result
                            this.idNiv = response.data.niveau
                            //this.affichage = ''
                        })
           },
           ListeNiveau(){
                HTTP.get('/professeur/niveau').then((response)=>{
                    this.checkNiveau = response.data.result
               })
            },
            ConsulterCoeffNiveau(){
                
                HTTP.get(`/consulter_coeff_niveau/${this.idNiv}`).then((response)=>{
                     
                        this.liste = response.data.result
                        this.niveau = response.data.niveau
                        //this.affichage = ''
                        //console.log( response.data.result,response.data.niveau )
                })
            },
            Edit(idAssoc,nomMatiere,coeff){
                this.passedData={idAssoc,nomMatiere,coeff}
            },
            Modifier(idAssoc,coeff){
                const data={
                    idAssoc:idAssoc,
                    coeff:coeff
                }
                HTTP.post('/modifier/coeffMatiere',data)
                .then((response)=>{
                    if(response.data.msg200){
                        this.$swal(response.data.msg200,{icon:'success'})
                        .then(()=>{
                            window.location.href='/coefficient_matiere_liste'
                        })
                    }
                })
            },
            Supprimer(idAssoc){
                this.$swal({icon:'warning',text:"Voulez-vous supprimer cet enregistrement ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                            const data={idAssoc:idAssoc}
                            HTTP.post('/supprimerMatiereCoeff',data)
                            .then((response)=>{
                                if(response.data.msg200){
                                    this.$swal(response.data.msg200,{icon:'success'})
                                    .then(()=>{
                                        window.location.href='/coefficient_matiere_liste'
                                    })
                                }
                            })
                        }
                    })
            }
        },
        mounted(){
             this.getListe()
             this.ListeNiveau()
        },
        computed:{

            ListeCoeff(){
                if(this.affichage == 'checkNiv'){
                    this.ConsulterCoeffNiveau()
                    return this.liste
                } else{
                   this.getListe()
                   return this.liste 
                }
            }
            
        }
    }
</script>




<!--template>
    <div>
        <router-link :to="{name:'CreationCoeffMatiere'}">Création des coefficients par matières</router-link>
        <br><br>
        <h3>Classe:{{libelleClasse}}</h3>
        <table border="1">
            <th>Matiere</th>
            <th>Coefficient</th>
            <th>actions</th>
            <tr v-for="l in liste" :key="l.idassoc">
                <td>{{l.libelle}}</td>
                <td>{{l.coefficient}}</td>
                <td></td>
            </tr>
        </table>
        <router-link :to="{name:'ConsulterCoefficient'}">Cliquez ici pour consulter les coefficients d'une autre niveau</router-link>
    </div>
</template>

<script>
import {HTTP} from '../../../../http-constants'
export default {
    data(){
        return{
            liste:[],
            idClasse:'',
            libelleClasse:''
        }
    },
    methods:{
        getListe(){
            HTTP.get('/listeCoefficientMatiere').then((response)=>{
                this.liste = response.data.result
                this.libelleClasse = response.data.libelleClasse
            })
        }
    },
    mounted(){
        this.getListe()
    }
}
</script-->
