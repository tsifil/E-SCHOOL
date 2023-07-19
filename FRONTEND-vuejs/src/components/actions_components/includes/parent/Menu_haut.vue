<template>
    <div>
     <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
     <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
    <a class="navbar-brand brand-logo mr-5"><img id='lg' src="images/zazatiana3.PNG" class="mr-2" alt="logo"/></a>
       <a class="navbar-brand brand-logo-mini"><img src="images/zazatiana3.PNG" alt="logo"/></a>
     </div>

     <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
      
       <ul class="navbar-nav mr-lg-2">
         <li class="nav-item nav-search d-none d-lg-block">
           <div class="input-group">
             <h4>Espace Parent</h4>
           </div>
         </li>
       </ul>
       <ul class="navbar-nav navbar-nav-right">
         <li class="nav-item nav-profile dropdown">
            Année scolaire : 
            <div data-toggle="modal" data-target="#myModal">
                <vs-button color="green" @click="listeAnneeScolaire()">{{annee}}</vs-button>
            </div>          
         </li>
       </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
     </div>
   </nav>
   <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">CHANGEMENT D'ANNEE SCOLAIRE</h4>
              </div>
                <div class="modal-body" >
                  <div class="alert alert-danger">
                        <strong>Attention !!! </strong> Si vous changer l’année
                         scolaire, seules les informations enregistrées a
                         cette année en question sera disponibles.
                </div>
                <br>
                  <label>Année scolaire*</label>
                  <selection v-model='idAs' :options="listeAnnee" :settings="{width:'100%'}"/>
                  <br><br>
                    <button @click="changerAnnee()" class="btn btn-success mr-2" data-dismiss="modal">Changer</button>
                    <button type="button" class="btn btn-danger mr-2" data-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {HTTP} from '../../../../http-constants'
import AuthService from '@/services/AuthParent_Service.js';
export default {
  data(){
    return{
      annee:this.$store.getters.getAnneeSco.libelle,
      listeAnnee:[],
      idAs:''
    }
  },
  methods:{
    listeAnneeScolaire(){
        HTTP.post('/personne/liste/anneeScolaire')
        .then((response)=>{
            this.listeAnnee=response.data.result
            this.idAs=response.data.idAs
        })
    },
    async changerAnnee(){
        try{
              const credentials = {idAs: this.idAs};
              const response = await AuthService.choixAnneeParent(credentials);
              const tokenAnneSco = response.tokenAnneSco
              const anneeSco = response.anneeSco
              this.$store.dispatch('anneeScoParent',{tokenAnneSco,anneeSco});
              this.$swal("Opération exécutée avec succès",{icon:'success'}).then(()=>{
                 window.location.href = '/dashboard_parent'
              })
             

            }catch(error){this.msg = error.response.data.msg}
    }
  }
}
</script>
