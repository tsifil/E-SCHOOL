<template>
  <div>
    <AjouterClasse/>
  </div>
</template>

<script>

import AjouterClasse from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/classe/Ajouter_classe.vue'

export default {
  components:{AjouterClasse},
  async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
 }

</script>