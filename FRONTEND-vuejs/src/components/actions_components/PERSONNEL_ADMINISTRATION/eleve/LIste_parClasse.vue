<template>   
    <div class="container-scroller">
        <NavHaut/>
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
   
        <NavGauche/>
  
        <div class="main-panel">
          <div class="content-wrapper">
  
            <!-- AJOUTER NIVEAU -->
        
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
  
                <div class="card" >
                  <div class="card-body">
                    <!--h4 class="card-title">Contact Disponible</h4>
                    <p class="card-description">
                      Add class <code>.table-striped</code>
                    </p-->

    <form @submit.prevent="ListeParClasse">
       <select v-model="idClasse" class="form-control">
            <option disabled value="">Veuillez Choisir la classe</option>
            <option v-for="l in listeClasse" :key="l.idClasse" :value="l.idClasse">
                {{l.libelleClasse}}
            </option>
        </select>
        <br>
        <button type="submit" class="btn btn-info">Voir</button>
    </form>
    {{ msg }}
    <br>
            <div class="table-responsive" v-if="afficher">
              <button @click="Imprimer()" class="btn btn-warning btn-sm">Imprimer</button>
                <br><br>
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>N d'ordre</th>
                            <th>Nom et prénom(s)</th>
                            <th>N matricule</th>
                            <th>Classe</th>
                            <th>Date d'inscription</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lg,i) in listeParClasse" :key="lg.numMatricule">
                                <td>{{i+1}}</td>
                                <td>{{ lg.nom }}</td>
                                <td>{{ lg.sexe == 'Masculin' ? lg.numMatricule+'G' : lg.numMatricule+'F'}}</td>
                                <td>{{ lg.libelleClasse }}</td>
                                <td>{{ moment(lg.dateInscription).format('YYYY-MM-DD') }}</td>
                                <td>
                                    <router-link :to="{name:'DetailEleveInscrit',params:{numMatricule:lg.numMatricule}}" class="btn btn-info btn-sm"><i class="ti-eye"></i></router-link>
                                    <button @click="Supprimer(lg.idInscri)" class="btn btn-danger btn-sm"><i class="ti-trash"></i></button>
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
import {HTTP} from '../../../../http-constants'
import NavHaut from '../../includes/Menu_haut.vue'
import NavGauche from '../../includes/Menu_gauche.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'

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
                listeParClasse:[],
                afficher:false,
                msg:''
            }
        },
        methods:{
            ListeClasse(){
                 
                 HTTP.get('/listeClasse').then((response)=>{
                    this.listeClasse = response.data
                 })
            },
            ListeParClasse(){
                HTTP.get(`/listeParClasse/${this.idAs}/${this.idClasse}`).then((response)=>{
                    
                        if(response.data.msg){
                            this.afficher = false
                            this.msg = response.data.msg
                        }else{
                            this.listeParClasse = response.data
                            this.afficher = true
                            this.msg=''
                        }
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
                                      window.location.href = '/eleve_par_classe'
                                  })
                                }
                            }) 
                        }
                    })
            },
        Imprimer(){
          let info = []
          this.listeParClasse.forEach((e,index,array) => {
              info.push([index+1,e.nom,(e.sexe=='Masculin'?e.numMatricule+'G':e.numMatricule+'F'),e.libelleClasse,moment(e.dateInscription).format("YYYY-MM-DD")])
              console.log(index,array)
          })
          const doc = new jsPDF()
              autoTable(doc, {
                head: [["N d'ordre",'Nom et prénom(s)', 'N matricule', 'Classe',"Date d'inscription"]],
                body: info,
                theme:'grid',
              })
              doc.save('liste_par_classe.pdf')
            }
        },
        mounted(){
            this.ListeClasse()
        }
    }
</script>