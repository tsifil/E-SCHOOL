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
                    <!--h4 class="card-title">Liste des élèves</h4-->
                    <!--p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->
                    <div class="col-md-6">
                        <div class="form-group row">
                          <div class="col-sm-9">
                            <input type="text" v-model="recherche" @keyup.exact="affichage='recherche'" placeholder="barre de recherche rapide" class="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>N° Maticule</th>
                            <th>Nom et prénom(s)</th>
                            <th>Date de naissance</th>
                            <th>Genre</th>
                            <th>Est inscrit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row) in pageOfItems" :key="row.numMatricule">
                                <td>{{ row.sexe == 'Masculin' ? row.numMatricule+'G' : row.numMatricule+'F'}}</td>
                                <td>{{row.nom}}</td>
                                <!--td>{{row.prenom}}</td-->
                                <td>{{moment(row.dateNaissance).format('YYYY-MM-DD')}}</td>
                                <td>{{row.sexe}}</td>
                                <!--td>{{ row.idAs == 1 ? 'oui' : 'X'}}</td-->
                                <td v-if="row.idAs==1">
                                  <button class="btn btn-success btn-sm">oui</button>
                                </td>
                                <td v-if="row.idAs==0">
                                  <button class="btn btn-danger btn-sm">non</button>
                                </td>
                                <td>
                                    <router-link :to="{name:'DetailEleve',params:{numMatricule:row.numMatricule}}" class="btn btn-info btn-sm">Editer</router-link>
                                    <!--button @click="Supprimer(row.numMatricule)" class="btn btn-danger btn-sm">Supprimer</button-->
                                    <router-link :to="{name:'Reinscription',params:{numMatricule:row.numMatricule,idAs:row.idParams}}" v-if="row.idAs == 0" class="btn btn-warning btn-sm">Réinscrire</router-link>
                                </td>
                           </tr>
                        </tbody>
                      </table>
                      <br>
                      <pagination :maxPages=5 :pageSize=6 :items="eleveFiltrer" @changePage="onChangePage"/>
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
        components:{NavGauche,NavHaut},
        async created(){
          if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
                this.$router.push('/connecter_personnel_administration')
          }
      },
         data(){
            return{
                eleve:[],
                idAs:this.$store.getters.getUserAnnee.idAs,
                affichage:'',
                recherche:'',
                pageOfItems:[]
            }
         },
         methods:{
            onChangePage(page){
               this.pageOfItems = page
            },
            ListeEleve(){
                HTTP.get(`/listeEleve/${this.idAs}`).then((response) =>{
                    this.eleve = response.data
                    this.affichage = ''
                })
            },
            Rechercher(){
                var data = {
                    idAs:this.idAs,
                    recherche : this.recherche
                }
                HTTP.post('/rechercheEleve',data).then((response) =>{
                        this.eleve = response.data
                        this.affichage=''
                })                   
            },
            Supprimer(id){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer tous l’enregistrement concernant cet élève ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/eleve/supprimer/${id}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href = '/liste_eleve'
                                  })
                                }
                            }) 
                        }
                    })
            }
         },
         mounted(){
             this.ListeEleve()
         },
         computed:{
            eleveFiltrer(){
                if(this.affichage == 'recherche'){

                        this.Rechercher()
                        return this.eleve                    
                }else{
                    return this.eleve 
                }
            }
        }
    }
</script>
 