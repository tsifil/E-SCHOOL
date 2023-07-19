<template>
    <div>
        <AjouterNiveau/>
    </div>
</template>

<script>
import AjouterNiveau from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/niveau/AjouterNiveau.vue';
export default {
    components:{AjouterNiveau},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>