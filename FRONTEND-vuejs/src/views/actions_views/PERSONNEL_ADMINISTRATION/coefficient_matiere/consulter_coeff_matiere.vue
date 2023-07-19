<template>
    <div>
        <consulter_coeff_matiereVue/>
    </div>
</template>

<script>
import consulter_coeff_matiereVue from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/coefficient_matiere/consulter_coeff_matiere.vue';
export default {
    components:{consulter_coeff_matiereVue},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>