<template>
    <div>
        <CreationCoefficientMatiere/>
    </div>
</template>

<script>
import CreationCoefficientMatiere from '../../../../components/actions_components/PERSONNEL_ADMINISTRATION/matiere/creationCoefficient_matiere'

export default {
    components:{CreationCoefficientMatiere},
    async created(){
      if(!this.$store.getters.isLoggedIn || !this.$store.getters.isChoiceAnneeAdmin) {
              this.$router.push('/connecter_personnel_administration')
      }
  }
}
</script>