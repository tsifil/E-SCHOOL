<template>
    <div class="container-scroller">
      <NavHaut/>
      <div class="container-fluid page-body-wrapper">
       
        
        <NavGauche/>
          <div class="main-panel">
          <img src="images/im.jpg" alt="" id='im'/>              
        </div>
      </div>
    </div>
  </template>

<script>
    import NavHaut from '../includes/professeur/Menu_haut.vue'
    import NavGauche from '../includes/professeur/Menu_gauche.vue'

    export default {
        components:{NavHaut,NavGauche},
        async created(){
            if(!this.$store.getters.isLoggedInProf || !this.$store.getters.isAnneeScolaireProf) {
                this.$router.replace({name:'connecter_professeur'})
            }
        }
    }

</script>

<style>
  #im{
    width:100%;
    height:100vh;
    background-size:cover;
    background-position:center center;
  }
</style>