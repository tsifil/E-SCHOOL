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
             <h4>Espace professeur</h4>
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
                         cette annee en question sera disponibles.
                </div>
                <br>
                  <label>Annee scolaire*</label>
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
  import AuthService from '@/services/AuthProfesseur_Service.js';
  import {HTTP} from '../../../../http-constants'
export default {
  data(){
    return{
      annee:this.$store.getters.getAnneeScoProf.libelle,
      idAs:'',
      listeAnnee:[],
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
            const response = await AuthService.choixAnneeProf(credentials);
            const tokenAnneeProf = response.tokenAnneeProf
            const profAnnee = response.profAnnee
            this.$store.dispatch('anneeScoProf',{tokenAnneeProf,profAnnee});
             this.$swal("Opération exécutée avec succès",{icon:'success'}).then(()=>{
                             window.location.href = '/dashboard_professeur'
              })
    
        }catch(error){this.msg = error.response.data.msg}
  }
},
mounted(){
  this.listeAnneeScolaire()
}
}
</script>