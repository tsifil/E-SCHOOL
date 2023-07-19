<template>
    <div>
        <MatiereCoefficient/>
    </div>
</template>

<script>
import MatiereCoefficient from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/matiere/matiere_coefficient'

export default {
    components:{MatiereCoefficient},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>