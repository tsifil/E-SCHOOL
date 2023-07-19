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
             <h4>Personnel d'administration</h4>
           </div>
         </li>
       </ul>

       <ul class="navbar-nav navbar-nav-right">
         <li class="nav-item nav-profile dropdown">
           Année scolaire {{annee}}
         </li>
       </ul>

        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>

     </div>
   </nav>
    </div>
</template>

<script>
export default {
  data(){
    return{
      annee:this.$store.getters.getUserAnnee.libelle
  }
}
}
</script>
<style>
  #lg{
    width:100%;
    height:60px;
  }
</style>