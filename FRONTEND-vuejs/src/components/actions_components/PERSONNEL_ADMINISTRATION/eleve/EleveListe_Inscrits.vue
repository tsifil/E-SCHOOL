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
                    
                    <div class="col-md-6">
                        <div class="form-group row">
                          <div class="col-sm-9">
                          <input type="text" v-model="recherche" @keyup.exact="affichage='recherche'" placeholder="barre de recherche rapide" class="form-control" width="12px"/>
                        </div>
                      </div>
                    </div>


            <div class="table-responsive">
                <table class="table table-striped">
                        <thead>
                          <tr>
                            <!--th>N</th-->
                            <th>Photo</th>
                            <th>Nom et Prénom(s)</th>
                            <!--th>Prenom(s)</th-->
                            <th>N° Maticule</th>
                            <th>Classe</th>
                            <th>Date d'inscription</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row) in pageOfItems" :key="row.numMatricule">
                                <!--td>{{i+1}}</td-->
                                <td class="py-1">
                                   <img :src="row.photo" alt="image"/>
                                </td>
                                <td>{{row.nom}}</td>
                                <td>{{ row.sexe == 'Masculin' ? row.numMatricule+'G' : row.numMatricule+'F'}}</td>
                                <td>{{ row.libelleClasse }}</td>
                                <td>{{moment(row.dateInscription).format('YYYY-MM-DD')}}</td>
                                <td>
                                    <router-link :to="{name:'DetailEleveInscrit',params:{numMatricule:row.numMatricule}}" class="btn btn-info btn-sm"><i class="ti-eye"></i></router-link>
                                    <button @click="Supprimer(row.idInscri)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
                                </td>
                           </tr>
                        </tbody>
                      </table>
                      <br>
                     <pagination :maxPages=5 :pageSize=6 :items="eleveInscritFiltrer" @changePage="onChangePage"/>
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
            ListeEleveInscrit(){
                HTTP.get(`/listeEleveInscrit/${this.idAs}`)
                .then((response) =>{
                    this.eleve = response.data
                    this.affichage = ''
                })
            },
            Rechercher(){
                var data = {
                    idAs:this.idAs,
                    recherche : this.recherche
                }
                HTTP.post('/rechercheEleveInscrits',data).then((response) =>{
                        this.eleve = response.data
                        this.affichage=''
                })                   
            },
            Supprimer(idInscri){
              this.$swal({icon:'warning',text:"Voulez-vous supprimer l'enregistrement concernant cet élève ?",dangerMode: true,
                          buttons:{cancel:{text:"Non",value:false,visible:true,closeModal:true,className:""},
                          confirm:{text:"Oui",value:true,visible:true,closeModal:true,className:""}}
                    }).then((willDelete)=> {
                        if(willDelete){
                          HTTP.delete(`/eleveInscrit/supprimer/${idInscri}`).then(response=>{
                            if(response.data.msg200){
                               this.$swal(response.data.msg200,{icon:"success"})
                               .then(()=>{
                                      window.location.href = '/eleve_inscrit'
                                  })
                                }
                            }) 
                        }
                    })
            }
         },
         mounted(){
             this.ListeEleveInscrit()
         },
         computed:{
            eleveInscritFiltrer(){
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
 